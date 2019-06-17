<template>
  <div class="tab-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabBody',
  inject: ['eventBus'],
};
</script>

style <style lang="scss" scoped>
</style>
