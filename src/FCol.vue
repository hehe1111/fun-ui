<template>
  <div
    class="col"
    :class="[span && `col-${span}`, offset && `col-offset-${offset}`]"
    :style="returnGutterStyle"
  >
    <div style="min-height: 100px; border: 1px solid green;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [Number, String],
      default: 24,
    },
    offset: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      gutter: 0,
    }
  },
  computed: {
    returnGutterStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .col {
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
