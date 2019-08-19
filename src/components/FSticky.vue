<template>
  <div
    class="f-sticky-container"
    ref="containerRef"
    :style="{ height: containerHeight }"
  >
    <div
      class="f-sticky"
      :class="toggleFixedClass"
      :style="{ width: stickyWidth, left: stickyLeft, top: stickyTop }"
      ref="stickyRef"
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
      containerHeight: null,
      stickyLeft: null,
      stickyTop: null,
      stickyWidth: null,
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

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.updateValueOfIsFixed);
    });
  },
  methods: {
    updateValueOfIsFixed(event) {
      this.updateStyle();
      window.scrollY > this.initContainerTop - this.distance
        ? (this.isFixed = true)
        : (this.isFixed = false);
    },
    updateStyle() {
      if (window.getComputedStyle(this.$refs.stickyRef).position === 'static') {
        // restore style property
        this.stickyLeft = null;
        this.stickyTop = null;
        this.stickyWidth = null;
        this.containerHeight = null;
      }
      const { containerRef } = this.$refs;
      const { left, width, height } = containerRef.getBoundingClientRect();
      this.stickyLeft = `${left}px`;
      this.stickyTop = `${this.distance}px`;
      this.stickyWidth = `${width}px`;
      this.containerHeight = `${height}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-sticky-container {
  .f-sticky {
    &.fixed {
      position: fixed;
    }
  }
}
</style>
