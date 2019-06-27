<template>
  <div class="collapse">
    <slot />
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
    this.openedCopy = this.checkOpened();
    this.eventBus.$emit('update:opened', this.openedCopy);
    this.onRemoveOpenedItem();
    this.onAddOpenedItem();
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
    onRemoveOpenedItem() {
      const { openedCopy } = this;
      this.eventBus.$on('removeOpenedItem', item => {
        if (this.single) openedCopy.splice(0);
        const index = openedCopy.indexOf(item);
        index >= 0 && openedCopy.splice(index, 1);
        this.emitNewOpenedItems(openedCopy);
      });
    },
    onAddOpenedItem() {
      const { openedCopy } = this;
      this.eventBus.$on('addOpenedItem', item => {
        if (this.single) openedCopy.splice(0);
        openedCopy.push(item);
        this.emitNewOpenedItems(openedCopy);
      });
    },
    emitNewOpenedItems() {
      const { openedCopy } = this;
      this.eventBus.$emit('update:opened', openedCopy);
      this.$emit('update:opened', openedCopy);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.collapse {
  border: 1px solid $borderColorLight;
  border-radius: $borderRadius;
}
</style>
