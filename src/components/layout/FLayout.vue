<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUILayout',
  data() {
    return {
      hasSidebar: false,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      return [this.n2c(), { [`${this.n2c('has-sidebar')}`]: this.hasSidebar }];
    },
  },
  mounted() {
    this.$children.forEach(vm => {
      if (vm.$options.name === 'FunUISidebar') {
        this.hasSidebar = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-layout {
  overflow-x: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  &-has-sidebar {
    flex-direction: row;
  }
}
</style>
