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
    this.eventBus.$on('update:selected', value => {
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
      this.eventBus.$emit('update:selected', this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
$navItemBg: #ddd;

.tab-nav-item {
  flex-shrink: 0;
  padding: 0.5em 1em;
  &.active {
    background-color: $navItemBg;
  }
}
</style>
