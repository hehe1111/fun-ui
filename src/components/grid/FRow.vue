<template>
  <div :class="n2c()" :style="returnNegativeMargin">
    <slot />
  </div>
</template>

<script>
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUIRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    returnNegativeMargin() {
      return {
        marginLeft: `${-this.gutter / 2}px`,
        marginRight: `${-this.gutter / 2}px`,
      };
    },
  },
  mounted() {
    this.$children.forEach(child => (child.gutter = this.gutter));
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
