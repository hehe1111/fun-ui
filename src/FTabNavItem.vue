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
    disable: {
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
      };
    },
  },
  methods: {
    switchTab() {
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
  align-items: center;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: all $transitionDuration;
  &.active {
    color: $blue;
  }
}
</style>
