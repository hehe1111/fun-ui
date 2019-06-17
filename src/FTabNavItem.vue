<template>
  <div class="tab-nav-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNavItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

style <style lang="scss" scoped>
</style>
