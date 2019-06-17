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
      type: String,
      required: true,
    },
  },
};
</script>

style <style lang="scss" scoped>
</style>
