<template>
  <div class="cascader-items" :style="cascaderItemsStyle">
    <div class="level left">
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
        :selected-result="selectedResult"
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
    selectedResult: {
      type: Array,
      default: () => [],
    },
  },
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
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
      const currentSelected = this.selectedResult[this.level];
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
      this.selected = item;
      this.eventBus.$emit &&
        this.eventBus.$emit('left-selected', { [this.level]: item });
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
