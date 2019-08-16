<template>
  <div class="f-tab-body-item" v-if="active">
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
    // emit from FTab or FTabNavItem
    this.eventBus.$on &&
      this.eventBus.$on('update:selected', ({ name }) => {
        this.active = this.name === name;
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-tab-body-item {
  padding: 1em;
  height: 100%;
}
</style>
