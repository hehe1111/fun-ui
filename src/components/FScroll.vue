<template>
  <div
    :class="[n2c(), n2c('parent')]"
    ref="parentRef"
    @wheel="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  >
    <div :class="n2c('child')" ref="childRef">
      <slot />
    </div>
    <div :class="n2c('scrollbar-container')" ref="scrollbarContainerRef">
      <div
        :class="n2c('scrollbar')"
        ref="scrollbarRef"
        @mousedown="onMouseDown"
        @selectstart.prevent
      ></div>
    </div>
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../assets/utils.js';

export default {
  name: 'FunUIScroll',
  data() {
    return {
      pH: null, // height of parent element
      cH: null, // height of child element
      sH: null, // height of scrollbar
      maxScrollableHeight: null,
      parentViewportHeight: null,
      scrollbarMaxScrollableHeight: null,
      cTY: null, // translateY of child element
      sTY: null, // translateY of scrollbar
      startPosition: { y: null },
      endPosition: { y: null },
      isDraging: false,
      timerId: null,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  mounted() {
    this.init();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  methods: {
    init() {
      const { parseInt: p, getComputedStyle: c } = window;
      const { parentRef, childRef } = this.$refs;
      const pPT = p(c(parentRef).paddingTop);
      const pPB = p(c(parentRef).paddingBottom);
      const pBTW = p(c(parentRef).borderTopWidth);
      const pBBW = p(c(parentRef).borderBottomWidth);
      this.pH = parentRef.getBoundingClientRect().height;
      this.cH = childRef.getBoundingClientRect().height;
      this.parentViewportHeight = this.pH - pPT - pPB - pBTW - pBBW;
      this.maxScrollableHeight = this.cH - this.parentViewportHeight;
      this.scrollbarMaxScrollableHeight = this.pH - pBTW - pBBW;
      this.sH =
        (this.parentViewportHeight / this.cH) *
        this.scrollbarMaxScrollableHeight;
      this.$refs.scrollbarRef.style.height = `${this.sH}px`;
    },
    onWheel($event) {
      this.limitSpeed(-$event.deltaY);
      this.checkChildTranslateY(() => $event.preventDefault());
      this.updateChildTranslateY();
      this.updateScrollbarTranslateY();
    },
    onMouseDown($event) {
      this.isDraging = true;
      this.startPosition = { y: $event.screenY };
    },
    onMouseUp($event) {
      this.isDraging = false;
      this.endPosition = { y: $event.screenY };
    },
    onMouseMove($event) {
      if (!this.isDraging) return;
      this.endPosition = { y: $event.screenY };
      this.sTY += this.endPosition.y - this.startPosition.y;

      this.checkScrollbarTranslateY();
      this.updateScrollbarTranslateY(this.sTY);
      this.updateChildTranslateY(
        (-this.sTY / this.scrollbarMaxScrollableHeight) * this.cH
      );
      this.startPosition = this.endPosition;
    },
    onTouchStart($event) {
      this.startPosition = { y: $event.touches[0].screenY };
    },
    onTouchMove($event) {
      this.endPosition = { y: $event.touches[0].screenY };
      // longer duration needed on mobile
      [this.$refs.childRef, this.$refs.scrollbarRef].map(
        el => (el.style.transitionDuration = '0.5s')
      );

      this.limitSpeed(this.endPosition.y - this.startPosition.y, {
        isMobile: true,
      });
      this.checkChildTranslateY(() => $event.preventDefault());
      this.updateChildTranslateY();
      this.updateScrollbarTranslateY();
      this.startPosition = this.endPosition;
    },
    limitSpeed(delta, { isMobile = false } = {}) {
      isMobile ? this._limitSpeedOnMobile(delta) : this._limitSpeedOnPC(delta);
    },
    _limitSpeedOnMobile(delta) {
      if (Math.abs(delta) <= 30) {
        this.cTY += delta * 2;
      } else if (Math.abs(delta) <= 60) {
        this.cTY += (delta / Math.abs(delta)) * 250;
      } else {
        this.cTY += (delta / Math.abs(delta)) * 500;
      }
    },
    _limitSpeedOnPC(delta) {
      if (Math.abs(delta) <= 20) {
        this.cTY += delta;
      } else if (Math.abs(delta) > 20 && Math.abs(delta) <= 50) {
        this.cTY += (delta / Math.abs(delta)) * 50;
      } else {
        this.cTY += (delta / Math.abs(delta)) * 200;
      }
    },
    checkChildTranslateY(callback) {
      // Can't get cTY in advanced like pH/cH etc.
      // otherwise this.cTY will not be updated correctly
      if (this.cTY > 0) {
        return (this.cTY = 0);
      } else if (this.cTY <= -this.maxScrollableHeight) {
        return (this.cTY = -this.maxScrollableHeight);
      } else {
        callback && callback();
      }
    },
    checkScrollbarTranslateY() {
      if (this.sTY < 0) {
        return (this.sTY = 0);
      } else if (this.sTY > this.scrollbarMaxScrollableHeight - this.sH) {
        return (this.sTY = this.scrollbarMaxScrollableHeight - this.sH);
      }
    },
    updateChildTranslateY(newValue) {
      this.cTY = newValue || this.cTY;
      this.$refs.childRef.style.transform = `translateY(${this.cTY}px)`;
    },
    updateScrollbarTranslateY(newValue) {
      this.sTY =
        newValue || (-this.cTY / this.cH) * this.scrollbarMaxScrollableHeight;
      this.$refs.scrollbarRef.style.transform = `translateY(${this.sTY}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-scroll {
  &-parent {
    overflow: hidden;
    position: relative;
  }

  &-child,
  &-scrollbar {
    transition: transform 0.05s cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  &-scrollbar-container,
  &-scrollbar {
    border-radius: $borderRadius;
  }

  &-scrollbar-container {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
  }

  &-scrollbar {
    width: 100%;
    background-color: $darkGrey;
    opacity: 0.8;
    &:hover {
      background-color: darken($darkGrey, 10%);
    }
  }
}
</style>
