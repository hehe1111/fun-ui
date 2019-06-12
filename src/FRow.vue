<template>
  <div class="row" :style="returnNegativeMargin">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FunUIRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
    align: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'center', 'right'].includes(value);
      },
    },
  },
  mounted() {
    this.$children.forEach(child => {
      const vm = child;
      vm.gutter = this.gutter;
      vm.align = this.align;
    });
  },
  computed: {
    returnNegativeMargin() {
      return {
        marginLeft: `${-this.gutter / 2}px`,
        marginRight: `${-this.gutter / 2}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>
