<template>
  <div class="tab-nav-item" @click="switchTab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNavItem',
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  inject: ['eventBus'],
  created() {
    this.eventBus.$on('update:selected', value => {
      console.log('navitem', value);
    });
  },
  methods: {
    switchTab() {
      this.eventBus.$emit('update:selected', this.name);
    },
  },
};
</script>

style <style lang="scss" scoped>
</style>
