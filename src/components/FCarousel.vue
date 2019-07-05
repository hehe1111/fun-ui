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
      timerId: null,
      mutableSelected: '',
      oldSelectedIndex: null,
      newSelectedIndex: null,
    };
  },
  computed: {
    names() {
      return this.$children.map(vm => vm.name);
    },
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
      this.mutableSelected = this.selected;
    },
    getSelected() {
      return this.mutableSelected || this.$children[0].name;
    },
    updateChildren() {
      this.$children.forEach(vm => {
        vm.leftToRight = this.oldSelectedIndex > this.newSelectedIndex;
        this.$nextTick(() => (vm.selected = this.getSelected()));
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
      let index = names.indexOf(this.getSelected());
      this.oldSelectedIndex = index;
      this.newSelectedIndex = index += 1;
      if (index >= names.length) index = 0;
      if (index < 0) index = names.length - 1;
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
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
}
</style>
