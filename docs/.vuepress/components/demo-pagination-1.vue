<template>
  <div class="demo-pagination-1 extra-margin">
    <f-pagination :total="total" />

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  name: 'demo-pagination-1',
  components: { FPagination },
  data() {
    return {
      total: 10,

      html: `
        <f-pagination :total="total" />
      `,
      javascript: `
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
