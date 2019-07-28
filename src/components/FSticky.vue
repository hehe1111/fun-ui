<template>
  <div
    class="f-sticky-container"
    ref="containerRef"
    :style="{ height: containerHeight }"
  >
    <div
      class="f-sticky"
      :class="toggleFixedClass"
      :style="{ width: stickyWidth, left: stickyLeft }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUISticky',
  props: {
    distance: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isFixed: false,
      initContainerTop: 0,
      containerHeight: undefined,
      stickyLeft: undefined,
      stickyWidth: undefined,
    };
  },
  computed: {
    toggleFixedClass() {
      return {
        fixed: this.isFixed,
      };
    },
  },
  mounted() {
    this.initContainerTop =
      this.$refs.containerRef.getBoundingClientRect().top + window.scrollY;
    window.addEventListener('scroll', this.updateValueOfIsFixed);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateValueOfIsFixed);
  },
  methods: {
    updateValueOfIsFixed(event) {
      this.updateStyle();
      window.scrollY > this.initContainerTop
        ? (this.isFixed = true)
        : (this.isFixed = false);
    },
    updateStyle() {
      const { containerRef } = this.$refs;
      const { left, width, height } = containerRef.getBoundingClientRect();
      this.stickyLeft = `${left}px`;
      this.stickyWidth = `${width}px`;
      this.containerHeight = `${height}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.f-sticky-container {
  .f-sticky {
    &.fixed {
      position: fixed;
      top: 0;
    }
  }
}
</style>
