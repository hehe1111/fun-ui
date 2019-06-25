<template>
  <!-- slot 不能作为组件根元素 -->
  <div class="f-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUIButtonGroup',
};
</script>

<style lang="scss" scoped>
$borderRadius: 4px;

.f-button-group {
  display: inline-flex;
  vertical-align: middle;

  > button {
    margin-left: -1px;
    border-radius: 0;
  }
  // 解决 hover 时 margin-left: -1px; 的 bug
  > button:hover {
    position: relative;
    z-index: 1;
  }
  > :first-child {
    border-top-left-radius: $borderRadius;
    border-bottom-left-radius: $borderRadius;
  }
  > :last-child {
    border-top-right-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
