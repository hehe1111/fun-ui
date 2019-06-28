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
@import '../assets/_var.scss';

.cascader {
  position: relative;
  .trigger {
    width: 20em;
    height: 2em;
    border: 1px solid grey;
  }
  .popover {
    overflow: auto;
    margin-top: 0.2em;
    display: flex;
    position: absolute;
    top: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px 0 lighten($boxShadowColor, 34%);
    border-radius: $borderRadius;
  }
}
</style>
