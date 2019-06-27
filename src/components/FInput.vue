<template>
  <div class="input-wrapper" :class="classes">
    <input
      type="text"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <f-icon
      name="error"
      class="clear-text-icon"
      @click="$emit('click', $event)"
      v-if="clearable"
    />
    <template v-if="error">
      <f-icon name="error" />
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
  computed: {
    classes() {
      return { error: this.error };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.input-wrapper {
  font-size: $fontSize;
  display: inline-flex;
  align-items: center;
  position: relative;
  :not(:last-child) {
    margin-right: 0.5em;
  }

  > input {
    width: $inputWidth;
    height: $height;
    padding: 0 0.5em;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    font-size: inherit;
    position: relative;
    &:hover {
      border-color: $borderColorHover;
    }
    &:focus {
      box-shadow: inset 0 0 5px $boxShadow;
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
    color: $errorColor;
    > input {
      border-color: $errorColor;
      &:focus {
        box-shadow: inset 0 0 5px $errorColor;
      }
      &:hover {
        border-color: red;
      }
    }
  }
  > .clear-text-icon {
    position: absolute;
    top: 50%;
    right: 0.8em;
    transform: translateY(-50%);
  }
}
</style>
