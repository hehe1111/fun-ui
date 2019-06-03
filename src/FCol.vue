<template>
  <div class="col" :class="returnColClass" :style="returnGutterStyle">
    <slot></slot>
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
    returnColClass() {
      const { span, offset } = this;
      return [
        span && `col-${span}`,
        offset && `col-offset-${offset}`
      ]
    },
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
