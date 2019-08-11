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
    <div v-show="hasScrollbarX" :class="n2c('scrollbar-container')">
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
import { optionsName2ClassPrefix, oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUIScrollHorizontal',
  data() {
    return {
      pW: null, // width of parent element
      cW: null, // width of child element
      sW: null, // width of scrollbar
      maxScrollableWidth: null,
      parentViewportWidth: null,
      scrollbarMaxScrollableWidth: null,
      cTX: null, // translateX of child element
      sTX: null, // translateX of scrollbar
      startPosition: { x: null },
      endPosition: { x: null },
      isDraging: false,
      timerId: null,
      hasScrollbarX: false,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  mounted() {
    this.getWidth();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    getWidth() {
      const { parseInt: p, getComputedStyle: c } = window;
      const { parentRef, childRef } = this.$refs;
      const pPL = p(c(parentRef).paddingLeft);
      const pPR = p(c(parentRef).paddingRight);
      const pBLW = p(c(parentRef).borderLeftWidth);
      const pBRW = p(c(parentRef).borderRightWidth);
      this.pW = parentRef.getBoundingClientRect().width;
      this.cW = childRef.getBoundingClientRect().width;
      this.parentViewportWidth = this.pW - pPL - pPR - pBLW - pBRW;
      this.maxScrollableWidth = this.cW - this.parentViewportWidth;

      const scrollbarContainerWidth = this.pW - pBLW - pBRW;
      this.sW = Math.max(
        (this.parentViewportWidth / this.cW) * scrollbarContainerWidth,
        16
      );
      this.$refs.scrollbarRef.style.width = `${this.sW}px`;
      this.scrollbarMaxScrollableWidth = scrollbarContainerWidth - this.sW;
      if (this.maxScrollableWidth !== 0) this.hasScrollbarX = true;
    },
    onWheel($event) {
      if (!this.hasScrollbarX) return;
      this.limitSpeed(-$event.deltaX);
      this.updateChildTranslateX({ callback: () => $event.preventDefault() });
      this.updateScrollbarTranslateX();
    },
    onMouseDown($event) {
      this.isDraging = true;
      this.startPosition = { x: $event.screenX };
    },
    onMouseUp($event) {
      this.isDraging = false;
      this.endPosition = { x: $event.screenX };
    },
    onMouseMove($event) {
      if (!this.isDraging || !this.hasScrollbarX) return;
      this.endPosition = { x: $event.screenX };
      this.sTX += this.endPosition.x - this.startPosition.x;

      this.updateScrollbarTranslateX(this.sTX);
      this.updateChildTranslateX({
        value:
          (-this.sTX / this.scrollbarMaxScrollableWidth) *
          this.maxScrollableWidth,
      });
      this.startPosition = this.endPosition;
    },
    onKeyDown($event) {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/keydown_event
      if (!oneOf($event.code.toLowerCase(), ['arrowleft', 'arrowright'])) {
        return;
      }
      if (!this.hasScrollbarX) return;
      if ($event.code.toLowerCase() === 'arrowleft') {
        this.limitSpeed(50);
      } else if ($event.code.toLowerCase() === 'arrowright') {
        this.limitSpeed(-50);
      }
      this.updateChildTranslateX({ callback: () => $event.preventDefault() });
      this.updateScrollbarTranslateX();
    },
    onTouchStart($event) {
      this.startPosition = { x: $event.touches[0].screenX };
    },
    onTouchMove($event) {
      if (!this.hasScrollbarX) return;
      this.endPosition = { x: $event.touches[0].screenX };
      [this.$refs.childRef, this.$refs.scrollbarRef].map(
        el => (el.style.transitionDuration = '0.5s')
      );

      this.limitSpeed(this.endPosition.x - this.startPosition.x, {
        isMobile: true,
      });
      this.updateChildTranslateX(() => $event.preventDefault());
      this.updateScrollbarTranslateX();
      this.startPosition = this.endPosition;
    },
    limitSpeed(delta, { isMobile = false } = {}) {
      isMobile ? this._limitSpeedOnMobile(delta) : this._limitSpeedOnPC(delta);
    },
    _limitSpeedOnMobile(delta) {
      const absDelta = Math.abs(delta);
      if (absDelta <= 30) {
        this.cTX += delta * 2;
      } else if (absDelta <= 60) {
        this.cTX += (delta / absDelta) * 250;
      } else {
        this.cTX += (delta / absDelta) * 500;
      }
    },
    _limitSpeedOnPC(delta) {
      const absDelta = Math.abs(delta);
      if (absDelta <= 20) {
        this.cTX += delta;
      } else if (absDelta > 20 && absDelta <= 50) {
        this.cTX += (delta / absDelta) * 50;
      } else {
        this.cTX += (delta / absDelta) * 200;
      }
    },
    checkChildTranslateX(callback) {
      // Can't get cTX in advanced like pW/cW etc.
      // otherwise this.cTX will not be updated correctly
      if (this.cTX > 0) {
        return (this.cTX = 0);
      } else if (this.cTX <= -this.maxScrollableWidth) {
        return (this.cTX = -this.maxScrollableWidth);
      } else {
        callback && callback();
      }
    },
    checkScrollbarTranslateX() {
      if (this.sTX < 0) {
        return (this.sTX = 0);
      } else if (this.sTX > this.scrollbarMaxScrollableWidth) {
        return (this.sTX = this.scrollbarMaxScrollableWidth);
      }
    },
    updateChildTranslateX({ value, callback }) {
      this.cTX = value || this.cTX;
      this.checkChildTranslateX(callback);
      this.$refs.childRef.style.transform = `translateX(${this.cTX}px)`;
    },
    updateScrollbarTranslateX(value) {
      this.sTX =
        value ||
        (-this.cTX / this.maxScrollableWidth) *
          this.scrollbarMaxScrollableWidth;
      this.checkScrollbarTranslateX();
      this.$refs.scrollbarRef.style.transform = `translateX(${this.sTX}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-scroll-horizontal {
  &-parent {
    overflow: hidden;
    position: relative;
  }

  &-child {
    display: inline-block;
    vertical-align: top;
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
    width: 100%;
    height: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
  }

  &-scrollbar {
    height: 100%;
    background-color: $darkGrey;
    opacity: 0.8;
    &:hover {
      background-color: darken($darkGrey, 10%);
    }
  }
}
</style>
