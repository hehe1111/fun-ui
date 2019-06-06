<template>
  <!-- slot 不能作为组件根元素 -->
  <div class="f-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FunUIButtonGroup",
};
</script>

<style lang="scss" scoped>
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
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }
  > :last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
}
</style>
