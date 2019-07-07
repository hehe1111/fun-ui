<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="togglePopover" ref="popoverRef">
      {{ result || `&nbsp;` }}
      <f-icon
        name="error"
        class="icon"
        @click="clearSelected"
        ref="clearIconRef"
      />
    </div>
    <div class="popover" v-if="isPopoverVisible">
      <f-cascader-items
        :items="source"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :height="popoverHeight"
        :load-data="loadData"
        :loading-item="loadingItem"
      />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import FCascaderItems from './FCascaderItems.vue';
import clickOutside from '../../directives/click-outside.js';

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
    loadData: {
      type: Function,
    },
  },
  data() {
    return {
      isPopoverVisible: false,
      loadingItem: {},
    };
  },
  computed: {
    result() {
      return this.selected.map(i => i.name).join(' / ');
    },
  },
  methods: {
    togglePopover($event) {
      if (!$event.target.contains(this.$refs.popoverRef)) return;
      this.isPopoverVisible ? this.close() : this.open();
    },
    open() {
      if (this.isPopoverVisible) return;
      this.isPopoverVisible = true;
    },
    close() {
      if (!this.isPopoverVisible) return;
      this.isPopoverVisible = false;
    },
    searchSelectedItem(sourceArray, id) {
      let selectedItem = sourceArray.filter(n => n.id === id)[0];
      if (selectedItem) return selectedItem;

      const hasChildren = [];
      sourceArray.forEach(n => (n.children ? hasChildren.push(n) : null));
      for (let i = 0; i < hasChildren.length; i++) {
        selectedItem = this.searchSelectedItem(hasChildren[i].children, id);
        if (selectedItem) return selectedItem;
      }
    },
    updateSource(result) {
      const latestSelected = this.selected[this.selected.length - 1];
      const sourceCopy = JSON.parse(JSON.stringify(this.source));

      const willBeUpdated = this.searchSelectedItem(
        sourceCopy,
        latestSelected.id
      );
      if (willBeUpdated && result.length) willBeUpdated.children = result;
      // 数据更新完成（数据加载完成之后还需要更新到 source 上）
      this.$emit('update:source', sourceCopy);
      this.loadingItem = {};
    },
    onUpdateSelected($event) {
      this.$emit('update:selected', $event);
      this.execLoadData($event);
    },
    execLoadData(newSelected) {
      const latestSelected = JSON.parse(
        JSON.stringify(newSelected[newSelected.length - 1])
      );
      if (!latestSelected.isLeaf && this.loadData) {
        // 开始加载数据
        this.loadingItem = latestSelected;
        this.loadData(latestSelected, this.updateSource);
      }
    },
    clearSelected($event) {
      this.$emit('update:selected', []);
    },
  },
  components: { FCascaderItems, FIcon },
  directives: { clickOutside },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.cascader {
  display: inline-block;
  position: relative;
  .trigger {
    width: 20em;
    height: 2em;
    padding: 0 0.5em;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    display: flex;
    align-items: center;

    > .icon {
      margin-left: auto;
      display: none;
    }

    &:hover {
      > .icon {
        display: inline-block;
      }
    }
  }
  .popover {
    margin-top: 0.2em;
    display: flex;
    position: absolute;
    top: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px 0 lighten($boxShadowColor, 34%);
    border-radius: $borderRadius;
    z-index: 1;
  }
}
</style>
