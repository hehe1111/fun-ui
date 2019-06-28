<template>
  <div class="cascader">
    <div class="trigger" @click="isPopoverVisiable = !isPopoverVisiable"></div>
    <div class="popover" v-if="isPopoverVisiable">
      <f-cascader-items :items="source" :height="popoverHeight" />
    </div>
  </div>
</template>

<script>
import FCascaderItems from './FCascaderItems';

export default {
  name: 'FunUIFCascader',
  props: {
    source: {
      type: Array,
    },
    popoverHeight: {
      type: String,
      default: '14em',
    },
  },
  data() {
    return {
      isPopoverVisiable: false,
    };
  },
  components: { FCascaderItems },
};
</script>
<style lang="scss" scoped>
.cascader {
  .trigger {
    width: 20em;
    height: 2em;
    border: 1px solid red;
  }
  .popover {
    overflow: auto;
    border: 1px solid red;
    display: flex;
  }
}
</style>
