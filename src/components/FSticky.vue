<template>
  <div class="f-sticky" ref="stickyRef">
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
      initStickyTop: 0,
    };
  },
  mounted() {
    // reset to make sure getting right initStickyTop
    window.scrollY !== 0 && window.scroll(0, 0);
    this.initStickyTop = this.$refs.stickyRef.getBoundingClientRect().top;
    window.addEventListener('scroll', this.toggleFixedClass);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.toggleFixedClass);
  },
  methods: {
    toggleFixedClass(event) {
      const { classList } = this.$refs.stickyRef;
      window.scrollY > this.initStickyTop
        ? classList.add('fixed')
        : classList.remove('fixed');
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
