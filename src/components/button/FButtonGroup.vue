<template>
  <!-- slot 不能作为组件根元素 -->
  <div class="f-button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUIButtonGroup',
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-button-group {
  @extend .f-button-group-common;
}
</style>
