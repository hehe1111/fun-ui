<template>
  <div class="tab-body-item" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUITabBodyItem',
  data() {
    return {
      active: false,
    };
  },
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  inject: ['eventBus'],
  created() {
    this.eventBus.$on('update:selected', value => {
      this.active = this.name === value;
    });
  },
  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$bodyItemBg: #ddd;

.tab-body-item {
  &.active {
    background-color: $bodyItemBg;
  }
}
</style>
