<template>
  <div
    class="f-pagination-buttons"
    :class="buttonGroupClass"
    v-if="hideIfSinglePage"
  >
    <f-button icon="left" :class="disabledClassLeft" @click="goToPrevious" />
    <f-button
      v-for="(n, index) in pageNumberArray"
      :key="index"
      @click="goToPage(n)"
      :class="classes(n)"
      :data-name="n"
      >{{ n }}</f-button
    >
    <f-button icon="right" :class="disabledClassRight" @click="goToNext" />
  </div>
</template>

<script>
import FButton from '../button/FButton.vue';

const separator = '...';

export default {
  name: 'FunUIPagination',
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    noGutter: {
      type: Boolean,
      default: false,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    onPageChange: Function,
  },
  computed: {
    buttonGroupClass() {
      return {
        'f-button-group': this.noGutter,
      };
    },
    pageNumberArray() {
      return this.getPageNumberArray(this.current, this.total);
    },
    disabledClassLeft() {
      return { disabled: this.current === 1 };
    },
    disabledClassRight() {
      return { disabled: this.current === this.total };
    },
    hideIfSinglePage() {
      if (this.pageNumberArray.length > 1) return true;
      return this.pageNumberArray.length === 1 && !this.hideOnSinglePage;
    },
  },
  methods: {
    getPageNumberArray(currentPage, totalPages) {
      if (
        typeof currentPage !== 'number' ||
        typeof totalPages !== 'number' ||
        currentPage <= 0 ||
        totalPages <= 0 ||
        currentPage > totalPages
      ) {
        return [];
      }
      const result = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ].filter(value => value > 0 && value <= totalPages);
      currentPage - 3 > 1 && result.unshift(separator);
      currentPage + 3 < totalPages && result.push(separator);
      result.indexOf(1) === -1 && result.unshift(1);
      result.indexOf(totalPages) === -1 && result.push(totalPages);
      return result;
    },
    goToPrevious() {
      this.current > 1 && this.onCurrentPageChange(this.current - 1);
    },
    goToPage(n) {
      if (!Number.isNaN(parseInt(n, 10)) && n !== this.current) {
        this.onCurrentPageChange(n);
      }
    },
    goToNext() {
      this.current < this.total && this.onCurrentPageChange(this.current + 1);
    },
    onCurrentPageChange(pageNumber) {
      this.$emit('update:current', pageNumber);
      this.onPageChange && this.onPageChange(pageNumber);
    },
    classes(n) {
      return {
        'high-light': this.current === n,
        separator: n === separator,
      };
    },
  },
  components: { FButton },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';
.f-pagination-buttons {
  &.f-button-group {
    @extend .f-button-group-common;
  }

  &:not(.f-button-group) > .f-button {
    margin: 0 0.4em;
  }

  .f-button {
    &:not(.disabled):hover,
    &.high-light,
    &.high-light:hover,
    &.high-light:focus {
      color: $blue;
      border-color: $blue;
    }

    &.high-light,
    &.high-light:hover,
    &.high-light:focus,
    &.separator {
      background-color: #fff;
      cursor: not-allowed;
      z-index: 1;
    }

    &.separator {
      z-index: 0;
      font-weight: bold;
    }
  }
}
</style>
