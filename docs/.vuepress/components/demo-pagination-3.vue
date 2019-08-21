<template>
  <div class="demo-pagination-3 extra-margin">
    <f-button
      @click="hideOnSinglePage = !hideOnSinglePage"
    >hide-on-single-page: {{ hideOnSinglePage }}</f-button>

    <div class="extra-margin">
      <template v-if="hideOnSinglePage">
        <f-pagination :total="total" hide-on-single-page />
      </template>
      <template v-else>
        <f-pagination :total="total" />
      </template>
    </div>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';
import FButton from '../../../src/components/button/FButton.vue';

export default {
  name: 'demo-pagination-3',
  components: { FPagination, FButton },
  data() {
    return {
      total: 1,
      hideOnSinglePage: false,

      html: `
        <f-pagination :total="total" hide-on-single-page />
      `,
      javascript: `
        data() {
          return {
            total: 1,
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
