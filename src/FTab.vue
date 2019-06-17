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
  created() {
    this.eventBus.$on('update:selected', value => {
      console.log('tab', value);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
