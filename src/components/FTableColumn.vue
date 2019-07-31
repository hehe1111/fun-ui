<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUITableColumn',
  props: {
    text: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
