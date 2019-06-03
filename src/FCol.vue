<template>
  <div class="col" :class="[span && `col-${span}`, offset && `col-offset-${offset}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [Number, String],
      default: 1,
    },
    offset: {
      type: [Number, String],
    },
    default: 0,
  },
}
</script>

<style lang="scss" scoped>
  .col {
    min-height: 100px;
    border: 1px solid green;

    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: col-offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
</style>
