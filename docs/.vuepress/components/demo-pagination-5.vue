<template>
  <div>
    <f-pagination :total="total" :on-page-change="onPageChange" />
    <br />
    <span>当前页码：{{ newPage }}</span>
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  name: 'demo-pagination-5',
  components: { FPagination },
  data() {
    return {
      total: 10,
      newPage: 1,
    };
  },
  methods: {
    onPageChange(newPage) {
      this.newPage = newPage;
    },
  },
};
</script>

<style lang="scss" scoped></style>
