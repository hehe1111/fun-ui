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
    <div class="f-carousel-dots">
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
  </div>
</template>

<script>
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
  },
  data() {
    return {
      names: [],
      childrenLength: 0,
      timerId: null,
      mutableSelected: '',
      oldSelectedIndex: null,
      newSelectedIndex: null,
      isMouseEntered: false,
      startTouch: null,
    };
  },
  mounted() {
    this.initialize();
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
      this.names = this.$children.map(vm => vm.name);
      this.childrenLength = this.$children.length;
      this.mutableSelected = this.selected;
    },
    getSelected() {
      const name = this.mutableSelected || this.$children[0].name;
      return { name, index: this.names.indexOf(name) };
    },
    getNewSelected(newIndex) {
      this.oldSelectedIndex = this.getSelected().index;
      let newIndexCopy = newIndex;
      if (newIndexCopy >= this.names.length) newIndexCopy = 0;
      if (newIndexCopy < 0) newIndexCopy = this.names.length - 1;
      this.newSelectedIndex = newIndexCopy;
      this.mutableSelected = this.names[newIndexCopy];
      this.$emit('update:selected', this.mutableSelected);
      this.updateChildren();
    },
    updateChildren() {
      this.$children.forEach(vm => {
        const { oldSelectedIndex, newSelectedIndex } = this;
        const last = this.names.length - 1;
        vm.leftToRight = oldSelectedIndex > newSelectedIndex;

        // 边界情况
        if (oldSelectedIndex === last && newSelectedIndex === 0) {
          vm.leftToRight = false;
        }
        if (oldSelectedIndex === 0 && newSelectedIndex === last) {
          vm.leftToRight = true;
        }

        this.$nextTick(() => (vm.selected = this.getSelected().name));
      });
    },
    autoPlayHandler() {
      this.autoPlay && (this.timerId = this.setTimer());
    },
    setTimer() {
      // 记得要手动返回定时器返回的 id，否则就默认返回 undefined
      return setTimeout(() => {
        this.getNewSelected(this.getSelected().index + 1);
        this.timerId = this.setTimer();
      }, this.autoPlay * 1000);
    },
    stopAutoPlay() {
      this.timerId && window.clearTimeout(this.timerId);
    },
    onClickDots(newIndex) {
      this.stopAutoPlay();
      this.getNewSelected(newIndex);
      !this.isMouseEntered && this.autoPlayHandler();
    },
    onMouseEnter(event) {
      // 判断点击是来自鼠标还是手指
      if (event.sourceCapabilities.firesTouchEvents) return;
      this.isMouseEntered = true;
      this.stopAutoPlay();
    },
    onMouseLeave(event) {
      if (event.sourceCapabilities.firesTouchEvents) return;
      this.isMouseEntered = false;
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
};
</script>

<style lang="scss" scoped>
.f-carousel {
  position: relative;

  &-window {
    border: 1px solid red;
    overflow: hidden;
    position: relative;
  }

  &-dots {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    position: absolute;
    bottom: 0.6em;
    left: 50%;
    transform: translateX(-50%);

    > .dot {
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      margin: 0.4em;
      background-color: #ccd2dd;
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
}
</style>
