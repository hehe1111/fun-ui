<template>
  <button class="f-button" @click="$emit('click')">
    <f-icon v-if="icon" :name="icon" :class="{[`icon-${iconPosition}`]: true}"></f-icon>
    <slot></slot>
  </button>
</template>

<script>
import FIcon from './FIcon.vue';

export default {
  name: 'FunUIButton',
  props: {
    icon: {
      type: String,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return value === 'left' || value === 'right';
      },
    },
  },
  components: {
    FIcon,
  },
};
</script>

<style lang="scss" scoped>
.f-button {
  height: var(--button-height);
  font-size: var(--font-size);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--button-bg-color);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // top/middle/bottom/text-top/text-bottom/-webkit-baseline-middle 都可以解决 inline 对不齐的 bug
  vertical-align: middle;

  &:hover {
    border-color: var(--border-hover-color);
  }
  &:active {
    background-color: var(--button-active-bg-color);
  }
  &:focus {
    outline: none;
  }
}
</style>
