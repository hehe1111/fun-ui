<template>
  <div class="cascader">
    <div class="trigger" @click="isPopoverVisiable = !isPopoverVisiable">
      {{ result }}
    </div>
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
    loadData: {
      type: Function,
    },
  },
  data() {
    return {
      isPopoverVisiable: false,
    };
  },
  computed: {
    result() {
      return this.selected.map(i => i.name).join(' / ');
    },
  },
  methods: {
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
      this.$emit('update:source', sourceCopy);
    },
    onUpdateSelected($event) {
      this.$emit('update:selected', $event);
      const latestSelected = JSON.parse(
        JSON.stringify($event[$event.length - 1])
      );
      this.loadData(latestSelected, this.updateSource);
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
