<template>
  <div :class="n2c()" ref="cascaderItems">
    <div :class="n2c('left')" v-hide-scrollbar:[widthAndHeight]>
      <div
        :class="activeClass(item)"
        v-for="item in items"
        :key="item.name"
        @click="onSelected(item)"
      >
        <span :class="n2c('label')">{{ item.name }}</span>
        <f-icon
          :class="n2c('icon')"
          name="right"
          v-if="isRightIconVisible(item)"
        />
        <f-icon
          :class="n2c('icon')"
          name="loading"
          v-if="isLoadingIconVisible(item)"
        />
      </div>
    </div>
    <div :class="n2c('right')" v-if="rightItems">
      <!-- 可以用 fun-u-i-cascader-items 也可以用 FunUICascaderItems -->
      <FunUICascaderItems
        :level="level + 1"
        :items="rightItems"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :width="width"
        :height="height"
        :load-data="loadData"
        :loading-item="loadingItem"
      />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import { optionsName2ClassPrefix } from '../../assets/utils.js';
import hideScrollbar from '../../directives/hide-scrollbar.js';

export default {
  name: 'FunUICascaderItems',
  components: { FIcon },
  directives: { hideScrollbar },
  props: {
    items: {
      type: Array,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    level: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Array,
    },
    loadData: {
      type: Function,
    },
    loadingItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      actived: '',
    };
  },
  mounted() {
    this.scrollToSelectedItem();
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    widthAndHeight() {
      const { width, height } = this;
      return { width, height };
    },
    rightItems() {
      // this.selected 只记录每一层选中的值，其元素不会有 children 属性
      // this.items 来源于顶层的 source
      // source 经过更新后，其元素会有 children 属性
      // 所以应该从 this.items 里拿 children 作为 rightItems 进行渲染
      if (this.selected[this.level]) {
        let currentSelected = this.items.filter(
          item => item.name === this.selected[this.level].name
        )[0];
        if (currentSelected.children && currentSelected.children.length) {
          return currentSelected.children;
        }
      }
      return null;
    },
  },
  methods: {
    activeClass(item) {
      const { n2c, actived, selected, level } = this;
      return [
        n2c('label-container'),
        {
          active:
            item.name === actived ||
            (selected[level] && item.name === selected[level].name),
        },
      ];
    },
    onSelected(item) {
      this.actived = item.name;

      const selectedCopy = JSON.parse(JSON.stringify(this.selected));
      this.$set(selectedCopy, this.level, item);
      selectedCopy.splice(this.level + 1);
      this.$emit('update:selected', selectedCopy);
    },
    onUpdateSelected($event) {
      this.$emit('update:selected', $event);
    },
    isRightIconVisible(item) {
      if (this.isLoadingIconVisible(item)) return false;
      return this.loadData ? !item.isLeaf : item.children;
    },
    isLoadingIconVisible(item) {
      const { loadingItem } = this;
      // item.id === loadingItem.id 剔除掉区名跟市名相同的情况，做到只高亮市名 省-市-区
      return item.name === loadingItem.name && item.id === loadingItem.id;
    },
    scrollToSelectedItem() {
      const left = this.$refs.cascaderItems.querySelector(
        '.f-cascader-items-left'
      );
      const activeItem = this.$refs.cascaderItems.querySelector(
        '.f-cascader-items-label-container.active'
      );
      if (left && activeItem) {
        const leftTop = left.getBoundingClientRect().top;
        const activeItemTop = activeItem.getBoundingClientRect().top;
        if (activeItemTop > leftTop) {
          left.scrollBy &&
            left.scrollBy({
              top: activeItemTop - leftTop,
              behavior: 'smooth',
            });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-cascader-items {
  display: flex;

  &-left {
    order: 0;
  }

  &-right {
    order: 1;
    border-left: 1px solid darken($lightGrey, 8%);
  }

  &-label-container {
    padding: 0.5em;
    display: flex;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    &.active,
    &:hover {
      background-color: $lightGrey;
    }
  }

  &-label {
    justify-content: flex-start;
    flex: 1;
  }

  &-icon {
    transform: scale(0.7);
    margin-left: 1em;
  }
}
</style>
