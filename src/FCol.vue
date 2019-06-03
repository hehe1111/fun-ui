<template>
  <div class="col" :class="returnColClass" :style="returnGutterStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = paramObj => {
  let keys = Object.keys(paramObj)
  keys.forEach(k => {
    if (!['span', 'offset'].includes(k)) {
      return false
    }
  })
  return true
}

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
    ipad: { type: Object, validator, },
    small_pc: { type: Object, validator, },
    pc: { type: Object, validator, },
    large_pc: { type: Object, validator, },
  },
  data() {
    return {
      gutter: 0,
    }
  },
  computed: {
    returnColClass() {
      const { span, offset, ipad, small_pc, pc, large_pc, createColClass } = this;
      return [
        ...createColClass({ span, offset }),
        ...createColClass(ipad, 'ipad-'),
        ...createColClass(small_pc, 'small-pc-'),
        ...createColClass(pc, 'pc-'),
        ...createColClass(large_pc, 'large-pc-'),
      ]
    },
    returnGutterStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px',
      }
    },
  },
  methods: {
    createColClass(obj, deviceType='') {
      if (!obj) []
      const { span, offset } = obj
      return [
        span && `col-${deviceType}${span}`,
        offset && `col-offset-${deviceType}${offset}`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
  .col {
    // https://ant.design/components/grid-cn/#Col
    // 0 - 576 - 768 - 992 - 1200
    // 手机
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
    // 平板
    @media (min-width: 577px) {
      $class-prefix: col-ipad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: col-offset-ipad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    // 小屏幕电脑
    @media (min-width: 769px) {
      $class-prefix: col-small-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: col-offset-small-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    // 电脑
    @media (min-width: 993px) {
      $class-prefix: col-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: col-offset-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    // 大屏幕电脑及超大屏幕
    @media (min-width: 1201px) {
      $class-prefix: col-large-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }

      $class-prefix: col-offset-large-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
  }
</style>
