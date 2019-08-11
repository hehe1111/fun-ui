<template>
  <div
    :class="[n2c(), n2c('parent')]"
    ref="parentRef"
    @wheel="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  >
    <div
      :class="[n2c('child'), { ['trigger-BFC']: direction === 'x' }]"
      ref="childRef"
    >
      <slot />
      <div v-show="loading" :class="n2c('loading-container')">
        <f-icon name="loading" />
      </div>
    </div>
    <div v-show="hasScrollbar" :class="n2c('scrollbar-container')">
      <div
        :class="n2c('scrollbar')"
        ref="scrollbarRef"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @selectstart.prevent
      ></div>
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import { optionsName2ClassPrefix, oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUIScroll',
  components: { FIcon },
  data() {
    return {
      pScope: null,
      cScope: null,
      sScope: null,
      maxScrollableScope: null,
      parentViewportScope: null,
      scrollbarMaxScrollableScope: null,
      cTV: null, // translate value of child element
      sTV: null, // translate value of scrollbar
      startPosition: { y: null },
      endPosition: { y: null },
      isDraging: false,
      timerId: null,
      hasScrollbar: false,
      loading: false,
    };
  },
  props: {
    direction: {
      type: String,
      default: 'y',
      validator(prop) {
        return oneOf(prop, ['x', 'y']);
      },
    },
    loadData: {
      type: Function,
    },
    distance: {
      type: Number,
      default: 0,
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
    // avoid the case that hasScrollbar is false because data source is empty at first
    this.loadDataImmediately && this.loadData && this.loadData();
  },
  mounted() {
    this.getScope();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
  },
  updated() {
    this.getScope();
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    getScope() {
      const [pP1, pP2, pB1, pB2] = this._getPaddingAndBorder();
      const property = this.direction === 'y' ? 'height' : 'width';
      this.pScope = this.$refs.parentRef.getBoundingClientRect()[property];
      this.cScope = this.$refs.childRef.getBoundingClientRect()[property];
      this.parentViewportScope = this.pScope - pP1 - pP2 - pB1 - pB2;
      this.maxScrollableScope = this.cScope - this.parentViewportScope;
      const scrollbarContainerScope = this.pScope - pB1 - pB2;
      this.sScope = Math.max(
        (this.parentViewportScope / this.cScope) * scrollbarContainerScope,
        16
      );
      this.$refs.scrollbarRef.style[property] = `${this.sScope}px`;
      this.scrollbarMaxScrollableScope = scrollbarContainerScope - this.sScope;
      if (this.maxScrollableScope > 0) this.hasScrollbar = true;
    },
    _getPaddingAndBorder() {
      const style = window.getComputedStyle(this.$refs.parentRef);
      const { parseInt: p } = window;
      let pP1, pP2, pB1, pB2;
      if (this.direction === 'y') {
        pP1 = p(style.paddingTop);
        pP2 = p(style.paddingBottom);
        pB1 = p(style.borderTopWidth);
        pB2 = p(style.borderBottomWidth);
      } else if (this.direction === 'x') {
        pP1 = p(style.paddingLeft);
        pP2 = p(style.paddingRight);
        pB1 = p(style.borderLeftWidth);
        pB2 = p(style.borderRightWidth);
      }
      return [pP1, pP2, pB1, pB2];
    },
    onWheel($event) {
      if (!this.hasScrollbar) return;
      this.limitSpeed(-$event.deltaY);
      this.updateChildTranslateValue({
        callback: () => $event.preventDefault(),
      });
      this.updateScrollbarTranslateValue();
    },
    onMouseDown($event) {
      this.isDraging = true;
      const d = this.direction;
      this.startPosition = { [d]: $event[`screen${d.toUpperCase()}`] };
    },
    onMouseUp($event) {
      this.isDraging = false;
      const d = this.direction;
      this.endPosition = { [d]: $event[`screen${d.toUpperCase()}`] };
    },
    onMouseMove($event) {
      if (!this.isDraging || !this.hasScrollbar) return;
      const d = this.direction;
      this.endPosition = { [d]: $event[`screen${d.toUpperCase()}`] };

      this.sTV += this.endPosition[d] - this.startPosition[d];
      this.updateScrollbarTranslateValue(this.sTV);
      this.updateChildTranslateValue({
        value:
          (-this.sTV / this.scrollbarMaxScrollableScope) *
          this.maxScrollableScope,
      });
      this.startPosition = this.endPosition;
    },
    onKeyDown($event) {
      if (!this.hasScrollbar) return;
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/keydown_event
      if (
        !oneOf($event.code.toLowerCase(), [
          'arrowdown',
          'arrowup',
          'arrowleft',
          'arrowright',
        ])
      ) {
        return;
      }
      const keyCode = $event.code.toLowerCase();
      const events = {
        y: ['arrowup', 'arrowdown'],
        x: ['arrowleft', 'arrowright'],
      };
      if (oneOf(keyCode, events[this.direction])) {
        keyCode === events[this.direction][0]
          ? this.limitSpeed(50)
          : this.limitSpeed(-50);
      }
      this.updateChildTranslateValue({
        callback: () => $event.preventDefault(),
      });
      this.updateScrollbarTranslateValue();
    },
    onTouchStart($event) {
      console.log(111);
      const d = this.direction;
      this.startPosition = {
        [d]: $event.touches[0][`screen${d.toUpperCase()}`],
      };
    },
    onTouchMove($event) {
      console.log(33);

      if (!this.hasScrollbar) return;
      const d = this.direction;
      this.endPosition = { [d]: $event.touches[0][`screen${d.toUpperCase()}`] };
      // longer duration needed on mobile
      [this.$refs.childRef, this.$refs.scrollbarRef].map(
        el => (el.style.transitionDuration = '0.5s')
      );

      this.limitSpeed(this.endPosition[d] - this.startPosition[d], {
        isMobile: true,
      });
      this.updateChildTranslateValue({
        callback: () => $event.preventDefault(),
      });
      this.updateScrollbarTranslateValue();
      this.startPosition = this.endPosition;
    },
    limitSpeed(delta, { isMobile = false } = {}) {
      isMobile ? this._limitSpeedOnMobile(delta) : this._limitSpeedOnPC(delta);
    },
    _limitSpeedOnMobile(delta) {
      const absDelta = Math.abs(delta);
      if (absDelta <= 30) {
        this.cTV += delta * 2;
      } else if (absDelta <= 60) {
        this.cTV += (delta / absDelta) * 250;
      } else {
        this.cTV += (delta / absDelta) * 500;
      }
    },
    _limitSpeedOnPC(delta) {
      const absDelta = Math.abs(delta);
      if (absDelta <= 20) {
        this.cTV += delta;
      } else if (absDelta > 20 && absDelta <= 100) {
        this.cTV += (delta / absDelta) * 100;
      } else {
        this.cTV += (delta / absDelta) * 200;
      }
    },
    checkChildTranslateValue(callback) {
      // Can't get cTV in advanced like pScope/cScope etc.
      // otherwise this.cTV will not be updated correctly
      if (this.cTV > 0) {
        return (this.cTV = 0);
      } else if (this.cTV <= -this.maxScrollableScope) {
        return (this.cTV = -this.maxScrollableScope);
      } else {
        callback && callback();
      }
    },
    checkScrollbarTranslateValue() {
      if (this.sTV < 0) {
        return (this.sTV = 0);
      } else if (this.sTV > this.scrollbarMaxScrollableScope) {
        return (this.sTV = this.scrollbarMaxScrollableScope);
      }
    },
    updateChildTranslateValue({ value, callback }) {
      this.cTV = value || this.cTV;
      this.checkChildTranslateValue(callback);
      this.$refs.childRef.style.transform = `translate${this.direction}(${this.cTV}px)`;
    },
    updateScrollbarTranslateValue(value) {
      this.sTV =
        value ||
        (-this.cTV / this.maxScrollableScope) *
          this.scrollbarMaxScrollableScope;
      this.checkScrollbarTranslateValue();
      this.$refs.scrollbarRef.style.transform = `translate${this.direction}(${this.sTV}px)`;

      this.loadData && this.loadDataHandler();
    },
    loadDataHandler() {
      if (
        this.sTV >= this.scrollbarMaxScrollableScope - this.distance &&
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

.f-scroll {
  &-parent {
    overflow: hidden;
    position: relative;
  }

  &-child,
  &-scrollbar {
    transition: transform 0.05s cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  &-child.trigger-BFC {
    display: inline-block;
    vertical-align: top;
  }

  &-scrollbar-container,
  &-scrollbar {
    border-radius: $borderRadius;
  }

  &-scrollbar-container {
    position: absolute;
    background-color: transparent;
  }

  &-scrollbar {
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
