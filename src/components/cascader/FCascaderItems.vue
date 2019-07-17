<template>
  <div class="cascader-items" ref="cascaderItems">
    <div class="level left" :style="levelLeftStyle">
      <div
        class="label-container"
        :class="activeClass(item)"
        v-for="item in items"
        :key="item.name"
        @click="onSelected(item)"
      >
        <span class="label">{{ item.name }}</span>
        <f-icon name="right" v-if="isRightIconVisible(item)" />
        <f-icon name="loading" v-if="isLoadingIconVisible(item)" />
      </div>
    </div>
    <div class="level right" v-if="rightItems">
      <!-- 可以用 fun-u-i-cascader-items 也可以用 FunUICascaderItems -->
      <FunUICascaderItems
        :level="level + 1"
        :items="rightItems"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :height="height"
        :load-data="loadData"
        :loading-item="loadingItem"
      />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';

export default {
  name: 'FunUICascaderItems',
  props: {
    items: {
      type: Array,
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
    levelLeftStyle() {
      return {
        height: this.height,
      };
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
      const { actived, selected, level } = this;
      return {
        active:
          item.name === actived ||
          (selected[level] && item.name === selected[level].name),
      };
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
      const levelLeft = this.$refs.cascaderItems.querySelector('.level.left');
      const activeItem = this.$refs.cascaderItems.querySelector(
        '.label-container.active'
      );
      if (levelLeft && activeItem) {
        const levelLeftTop =
          levelLeft.getBoundingClientRect &&
          levelLeft.getBoundingClientRect().top;
        const activeItemTop =
          activeItem.getBoundingClientRect &&
          activeItem.getBoundingClientRect().top;
        if (activeItemTop > levelLeftTop) {
          levelLeft.scrollBy &&
            levelLeft.scrollBy({
              top: activeItemTop - levelLeftTop,
              behavior: 'smooth',
            });
        }
      }
    },
  },
  components: { FIcon },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.cascader-items {
  display: flex;
  > .level {
    overflow: auto;
    > .label-container {
      min-width: 6em;
      padding: 0.5em;
      display: flex;
      align-items: center;
      user-select: none;
      white-space: nowrap;
      cursor: pointer;
      &.active,
      &:hover {
        background-color: $grey;
      }
      > .label {
        justify-content: flex-start;
        flex: 1;
      }
      > .icon {
        transform: scale(0.7);
        margin-left: 1em;
      }
    }
  }
  > .level.right {
    border-left: 1px solid darken($grey, 8%);
  }
}
</style>
