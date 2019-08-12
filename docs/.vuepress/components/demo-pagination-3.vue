<template>
  <div>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.extra-margin {
  margin: 1em 0;
}
</style>
