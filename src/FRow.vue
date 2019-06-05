<template>
  <div class="row" :style="returnNegativeMargin">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
    align: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      },
    },
  },
  mounted() {
    this.$children.forEach(child => {
      child.gutter = this.gutter;
      child.align = this.align;
    });
  },
  computed: {
    returnNegativeMargin() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
</style>
