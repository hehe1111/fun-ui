<template>
  <div class="f-carousel">
    <div class="f-carousel-window">
      <slot />
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
      timerId: null,
      mutableSelected: '',
      oldSelectedIndex: null,
      newSelectedIndex: null,
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
      this.mutableSelected = this.selected;
    },
    getSelected() {
      const name = this.mutableSelected || this.$children[0].name;
      return {
        index: this.names.indexOf(name),
        name,
      };
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
      setTimeout(() => {
        this.mutableSelected = this.names[this.getIndex()];
        this.$emit('update:selected', this.mutableSelected);
        this.updateChildren();
        this.timerId = this.setTimer();
      }, this.autoPlay * 1000);
    },
    getIndex() {
      let { names } = this;
      let { index } = this.getSelected();
      this.oldSelectedIndex = index;
      index += 1;
      if (index >= names.length) index = 0;
      if (index < 0) index = names.length - 1;
      this.newSelectedIndex = index;
      return index;
    },
  },
};
</script>

<style lang="scss" scoped>
.f-carousel {
  &-window {
    border: 1px solid red;
    overflow: hidden;
    vertical-align: top;
    position: relative;
  }
}
</style>
