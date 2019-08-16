<template>
  <div class="demo-pagination-5 extra-margin">
    <f-pagination :total="total" :on-page-change="onPageChange" />
    <br />
    <span>当前页码：{{ newPage }}</span>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
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

      htmlCode: `
        <f-pagination :total="total" :on-page-change="onPageChange" />
        <br />
        <span>当前页码：{{ newPage }}</span>
      `,
      javascriptCode: `
        data() {
          return {
            total: 10,
            newPage: 1,
          }
        },
        methods: {
          onPageChange(newPage) {
            this.newPage = newPage;
          },
        }
      `,
    };
  },
  methods: {
    onPageChange(newPage) {
      this.newPage = newPage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
