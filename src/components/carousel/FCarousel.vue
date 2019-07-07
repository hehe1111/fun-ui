<template>
  <div
    class="f-carousel"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchend"
  >
    <div class="f-carousel-window">
      <slot />
    </div>
    <div class="f-carousel-dots" :class="dotsClasses">
      <span
        class="dot"
        :class="{
          active: n - 1 === (newSelectedIndex || getSelected().index),
        }"
        v-for="n in childrenLength"
        :key="n"
        @click="onClickDots(n - 1)"
      ></span>
    </div>
    <template
      v-if="enableArrow && ['left', 'right'].indexOf(dotPosition) === -1"
    >
      <div class="f-carousel-arrow f-carousel-prev" @click="onClickPrevious">
        <f-icon name="left" class="icon" />
      </div>
      <div class="f-carousel-arrow f-carousel-next" @click="onClickNext">
        <f-icon name="right" class="icon" />
      </div>
    </template>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';

export default {
  name: 'FunUICarousel',
  props: {
    selected: {
      type: String,
    },
    autoPlay: {
      type: [Number, Boolean],
      default: 2,
    },
    enableArrow: {
      type: Boolean,
      default: false,
    },
    dotPosition: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      names: [],
      childrenLength: 0,
      timerId: null,
      mutableSelected: '',
      oldSelectedIndex: null,
      newSelectedIndex: null,
      startTouch: null,
    };
  },
  computed: {
    dotsClasses() {
      return {
        [`position-${this.dotPosition}`]: this.dotPosition,
      };
    },
  },
  mounted() {
    this.initialize();
    this.updateChildrenStyle();
    this.updateChildren();
    this.autoPlayHandler();
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
  methods: {
    initialize() {
      if (!this.$children.length) {
        throw new Error('FCarousel 组件必须接收 FCarouselItem 作为子组件');
      }
      this.$children.map(vm => {
        if (vm.$options.name === 'FunUICarouselItem') this.names.push(vm.name);
      });
      this.childrenLength = this.names.length;
      this.mutableSelected = this.selected;
    },
    getSelected() {
      const name = this.mutableSelected || this.$children[0].name;
      return { name, index: this.names.indexOf(name) };
    },
    getNewSelected(newIndex) {
      this.oldSelectedIndex = this.getSelected().index;
      let copy = newIndex;
      if (copy >= this.names.length) copy = 0;
      if (copy < 0) copy = this.names.length - 1;
      this.newSelectedIndex = copy;
      this.mutableSelected = this.names[copy];
      this.$emit('update:selected', this.mutableSelected);
      this.updateChildren();
    },
    updateChildrenStyle() {
      this.$children.forEach(vm => {
        if (['left', 'right'].indexOf(this.dotPosition) !== -1) {
          vm.animationName = 'slide-vertical';
        }
      });
    },
    updateChildren() {
      this.$children.forEach(vm => {
        const { oldSelectedIndex: oldI, newSelectedIndex: newI } = this;
        const last = this.names.length - 1;

        vm.reversed = oldI > newI;
        // 边界情况
        if (oldI === last && newI === 0) vm.reversed = false;
        if (oldI === 0 && newI === last) vm.reversed = true;

        this.$nextTick(() => (vm.selected = this.getSelected().name));
      });
    },
    stopAutoPlay() {
      this.timerId && window.clearTimeout(this.timerId);
    },
    autoPlayHandler() {
      this.stopAutoPlay();
      this.autoPlay && (this.timerId = this.setTimer());
    },
    setTimer() {
      // 记得要手动返回定时器返回的 id，否则就默认返回 undefined
      return setTimeout(() => {
        this.getNewSelected(this.getSelected().index + 1);
        this.timerId = this.setTimer();
      }, this.autoPlay * 1000);
    },
    onClickDots(newIndex) {
      this.getNewSelected(newIndex);
    },
    onClickPrevious() {
      this.getNewSelected(this.getSelected().index - 1);
    },
    onClickNext() {
      this.getNewSelected(this.getSelected().index + 1);
    },
    onMouseEnter(event) {
      this.stopAutoPlay();
    },
    onMouseLeave(event) {
      this.autoPlayHandler();
    },
    onTouchStart(event) {
      this.stopAutoPlay();
      this.startTouch = event.touches[0];
    },
    onTouchend(event) {
      const { clientX: x1, clientY: y1 } = this.startTouch;
      const { clientX: x2, clientY: y2 } = event.changedTouches[0];
      const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      const rate = distance / Math.abs(y1 - y2);
      if (x1 - x2 !== 0) {
        rate > 2 && x1 - x2 > 0
          ? this.getNewSelected(this.getSelected().index + 1)
          : this.getNewSelected(this.getSelected().index - 1);
      }
      this.autoPlayHandler();
    },
  },
  components: { FIcon },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-carousel {
  position: relative;

  &-window {
    overflow: hidden;
    position: relative;
  }

  &-dots {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    position: absolute;

    &.position-top,
    &.position-bottom {
      transform: translateX(-50%);
      left: 50%;
    }

    &.position-top {
      top: 0.6em;
    }

    &.position-bottom {
      bottom: 0.6em;
    }

    &.position-left,
    &.position-right {
      flex-direction: column;
      transform: translateY(-50%);
      top: 50%;
    }

    &.position-left {
      left: 0.6em;
    }

    &.position-right {
      right: 0.6em;
    }

    > .dot {
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      margin: 0.4em;
      background-color: #ccc;
      display: inline-block;
      vertical-align: top;
      transition: all 0.3s;

      &.active {
        background-color: #fff;
      }

      &:hover {
        transform: scale(1.4);
        background-color: #fff;
        cursor: pointer;
      }
    }
  }

  &-arrow {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background-color: $grey;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;

    &:hover {
      background-color: $greyHover;
    }

    > .icon {
      fill: #fff;
    }

    &.f-carousel-prev {
      left: 1em;
    }

    &.f-carousel-next {
      right: 1em;
    }
  }
}
</style>
