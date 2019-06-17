<template>
  <div class="tab-nav">
    <slot></slot>
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
};
</script>

style <style lang="scss" scoped>
</style>
