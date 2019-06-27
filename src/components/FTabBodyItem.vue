<template>
  <div class="tab-body-item" :class="classes" v-if="active">
    <slot />
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
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  created() {
    this.eventBus.$on &&
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
.tab-body-item {
  padding: 1em;
  height: 100%;
}
</style>
