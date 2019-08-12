<template>
  <svg :class="classes" @click="$emit('click', $event)" ref="svgRef">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
import '../assets/svg.js';
import { optionsName2ClassPrefix } from '../assets/utils.js';

export default {
  name: 'FunUIIcon',
  props: {
    name: {
      type: String,
      required: true,
      validator(prop) {
        return !!prop;
      },
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      const { n2c } = this;
      return [`${n2c()}`, this.name === 'loading' ? n2c('loading') : ''];
    },
  },
  mounted() {
    this.updateStyle();
  },
  methods: {
    updateStyle() {
      const { style } = this.$refs.svgRef;
      const { size, color } = this;
      if (size) {
        style.width = `${size}`;
        style.height = `${size}`;
      }
      color && (style.fill = `${color}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.f-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;

  &-loading {
    animation: spin 1s infinite linear;
  }
}
</style>
