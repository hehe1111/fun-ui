<template>
  <div :class="classes" @click="onClick" :style="itemStyle">
    <slot />
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUIDropdownItem',
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  props: {
    itemStyle: {
      type: Object,
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
      return [this.n2c(), { [`${this.n2c('disabled')}`]: this.disabled }];
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      this.eventBus.$emit && this.eventBus.$emit('selected');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-dropdown-item {
  padding: 0.5em 1em;
  cursor: pointer;
  user-select: none;

  &-disabled {
    cursor: not-allowed;
    color: #fff;
    &,
    &:hover,
    &:focus,
    &:active {
      background-color: lighten($grey, 30%);
    }
  }
}
</style>
