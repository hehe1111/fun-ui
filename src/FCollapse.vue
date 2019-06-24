<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'FunUICollapse',
  props: {
    opened: {
      type: Array,
      validator(value) {
        return value.every(n => typeof n === 'string');
      },
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    const openedCopy = this.checkOpened();
    this.eventBus.$emit('update:opened', openedCopy);
    this.onRemoveOpenedItem(openedCopy);
    this.onAddOpenedItem(openedCopy);
  },
  methods: {
    checkOpened() {
      const openedCopy = JSON.parse(JSON.stringify(this.opened));
      if (this.single && this.opened.length > 1) {
        console &&
          console.warn &&
          console.warn(
            '由于 single prop 为 true，因此 opened prop 应该是一个单元素数组'
          );
        return openedCopy.slice(0, 1);
      }
      return openedCopy;
    },
    onRemoveOpenedItem(items) {
      this.eventBus.$on('removeOpenedItem', item => {
        if (this.single) items.length = 0;
        const index = items.indexOf(item);
        index >= 0 && items.splice(index, 1);
        this.emitNewOpenedItems(items);
      });
    },
    onAddOpenedItem(items) {
      this.eventBus.$on('addOpenedItem', item => {
        if (this.single) items.length = 0;
        items.push(item);
        this.emitNewOpenedItems(items);
      });
    },
    emitNewOpenedItems(items) {
      const temp = JSON.parse(JSON.stringify(items));
      this.eventBus.$emit('update:opened', temp);
      this.$emit('update:opened', temp);
    },
  },
};
</script>

<style lang="scss" scoped>
$borderColor: #ddd;
$borderRadius: 4px;

.collapse {
  border: 1px solid $borderColor;
  border-radius: $borderRadius;
}
</style>
