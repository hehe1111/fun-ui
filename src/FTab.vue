<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'FunUITab',
  props: {
    selected: {
      type: [String, Number],
      required: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0;
      },
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
    this.eventBus.$emit('update:selected', this.selected);
  },
};
</script>

<style lang="scss" scoped>
</style>
