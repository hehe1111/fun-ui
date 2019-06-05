<template>
  <div class="col" :class="returnColClass" :style="returnGutterStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = paramObj => {
  let keys = Object.keys(paramObj);
  keys.forEach(k => {
    if (!["span", "offset"].includes(k)) {
      return false;
    }
  });
  return true;
};

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
    ipad: { type: Object, validator },
    small_pc: { type: Object, validator },
    pc: { type: Object, validator },
    large_pc: { type: Object, validator },
  },
  data() {
    return {
      gutter: 0,
    };
  },
  computed: {
    returnColClass() {
      const {
        span,
        offset,
        ipad,
        small_pc,
        pc,
        large_pc,
        createColClass,
      } = this;
      return [
        ...createColClass({ span, offset }),
        ...createColClass(ipad, "ipad-"),
        ...createColClass(small_pc, "small-pc-"),
        ...createColClass(pc, "pc-"),
        ...createColClass(large_pc, "large-pc-"),
      ];
    },
    returnGutterStyle() {
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px",
      };
    },
  },
  methods: {
    createColClass(obj, deviceType = "") {
      if (!obj) [];
      const { span, offset } = obj;
      return [
        span && `col-${deviceType}${span}`,
        offset && `col-offset-${deviceType}${offset}`,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin spanByDeviceType($classPrefix: "col-") {
  @for $n from 1 through 24 {
    &.#{$classPrefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}

@mixin offsetByDeviceType($classPrefix: "col-offset-") {
  @for $n from 1 through 24 {
    &.#{$classPrefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
}

.col {
  // https://ant.design/components/grid-cn/#Col
  // 0 - 576 - 768 - 992 - 1200
  // 手机
  @include spanByDeviceType();
  @include offsetByDeviceType();
  // 平板
  @media (min-width: 577px) {
    @include spanByDeviceType("col-ipad-");
    @include offsetByDeviceType("col-offset-ipad-");
  }
  // 小屏幕电脑
  @media (min-width: 769px) {
    @include spanByDeviceType("col-small-pc-");
    @include offsetByDeviceType("col-offset-small-pc-");
  }
  // 电脑
  @media (min-width: 993px) {
    @include spanByDeviceType("col-pc-");
    @include offsetByDeviceType("col-offset-pc-");
  }
  // 大屏幕电脑及超大屏幕
  @media (min-width: 1201px) {
    @include spanByDeviceType("col-large-pc-");
    @include offsetByDeviceType("col-offset-large-pc-");
  }
}
</style>
