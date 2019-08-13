<template>
  <div :class="n2c()">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUICollapse',
  props: {
    opened: {
      type: Array,
      default: () => [''],
      validator(value) {
        return value.every(n => typeof n === 'string');
      },
    },
    multiple: {
      type: Boolean,
      default: true,
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
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
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
      if (!this.multiple && this.opened.length > 1) {
        console &&
          console.warn &&
          console.warn('Prop "opened" should be a one-element array');
        return openedCopy.slice(0, 1);
      }
      return openedCopy;
    },
    onRemoveOpenedItem() {
      const { openedCopy } = this;
      this.eventBus.$on('removeOpenedItem', item => {
        if (!this.multiple) openedCopy.splice(0);
        const index = openedCopy.indexOf(item);
        index >= 0 && openedCopy.splice(index, 1);
        this.emitNewOpenedItems(openedCopy);
      });
    },
    onAddOpenedItem() {
      const { openedCopy } = this;
      this.eventBus.$on('addOpenedItem', item => {
        if (!this.multiple) openedCopy.splice(0);
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
@import '../../assets/_var.scss';

.f-collapse {
  border: 1px solid $borderColorLight;
  border-radius: $borderRadius;
}
</style>
