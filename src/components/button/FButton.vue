<template>
  <button class="f-button" @click="$emit('click')">
    <f-icon
      v-if="icon"
      :name="icon"
      :class="{ [`icon-${iconPosition}`]: true }"
    />
    <slot />
  </button>
</template>

<script>
import FIcon from '../FIcon.vue';

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
@import '../../assets/_var.scss';

.f-button {
  height: $height;
  font-size: $fontSize;
  padding: 0 1em;
  border-radius: $borderRadius;
  border: 1px solid $borderColor;
  background-color: $buttonBgColor;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // top/middle/bottom/text-top/text-bottom/-webkit-baseline-middle 都可以解决 inline 对不齐的 bug
  vertical-align: middle;

  &:hover {
    border-color: $borderColorHover;
  }
  &:active {
    background-color: $buttonActiveBgColor;
  }
  &:focus {
    outline: none;
  }
}
</style>
