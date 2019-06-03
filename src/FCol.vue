<template>
  <div class="col" :class="[span && `col-${span}`]">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .col {
    width: 100%;
    min-height: 100px;
    border: 1px solid green;

    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
  }
</style>

<script>
export default {
  props: {
    span: {
      type: [Number, String],
    }
  },
}
</script>
