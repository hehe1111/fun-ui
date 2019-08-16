<template>
  <div class="demo-pagination-4 extra-margin">
    <f-pagination :total="total" no-gutter />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  name: 'demo-pagination-4',
  components: { FPagination },
  data() {
    return {
      total: 10,

      htmlCode: `
        <f-pagination :total="total" no-gutter />
      `,
      javascriptCode: `
        data() {
          return {
            total: 10,
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
