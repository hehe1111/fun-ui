<template>
  <div class="content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUIContent',
};
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}
</style>
