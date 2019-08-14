<template>
  <div :class="colClasses" :style="returnGutterStyle">
    <slot />
  </div>
</template>

<script>
import {
  optionsName2ClassPrefix,
  oneOf,
  getTypeOf,
} from '../../assets/utils.js';

const validator = paramObj => {
  return Object.keys(paramObj).every(k => {
    if (
      !oneOf(k, ['span', 'offset']) ||
      !oneOf(getTypeOf(paramObj[k]), ['number', 'string'])
    ) {
      return false;
    }
    return true;
  });
};

export default {
  name: 'FunUICol',
  props: {
    span: {
      type: [Number, String],
    },
    offset: {
      type: [Number, String],
      default: 0,
    },
    tablet: { type: Object, validator },
    smallPc: { type: Object, validator },
    pc: { type: Object, validator },
    largePc: { type: Object, validator },
  },
  data() {
    return {
      gutter: 0,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    colClasses() {
      const {
        n2c,
        span,
        offset,
        tablet,
        smallPc,
        pc,
        largePc,
        createColClass,
      } = this;
      return [
        n2c(),
        ...createColClass({ span, offset }),
        ...createColClass(tablet, 'tablet-'),
        ...createColClass(smallPc, 'small-pc-'),
        ...createColClass(pc, 'pc-'),
        ...createColClass(largePc, 'large-pc-'),
      ];
    },
    returnGutterStyle() {
      return {
        paddingLeft: `${this.gutter / 2}px`,
        paddingRight: `${this.gutter / 2}px`,
      };
    },
  },
  methods: {
    createColClass(obj, deviceType = '') {
      if (!obj) {
        return [];
      }
      const { span, offset } = obj;
      return [
        `col-${deviceType}${span || 0}`,
        `col-offset-${deviceType}${offset || 0}`,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

@mixin spanByDeviceType($classPrefix: 'col-') {
  @for $n from 0 through 24 {
    &.#{$classPrefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}

@mixin offsetByDeviceType($classPrefix: 'col-offset-') {
  @for $n from 0 through 24 {
    &.#{$classPrefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
}

.f-col {
  // https://ant.design/components/grid-cn/#Col
  // 0 - 576 - 768 - 992 - 1200
  // default: mobile phone
  @include spanByDeviceType();
  @include offsetByDeviceType();
  @media (min-width: 577px) {
    @include spanByDeviceType('col-tablet-');
    @include offsetByDeviceType('col-offset-tablet-');
  }
  @media (min-width: 769px) {
    @include spanByDeviceType('col-small-pc-');
    @include offsetByDeviceType('col-offset-small-pc-');
  }
  @media (min-width: 993px) {
    @include spanByDeviceType('col-pc-');
    @include offsetByDeviceType('col-offset-pc-');
  }
  @media (min-width: 1201px) {
    @include spanByDeviceType('col-large-pc-');
    @include offsetByDeviceType('col-offset-large-pc-');
  }
}
</style>
