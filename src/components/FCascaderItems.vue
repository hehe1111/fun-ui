<template>
  <div class="cascader-items">
    <div class="level left" :style="levelLeftStyle">
      <div
        class="label-container"
        :class="{ active: actived === item.name }"
        v-for="item in items"
        :key="item.name"
        @click="onSelected(item)"
      >
        <span class="label">{{ item.name }}</span>
        <template v-if="item.children && item.children.length">
          <f-icon name="right" />
        </template>
      </div>
    </div>
    <div class="level right" v-if="rightItems">
      <fun-u-i-cascader-items
        :level="level + 1"
        :items="rightItems"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :height="height"
      />
    </div>
  </div>
</template>

<script>
import FIcon from './FIcon';

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
  },
  data() {
    return {
      actived: '',
    };
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
  },
  components: {
    FIcon,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.cascader-items {
  display: flex;
  > .level {
    overflow: auto;
    > .label-container {
      min-width: 6em;
      padding: 0.5em;
      display: flex;
      align-items: center;
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
