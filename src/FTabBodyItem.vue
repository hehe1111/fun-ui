<template>
  <div class="tab-body-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabBodyItem',
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  inject: ['eventBus'],
  created() {
    this.eventBus.$on('update:selected', value => {
      console.log('bodyitem', value);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
