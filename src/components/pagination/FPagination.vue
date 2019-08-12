<template>
  <div class="f-pagination">
    <f-pagination-buttons
      :current.sync="mutableCurrent"
      :total="total"
      :no-gutter="noGutter"
      :hide-on-single-page="hideOnSinglePage"
      :on-page-change="onPageChange"
    />
  </div>
</template>

<script>
import FPaginationButtons from './FPaginationButtons.vue';

export default {
  name: 'FunUIPagination',
  components: { FPaginationButtons },
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
  created() {
    this.mutableCurrent = this.current;
  },
  watch: {
    mutableCurrent(newValue, oldValue) {
      if (!oldValue) return;
      this.$emit('update:current', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';
</style>
