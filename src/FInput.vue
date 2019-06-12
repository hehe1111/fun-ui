<template>
  <div class="input-wrapper" :class="{error}">
    <input
      type="text"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    >
    <f-icon name="error" class="clear-text-icon" @click="$emit('click', $event)" v-if="clearable"></f-icon>
    <template v-if="error">
      <f-icon name="error"></f-icon>
      <span>{{ error }}</span>
    </template>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';

export default {
  name: 'FunUIInput',
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FIcon,
  },
};
</script>

<style lang="scss" scoped>
$width: 400px;
$height: 32px;
$font-size: 14px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$red: #f1453d;

.input-wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  :not(:last-child) {
    margin-right: 0.5em;
  }

  > input {
    width: $width;
    height: $height;
    padding: 0 0.5em;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: inherit;
    position: relative;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
      outline: none;
    }
    &[disabled],
    &[readonly] {
      color: #bbb;
      border-color: #bbb;
      cursor: not-allowed;
    }
  }
  &.error {
    color: $red;
    > input {
      border-color: $red;
      &:focus {
        box-shadow: inset 0 1px 3px $red;
      }
      &:hover {
        border-color: red;
      }
    }
  }
  &.clear-text-icon {
    position: absolute;
    top: 50%;
    right: 0.8em;
    transform: translateY(-50%);
  }
}
</style>
