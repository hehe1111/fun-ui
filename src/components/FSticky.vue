<template>
  <div class="f-sticky" ref="stickyRef" :class="toggleFixedClass">
    <slot />
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
    this.initStickyTop =
      this.$refs.stickyRef.getBoundingClientRect().top + window.scrollY;
    window.addEventListener('scroll', this.updateValueOfIsFixed);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateValueOfIsFixed);
  },
  methods: {
    updateValueOfIsFixed(event) {
      window.scrollY > this.initStickyTop
        ? (this.isFixed = true)
        : (this.isFixed = false);
    },
  },
};
</script>

<style lang="scss" scoped>
.f-sticky {
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
