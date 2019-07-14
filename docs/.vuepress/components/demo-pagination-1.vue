<template>
  <div>
    <f-pagination :total="total" />
  </div>
</template>

<script>
import FPagination from "../../../src/components/pagination/FPagination.vue";

export default {
  name: 'demo-pagination-1',
  data() {
    return {
      total: 10,
    }
  },
  components: { FPagination },
};
</script>

<style lang="scss" scoped></style>
