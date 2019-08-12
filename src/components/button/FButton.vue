<template>
  <button :class="classes" @click="onClick">
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
import { optionsName2ClassPrefix, oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUIButton',
  components: { FIcon },
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
    type: {
      type: String,
      default: 'default',
      validator(prop) {
        return oneOf(prop, [
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'danger',
        ]);
      },
    },
    round: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      const { n2c, type, round, small, disabled } = this;
      return [
        n2c(),
        {
          [`${n2c(type)}`]: type,
          [`${n2c('round')}`]: round,
          [`${n2c('small')}`]: small,
          [`${n2c('disabled')}`]: disabled,
        },
      ];
    },
  },
  methods: {
    onClick($event) {
      !this.disabled && this.$emit('click', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

@mixin button-color($color) {
  background-color: $color;
  border-color: $color;
  &:hover,
  &:focus {
    background-color: lighten($color, 10%);
    border-color: lighten($color, 10%);
  }
  &:active {
    background-color: $color;
    border-color: $color;
  }
}

.f-button {
  @extend .inline-flex-center;
  line-height: 1;
  font-size: $fontSize;
  padding: 0.5em 1em;
  margin: 4px;
  border-radius: $borderRadius;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  transition: all $duration linear;
  // top/middle/bottom/text-top/text-bottom/-webkit-baseline-middle 都可以解决 inline 对不齐的 bug
  vertical-align: middle;
  white-space: nowrap;

  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.9);
  }

  &-default {
    background-color: $buttonBgColor;
    border-color: $borderColor;
    &:hover {
      border-color: $borderColorHover;
    }
    &:active {
      background-color: lighten($grey, 20%);
    }
  }

  &-primary,
  &-info,
  &-success,
  &-warning,
  &-danger {
    color: #fff;
  }
  &-primary {
    @include button-color($blue);
  }
  &-info {
    @include button-color($grey);
  }
  &-success {
    @include button-color($green);
  }
  &-warning {
    @include button-color($yellow);
  }
  &-danger {
    @include button-color($red);
  }

  &-round {
    border-radius: 1000px;
  }

  &-small {
    padding: 4px;
  }

  &-disabled {
    cursor: not-allowed;
    color: #fff;
    &,
    &:hover,
    &:focus,
    &:active {
      transform: scale(1);
      background-color: lighten($grey, 30%);
      border-color: lighten($grey, 30%);
    }
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
