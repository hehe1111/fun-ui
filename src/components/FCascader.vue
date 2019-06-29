<template>
  <div class="cascader">
    <div class="trigger" @click="isPopoverVisiable = !isPopoverVisiable"></div>
    <div class="popover" v-if="isPopoverVisiable">
      <f-cascader-items
        :items="source"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :height="popoverHeight"
      />
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
    selected: {
      type: Array,
      default: () => [],
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
  methods: {
    onUpdateSelected($event) {
      this.$emit('update:selected', $event);
    },
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
