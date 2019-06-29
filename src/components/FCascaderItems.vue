<template>
  <div class="cascader-items">
    <div class="level left" :style="levelLeftStyle">
      <div
        class="label-container"
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
  computed: {
    levelLeftStyle() {
      return {
        height: this.height,
      };
    },
    rightItems() {
      const currentSelected = this.selected[this.level];
      if (
        currentSelected &&
        currentSelected.children &&
        currentSelected.children.length
      ) {
        return currentSelected.children;
      } else {
        return null;
      }
    },
  },
  methods: {
    onSelected(item) {
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
