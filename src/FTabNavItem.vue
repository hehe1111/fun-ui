<template>
  <div class="tab-nav-item" :class="classes" @click="switchTab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNavItem',
  data() {
    return {
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
  inject: ['eventBus'],
  created() {
    this.eventBus.$on('update:selected', (value, vm) => {
      this.active = this.name === value;
    });
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled,
      };
    },
  },
  methods: {
    switchTab() {
      if (this.disabled) return;
      this.eventBus.$emit('update:selected', this.name, this);
    },
  },
};
</script>

<style lang="scss" scoped>
$blue: blue;
$transitionDuration: 0.4s;

.tab-nav-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: all $transitionDuration;
  &.active {
    color: $blue;
  }
  &.disabled {
    color: grey;
    cursor: not-allowed;
  }
}
</style>
