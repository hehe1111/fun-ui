<template>
  <div :class="classes">
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
      :class="n2c('clear-icon')"
      @click="onClickClearIcon"
    />
    <span :class="n2c('hint-container')" v-if="hint">
      <f-icon :class="n2c(`${hint.type}-icon`)" :name="iconName" />
      <span :class="n2c(`${hint.type}-hint`)">{{ hint.message }}</span>
    </span>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';
import { optionsName2ClassPrefix, oneOf, getTypeOf } from '../assets/utils.js';

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
    hint: {
      type: Object,
      validator(prop) {
        return (
          oneOf(prop.type, ['success', 'error', 'warning', 'info']) &&
          getTypeOf(prop.message) === 'string'
        );
      },
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      return [this.n2c(), this.hint && this.n2c(this.hint.type)];
    },
    iconName() {
      const map = {
        success: 'check',
        error: 'cross',
        warning: 'warning',
        info: 'info',
      };
      return map[this.hint.type];
    },
  },
  mounted() {
    this.autoFocus && this.$refs.inputRef.focus();
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

@mixin hintStyle($color) {
  > input {
    &,
    &:hover,
    &:focus {
      border-color: $color;
    }
  }
  &-icon {
    fill: $color;
  }
  &-hint {
    color: $color;
  }
}

.f-input {
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
    &:hover,
    &:focus {
      border-color: $blue;
    }
    &:focus {
      outline: none;
    }
    &[disabled],
    &[readonly] {
      border-color: lighten($grey, 30%);
      cursor: not-allowed;

      + .f-input-clear-icon {
        display: none;
      }
    }
    &[disabled] {
      color: lighten($grey, 10%);
    }
  }

  &-clear-icon {
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
      fill: $blue;
    }
  }

  &-hint-container {
    @extend .inline-flex-center;
  }

  &-success {
    @include hintStyle($green);
  }
  &-error {
    @include hintStyle($red);
  }
  &-warning {
    @include hintStyle($yellow);
  }
  &-info {
    @include hintStyle($blue);
  }
}
</style>
