<template>
  <div>
    <f-pagination :total="total" no-gutter />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  name: 'demo-pagination-4',
  data() {
    return {
      total: 10,
    };
  },
  components: { FPagination },
};
</script>

<style lang="scss" scoped></style>
