<template>
  <div class="f-input-wrapper" :class="wrapperClasses">
    <input
      type="text"
      :value="value"
      ref="inputRef"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @mousedown="onMouseDown"
    />
    <f-icon
      v-if="clearable"
      name="circle-cross"
      class="f-input-clear-icon"
      @click="onClickClearIcon"
    />
    <template v-if="error">
      <f-icon name="circle-cross" />
      <span>{{ error }}</span>
    </template>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';

export default {
  name: 'FunUIInput',
  components: { FIcon },
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
      default: true,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    wrapperClasses() {
      return { error: this.error };
    },
  },
  methods: {
    onInput($event) {
      this.$refs.inputRef.value = $event.target.value;
      this.$emit('input', $event.target.value);
    },
    onChange($event) {
      this.$emit('change', $event.target.value);
    },
    onFocus($event) {
      this.$emit('focus', $event.target.value);
    },
    onBlur($event) {
      this.$emit('blur', $event.target.value);
    },
    onMouseDown($event) {
      this._unselectableIfReadonly($event);
    },
    _unselectableIfReadonly($event) {
      this.readonly && $event.preventDefault();
    },
    onClickClearIcon() {
      this.$refs.inputRef.value = '';
      this.$emit('clear', '');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-input-wrapper {
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
    padding: 0 1.4em 0 0.5em;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    font-size: inherit;
    position: relative;
    &:hover {
      border-color: $borderColorHover;
    }
    &:focus {
      box-shadow: inset 0 0 5px $boxShadowColor;
      outline: none;
    }
    &[disabled],
    &[readonly] {
      color: $grey;
      border-color: $grey;
      cursor: not-allowed;

      + .f-input-clear-icon {
        display: none;
      }
    }
  }

  &.error {
    color: $red;
    > input {
      border-color: $red;
      &:focus {
        box-shadow: inset 0 0 5px $red;
      }
      &:hover {
        border-color: red;
      }
    }
  }

  > .f-input-clear-icon {
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%) scale(1.2);
    display: none;
  }

  &:hover,
  &:focus {
    > .f-input-clear-icon {
      display: block;
    }
  }
}
</style>
