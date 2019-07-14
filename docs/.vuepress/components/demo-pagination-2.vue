<template>
  <div>
    <f-pagination :total="total" class="extra-margin" />
    <f-pagination :current="current1" :total="total" class="extra-margin" />
    <f-pagination :current.sync="current2" :total="total" class="extra-margin" />
    <div>第三个分页器当前页码：{{ current2 }}</div>
  </div>
</template>

<script>
import FPagination from "../../../src/components/pagination/FPagination.vue";

export default {
  name: 'demo-pagination-2',
  data() {
    return {
      current1: 5,
      current2: 5,
      total: 10,
    }
  },
  components: { FPagination },
};
</script>

<style lang="scss" scoped>
.extra-margin {
  margin: 1em 0;
}
</style>
