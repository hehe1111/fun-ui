<template>
  <svg
    class="icon"
    :class="classes"
    aria-hidden="true"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
import '../assets/svg.js';

export default {
  name: 'FunUIIcon',
  props: {
    name: {
      type: String,
      validator(value) {
        return !!value;
      },
    },
  },
  computed: {
    classes() {
      return this.name === 'loading' ? 'loading' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  animation: spin 1s infinite linear;
}
</style>
