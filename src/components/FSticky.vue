<template>
  <div class="f-sticky-container" ref="containerRef">
    <div class="f-sticky" :class="toggleFixedClass">
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
      initStickyTop: 0,
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
    const { top } = this.$refs.containerRef.getBoundingClientRect();
    this.initStickyTop = top + window.scrollY;
    window.addEventListener('scroll', this.updateValueOfIsFixed);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateValueOfIsFixed);
  },
  methods: {
    updateValueOfIsFixed(event) {
      const { containerRef } = this.$refs;
      containerRef.style.height = `${
        containerRef.getBoundingClientRect().height
      }px`;
      window.scrollY > this.initStickyTop
        ? (this.isFixed = true)
        : (this.isFixed = false);
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
      left: 0;
      width: 100%;
    }
  }
}
</style>
