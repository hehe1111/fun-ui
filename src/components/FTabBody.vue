<template>
  <div class="tab-body">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUITabBody',
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-body {
  flex: 1;
}
</style>
