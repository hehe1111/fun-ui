<template>
  <div class="tab-nav">
    <slot></slot>
    <div class="bottom-line" ref="bottomLine"></div>
    <div class="actions-container">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNav',
  inject: ['eventBus'],
  mounted() {
    this.getBottomLineStyle();
  },
  methods: {
    getBottomLineStyle() {
      this.eventBus.$on('update:selected', (value, vm) => {
        const { width, left } = vm.$el.getBoundingClientRect();
        this.$refs.bottomLine.style.width = `${width}px`;
        this.$refs.bottomLine.style.left = `${left}px`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$blue: blue;
$transitionDuration: 0.4s;
$bottomLineHeight: 2px;
$borderColor: #ddd;

.tab-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  border-bottom: $bottomLineHeight solid $borderColor;
  > .bottom-line {
    position: absolute;
    top: 100%;
    height: $bottomLineHeight;
    border-radius: $bottomLineHeight;
    background-color: $blue;
    transition: all $transitionDuration;
  }
  > .actions-container {
    margin-left: auto;
    padding: 0.5em 1em;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
