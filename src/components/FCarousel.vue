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
    };
  },
  mounted() {
    this.initialize();
    this.updateChildren();
    this.autoPlayHandler();
  },
  updated() {
    this.updateChildren();
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
      return this.mutableSelected || this.$children[0].name;
    },
    updateChildren() {
      this.$children.forEach(vm => (vm.selected = this.getSelected()));
    },
    autoPlayHandler() {
      if (!this.autoPlay) return;
      this.timerId = this.setTimer();
    },
    setTimer() {
      setTimeout(() => {
        let index = this.names.indexOf(this.getSelected());
        index += 1;
        // 从右到左
        if (index >= this.names.length) index = 0;
        // 从左到右
        if (index < 0) index = this.names.length - 1;
        this.mutableSelected = this.names[index];
        this.$emit('update:selected', this.mutableSelected);
        this.updateChildren();
        this.timerId = this.setTimer();
      }, this.autoPlay * 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.f-carousel {
  border: 1px solid red;
  &-window {
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
}
</style>
