<template>
  <div class="tab-nav">
    <slot />
    <div class="slideable-line" ref="slideableLine"></div>
    <div class="actions-container">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNav',
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  mounted() {
    this.getSlideableLineStyle();
  },
  methods: {
    getSlideableLineStyle() {
      this.eventBus.$on &&
        this.eventBus.$on('update:selected', (value, vm) => {
          // const { width: wrongWidth, left: wrongLeft } = vm.$el.getBoundingClientRect();
          // console.log(wrongWidth, wrongLeft); // 1366 0
          this.$nextTick(() => {
            const { width, left, height, top } = vm.$el.getBoundingClientRect();
            const isHorizontal = this.$el.classList.contains('horizontal');
            if (!this.$refs.slideableLine) return;
            if (isHorizontal) {
              // console.log(width, left); // 56.21875 0
              this.$refs.slideableLine.style.width = `${width}px`;
              this.$refs.slideableLine.style.left = `${left}px`;
            } else {
              this.$refs.slideableLine.style.height = `${height}px`;
              this.$refs.slideableLine.style.top = `${top}px`;
            }
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.tab-nav {
  // 共用样式
  position: relative;
  border-style: solid;
  border-color: $borderColorLight;
  border-width: 0;
  > .slideable-line {
    background-color: $blue;
    border-radius: $slideableLineWidth;
    transition: all $duration;
  }
  > .actions-container {
    padding: 0.5em 1em;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // tab 横向排列样式
  &.horizontal {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom-width: $slideableLineWidth;
    > .slideable-line {
      height: $slideableLineWidth;
      position: absolute;
      top: 100%;
    }
    > .actions-container {
      margin-left: auto;
    }
  }
  // tab 纵向排列样式
  &.vertical {
    display: block;
    border-right-width: $slideableLineWidth;
    > .slideable-line {
      width: $slideableLineWidth;
      position: absolute;
      left: 100%;
    }
  }
}
</style>
