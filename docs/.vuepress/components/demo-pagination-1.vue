<template>
  <div>
    <f-pagination :total="total" />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  components: { FPagination },
  name: 'demo-pagination-1',
  data() {
    return {
      total: 10,
    };
  },
};
</script>

<style lang="scss" scoped></style>
