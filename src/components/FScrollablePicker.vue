<template>
  <div :class="[n2c(), n2c(direction)]" ref="pickerRef">
    <f-icon :class="n2c('arrow')" name="up" @click="onClickPrevious" />
    <div :class="n2c('inner')" v-hide-scrollbar:[widthAndHeight] ref="innerRef">
      <span
        v-for="v in values"
        :key="v"
        @click="onSelectValue(v)"
        :class="selectedValueClass(v)"
        >{{ v }}</span
      >
    </div>
    <f-icon :class="n2c('arrow')" name="down" @click="onClickNext" />
  </div>
</template>

<script>
import Vue from 'vue';
import FIcon from './FIcon.vue';
import hideScrollbar from '../directives/hide-scrollbar.js';
import toast from '../plugins/toast.js';
import { optionsName2ClassPrefix, getTypeOf, oneOf } from '../assets/utils.js';
Vue.use(toast);

export default {
  name: 'FunUIScrollablePicker',
  components: { FIcon },
  directives: { hideScrollbar },
  props: {
    widthAndHeight: {
      type: Object,
      required: true,
      validator(prop) {
        return !!prop.width && !!prop.height;
      },
    },
    selected: {
      type: [Number, String],
      required: true,
    },
    values: {
      type: Array,
      required: true,
      validator(prop) {
        return prop.every(
          v => getTypeOf(v) === 'number' || getTypeOf(v) === 'string'
        );
      },
    },
    direction: {
      type: String,
      default: 'vertical',
      validator(prop) {
        return oneOf(prop, ['vertical', 'horizontal']);
      },
    },
    errorMessage: {
      type: String,
      default: '没有了',
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  mounted() {
    this.direction === 'vertical' && this.updatePickerScrollTop();
    this.direction === 'horizontal' && this.updatePickerScrollLeft();
  },
  updated() {
    this.direction === 'vertical' && this.updatePickerScrollTop();
    this.direction === 'horizontal' && this.updatePickerScrollLeft();
  },
  methods: {
    getIndex(value) {
      return this.values.indexOf(value || this.selected);
    },
    onSelectValue(value) {
      this.$emit('update:selected', value);
    },
    onClickPrevious() {
      let index = this.getIndex() - 1;
      if (index < 0) {
        if (this.loop) index = this.values.length - 1;
        else {
          return this.outOfRangeHint();
        }
      }
      this.$emit('update:selected', this.values[index]);
    },
    onClickNext() {
      let index = this.getIndex() + 1;
      if (index > this.values.length - 1) {
        if (this.loop) index = 0;
        else {
          return this.outOfRangeHint();
        }
      }
      this.$emit('update:selected', this.values[index]);
    },
    outOfRangeHint() {
      return (
        this.errorMessage &&
        this.$toast(this.errorMessage, {
          state: 'error',
          enableHTML: true,
          closeIcon: true,
        })
      );
    },
    selectedValueClass(value) {
      return {
        [`${this.n2c('selected')}`]: value === this.selected,
      };
    },
    updatePickerScrollTop() {
      const { pickerRef: viewport, innerRef: parent } = this.$refs;
      if (!viewport || !parent) return;
      const oldScrollTop = parent.scrollTop;
      const { height: vHeight, top: vTop } = viewport.getBoundingClientRect();
      const { height: pHeight, top: pTop } = parent
        .querySelector(`.${this.n2c('selected')}`)
        .getBoundingClientRect();

      parent.scrollTop = pTop - vTop - vHeight / 2 + pHeight / 2 + oldScrollTop;
    },
    updatePickerScrollLeft() {
      const { pickerRef: viewport, innerRef: parent } = this.$refs;
      if (!viewport || !parent) return;
      const oldScrollLeft = parent.scrollLeft;
      const { width: vWidth, left: vLeft } = viewport.getBoundingClientRect();
      const { width: pWidth, left: pLeft } = parent
        .querySelector(`.${this.n2c('selected')}`)
        .getBoundingClientRect();

      parent.scrollLeft =
        pLeft - vLeft - vWidth / 2 + pWidth / 2 + oldScrollLeft;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-scrollable-picker {
  // style for vertical
  @extend .flex-center;
  flex-direction: column;
  margin: 0 0.5em;

  &-arrow {
    margin: 1em 0;
    user-select: none;
    cursor: pointer;
  }

  &-inner {
    > span {
      @extend .flex-center;
      padding: 0.2em 0;
      border: 2px solid transparent;
      border-radius: $borderRadius;
      cursor: pointer;
      user-select: none;
      &:hover {
        border-color: $blue;
        border-radius: $borderRadius;
      }
    }
  }

  &-selected {
    color: #fff;
    background-color: $blue;
  }

  // style for horizontal
  &-horizontal {
    flex-direction: row;
    .f-scrollable-picker-inner {
      display: flex;
      > span {
        padding: 0 1em;
      }
    }
    .f-scrollable-picker-arrow {
      margin: 0 1em; // to be fixed
      transform: rotate(-90deg);
    }
  }
}
</style>
