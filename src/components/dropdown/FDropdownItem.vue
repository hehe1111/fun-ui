<template>
  <div class="f-dropdown-item" @click="onClick" :style="itemStyle">
    <slot />
  </div>
</template>

<script>
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
  },
  methods: {
    onClick() {
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
}
</style>
