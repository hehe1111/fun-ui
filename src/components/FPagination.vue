<template>
  <div class="f-pagination" v-if="hideIfSinglePage">
    <f-button-group v-if="noGutter">
      <f-button icon="left" :class="disabledClassLeft" @click="goToPrevious" />
      <f-button
        v-for="(n, index) in pages"
        :key="index"
        @click="goToPage(n)"
        :class="classes(n)"
        >{{ n }}</f-button
      >
      <f-button icon="right" :class="disabledClassRight" @click="goToNext" />
    </f-button-group>

    <template v-else>
      <f-button icon="left" :class="disabledClassLeft" @click="goToPrevious" />
      <f-button
        v-for="(n, index) in pages"
        :key="index"
        @click="goToPage(n)"
        :class="classes(n)"
        >{{ n }}</f-button
      >
      <f-button icon="right" :class="disabledClassRight" @click="goToNext" />
    </template>
  </div>
</template>

<script>
import FButton from './button/FButton.vue';
import FButtonGroup from './button/FButtonGroup.vue';
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
  data() {
    return {
      mutableCurrent: null,
    };
  },
  computed: {
    pages() {
      return this.getPages(this.mutableCurrent, this.total);
    },
    disabledClassLeft() {
      return { disabled: this.mutableCurrent === 1 };
    },
    disabledClassRight() {
      return { disabled: this.mutableCurrent === this.total };
    },
    hideIfSinglePage() {
      if (this.pages.length > 1) return true;
      return this.pages.length === 1 && !this.hideOnSinglePage;
    },
  },
  created() {
    this.mutableCurrent = this.current;
  },
  methods: {
    getPages(currentPage, totalPages) {
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
      if (this.mutableCurrent !== 1) {
        this.mutableCurrent -= 1;
        this.onCurrentPageChange();
      }
    },
    goToPage(n) {
      if (!Number.isNaN(window.parseInt(n, 10))) {
        this.mutableCurrent = n;
        this.onCurrentPageChange();
      }
    },
    goToNext() {
      if (this.mutableCurrent !== this.total) {
        this.mutableCurrent += 1;
        this.onCurrentPageChange();
      }
    },
    onCurrentPageChange() {
      this.$emit('update:current', this.mutableCurrent);
      this.onPageChange && this.onPageChange(this.mutableCurrent);
    },
    classes(n) {
      return {
        'high-light': this.mutableCurrent === n,
        separator: n === separator,
      };
    },
  },
  components: { FButton, FButtonGroup },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';
.f-pagination {
  > .f-button {
    margin: 0 0.4em;
  }
  .high-light,
  .high-light:hover {
    color: $blue;
    border-color: $blue;
    z-index: 1;
  }
  .separator {
    cursor: not-allowed;
  }
}
</style>
