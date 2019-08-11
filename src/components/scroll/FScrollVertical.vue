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
      <div v-show="loading" :class="n2c('loading-container')">
        <f-icon name="loading" />
      </div>
    </div>
    <div v-show="hasScrollbarY" :class="n2c('scrollbar-container')">
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
import FIcon from '../FIcon.vue';
import { optionsName2ClassPrefix, oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUIScrollVertical',
  components: { FIcon },
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
      hasScrollbarY: false,
      loading: false,
    };
  },
  props: {
    loadData: {
      type: Function,
    },
    distance: {
      type: Number,
      default: 1,
    },
    delay: {
      type: Number,
      dafault: 300,
    },
    loadDataImmediately: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  created() {
    // avoid the case that hasScrollbarY is false because data source is empty at first
    this.loadDataImmediately && this.loadData && this.loadData();
  },
  mounted() {
    this.getHeight();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
  },
  updated() {
    this.getHeight();
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    getHeight() {
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
      if (this.maxScrollableHeight > 0) this.hasScrollbarY = true;
    },
    onWheel($event) {
      if (!this.hasScrollbarY) return;
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
      if (!this.isDraging || !this.hasScrollbarY) return;
      this.endPosition = { y: $event.screenY };
      this.sTY += this.endPosition.y - this.startPosition.y;

      this.checkScrollbarTranslateY();
      this.updateScrollbarTranslateY(this.sTY);
      this.updateChildTranslateY(
        (-this.sTY / this.scrollbarMaxScrollableHeight) * this.cH
      );
      this.startPosition = this.endPosition;
    },
    onKeyDown($event) {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/keydown_event
      if (!oneOf($event.code.toLowerCase(), ['arrowdown', 'arrowup'])) return;
      if (!this.hasScrollbarY) return;
      if ($event.code.toLowerCase() === 'arrowdown') {
        this.limitSpeed(-50);
      } else if ($event.code.toLowerCase() === 'arrowup') {
        this.limitSpeed(50);
      }
      this.checkChildTranslateY(() => $event.preventDefault());
      this.updateChildTranslateY();
      this.updateScrollbarTranslateY();
    },
    onTouchStart($event) {
      this.startPosition = { y: $event.touches[0].screenY };
    },
    onTouchMove($event) {
      if (!this.hasScrollbarY) return;
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
      const absDelta = Math.abs(delta);
      if (absDelta <= 30) {
        this.cTY += delta * 2;
      } else if (absDelta <= 60) {
        this.cTY += (delta / absDelta) * 250;
      } else {
        this.cTY += (delta / absDelta) * 500;
      }
    },
    _limitSpeedOnPC(delta) {
      const absDelta = Math.abs(delta);
      if (absDelta <= 20) {
        this.cTY += delta;
      } else if (absDelta > 20 && absDelta <= 50) {
        this.cTY += (delta / absDelta) * 50;
      } else {
        this.cTY += (delta / absDelta) * 200;
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
      this.loadDataHandler();
    },
    loadDataHandler() {
      if (
        this.sTY >=
          this.scrollbarMaxScrollableHeight - this.sH - this.distance &&
        !this.loading
      ) {
        this.loading = true;
        setTimeout(() => {
          this.loadData && this.loadData();
          this.loading = false;
        }, this.delay);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-scroll-vertical {
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

  &-loading-container {
    @extend .flex-center;
    padding: 10px;
  }
}
</style>
