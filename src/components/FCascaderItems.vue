<template>
  <div class="cascader-items">
    <div class="level left">
      <div
        class="label"
        v-for="item in items"
        :key="item.name"
        @click="selected = item"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      class="level right"
      v-if="selected && selected.children && selected.children.length"
    >
      <fun-u-i-cascader-items :items="selected.children" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUICascaderItems',
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.cascader-items {
  height: 100%;
  display: flex;
  > .level {
    height: 100%;
  }
  > .left {
    border: 1px solid red;
    > .label {
      padding: 0.5em 1em;
    }
  }
}
</style>
