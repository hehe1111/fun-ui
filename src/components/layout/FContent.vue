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
@import '../../assets/_var.scss';

.content {
  flex: 1;
}
</style>
