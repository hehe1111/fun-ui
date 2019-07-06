<template>
  <div
    class="f-carousel"
    @mouseenter="stopAutoPlay"
    @mouseleave="restoreToBeforeEnter"
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
    };
  },
  mounted() {
    this.initialize();
    this.updateChildren();
    this.autoPlayHandler();
  },
  beforeDestroy() {
    window.clearTimeout(this.timerId);
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
      this.newSelectedIndex = newIndex;
      this.mutableSelected = this.names[newIndex];
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
      if (!this.autoPlay) return;
      this.timerId = this.setTimer();
    },
    setTimer() {
      // 记得要手动返回定时器返回的 id，否则就默认返回 undefined
      return setTimeout(() => {
        this.getNewSelected(this.getNewIndex());
        this.timerId = this.setTimer();
      }, this.autoPlay * 1000);
    },
    getNewIndex() {
      let { index } = this.getSelected();
      index += 1;
      if (index >= this.names.length) index = 0;
      if (index < 0) index = this.names.length - 1;
      return index;
    },
    onClickDots(newIndex) {
      this.timerId && window.clearTimeout(this.timerId);
      this.getNewSelected(newIndex);
      this.autoPlay && !this.isMouseEntered && (this.timerId = this.setTimer());
    },
    stopAutoPlay($event) {
      // 判断点击是来自鼠标还是手指
      if ($event.sourceCapabilities.firesTouchEvents) return;
      this.isMouseEntered = true;
      if (this.timerId) window.clearTimeout(this.timerId);
    },
    restoreToBeforeEnter($event) {
      if ($event.sourceCapabilities.firesTouchEvents) return;
      this.isMouseEntered = false;
      if (this.autoPlay) this.timerId = this.setTimer();
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
