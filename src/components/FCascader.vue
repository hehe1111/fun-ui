<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="togglePopover">{{ result }}</div>
    <div class="popover" v-if="isPopoverVisiable">
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
import FCascaderItems from './FCascaderItems';
import { clickOutside } from './directives';

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
      isPopoverVisiable: false,
      loadingItem: {},
    };
  },
  computed: {
    result() {
      return this.selected.map(i => i.name).join(' / ');
    },
  },
  methods: {
    togglePopover() {
      this.isPopoverVisiable ? this.close() : this.open();
    },
    open() {
      if (this.isPopoverVisiable) return;
      this.isPopoverVisiable = true;
    },
    close() {
      if (!this.isPopoverVisiable) return;
      this.isPopoverVisiable = false;
    },
    updateSource(result) {
      const latestSelected = this.selected[this.selected.length - 1];
      const simple = (targetArray, id) => {
        return targetArray.filter(n => n.id === id)[0];
      };
      const complex = (targetArray, id) => {
        let found = simple(targetArray, id);
        if (found) {
          return found;
        }
        const hasChildren = [];
        const noChildren = [];
        targetArray.forEach(n => {
          n.children ? hasChildren.push(n) : noChildren.push(n);
        });
        for (let i = 0; i < hasChildren.length; i++) {
          found = complex(hasChildren[i].children, id);
          if (found) {
            return found;
          }
        }
      };

      const sourceCopy = JSON.parse(JSON.stringify(this.source));
      const willBeUpdated = complex(sourceCopy, latestSelected.id);
      if (willBeUpdated && result.length) willBeUpdated.children = result;
      // 数据更新完成（数据加载完成之后还需要更新到 source 上）
      this.$emit('update:source', sourceCopy);
      this.loadingItem = {};
    },
    onUpdateSelected($event) {
      this.$emit('update:selected', $event);

      const latestSelected = JSON.parse(
        JSON.stringify($event[$event.length - 1])
      );
      if (!latestSelected.isLeaf && this.loadData) {
        // 开始加载数据
        this.loadingItem = latestSelected;
        this.loadData(latestSelected, this.updateSource);
      }
    },
  },
  components: { FCascaderItems },
  directives: { clickOutside },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

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
