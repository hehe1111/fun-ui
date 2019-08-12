<template>
  <!-- slot 不能作为组件根元素 -->
  <div :class="n2c()">
    <slot />
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUIButtonGroup',
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-button-group {
  @extend .f-button-group-common;
}
</style>
