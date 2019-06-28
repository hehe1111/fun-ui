<template>
  <div class="cascader-items" :style="cascaderItemsStyle">
    <div class="level left">
      <div
        class="label-container"
        v-for="item in items"
        :key="item.name"
        @click="selected = item"
      >
        <span class="label">{{ item.name }}</span>
        <template v-if="item.children && item.children.length">
          <f-icon name="right" />
        </template>
      </div>
    </div>
    <div class="level right" v-if="rightItems">
      <fun-u-i-cascader-items :items="rightItems" />
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
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    cascaderItemsStyle() {
      return {
        height: this.height,
      };
    },
    rightItems() {
      const { selected } = this;
      if (selected && selected.children && selected.children.length) {
        return selected.children;
      } else {
        return null;
      }
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
  height: 100%;
  display: flex;
  > .level {
    height: 100%;
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
