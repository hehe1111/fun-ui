<template>
  <button class="f-button" :class="{ disabled }" @click="onClick">
    <f-icon
      v-if="icon"
      :name="icon"
      :class="{ [`icon-${iconPosition}`]: $slots.default }"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      !this.disabled && this.$emit('click');
    },
  },
  components: { FIcon },
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
  user-select: none;
  cursor: pointer;
  @extend .inline-flex-center;
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
  &.disabled {
    cursor: not-allowed;
    background-color: $grey;
    color: $disabledGrey;
  }
  &.disabled,
  &.disabled:hover {
    border-color: $disabledGrey;
  }
  > .icon-left {
    margin-right: 6px;
  }
  // order 默认为 0
  > .icon-right {
    margin-left: 6px;
    order: 1;
  }
}
</style>
