<template>
  <div class="layout" :class="{ 'has-sidebar': hasSidebar }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FunUILayout",
  data() {
    return {
      hasSidebar: false,
    };
  },
  mounted() {
    this.$children.forEach(vm => {
      if (vm.$options.name === "FunUISidebar") {
        this.hasSidebar = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.layout {
  overflow-x: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  &.has-sidebar {
    flex-direction: row;
  }
}
</style>
