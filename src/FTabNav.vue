<template>
  <div class="tab-nav">
    <slot></slot>
    <div class="actions-container">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNav',
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  inject: ['eventBus'],
};
</script>

<style lang="scss" scoped>

</style>
