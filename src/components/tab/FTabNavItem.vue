<template>
  <div :class="classes" @click="switchTab" :data-name="name">
    <slot />
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUITabNavItem',
  data() {
    return {
      selected: null,
      active: false,
    };
  },
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  // inject: ['eventBus'],
  // 可选注入，以便测试
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      const { n2c, active, disabled } = this;
      return [
        this.n2c(),
        { [`${n2c('active')}`]: active, [`${n2c('disabled')}`]: disabled },
      ];
    },
  },
  created() {
    this.eventBus.$on &&
      this.eventBus.$on('update:selected', ({ name, vm }) => {
        this.active = this.name === name;
      });
  },
  methods: {
    switchTab() {
      if (this.disabled) return;
      this.eventBus.$emit &&
        this.eventBus.$emit('update:selected', { name: this.name, vm: this });
      this.$emit('click', this);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-tab-nav-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: all $duration;

  &-active {
    color: $blue;
  }

  &-disabled {
    color: lightGrey;
    cursor: not-allowed;
  }
}
</style>
