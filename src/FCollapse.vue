<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUICollapse',
};
</script>

<style lang="scss" scoped>
$borderColor: #ddd;
$borderRadius: 4px;

.collapse {
  border: 1px solid $borderColor;
  border-radius: $borderRadius;
}
</style>
