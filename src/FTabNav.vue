<template>
  <div class="tab-nav">
    <slot></slot>
    <div class="actions-container">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUITabNav',
  inject: ['eventBus'],
};
</script>

<style lang="scss" scoped>
.tab-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > .actions-container {
    margin-left: auto;
    flex-shrink: 0;
  }
}
</style>
