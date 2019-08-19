<template>
  <div class="demo-pagination-2 extra-margin">
    <f-pagination :total="total" class="extra-margin" />
    <f-pagination :current="current1" :total="total" class="extra-margin" />
    <f-pagination :current.sync="current2" :total="total" class="extra-margin" />
    <div>第三个分页器当前页码：{{ current2 }}</div>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';

export default {
  name: 'demo-pagination-2',
  components: { FPagination },
  data() {
    return {
      current1: 5,
      current2: 5,
      total: 10,

      htmlCode: `
        <f-pagination :total="total" class="extra-margin" />
        <f-pagination :current="current1" :total="total" class="extra-margin" />
        <f-pagination :current.sync="current2" :total="total" class="extra-margin" />
        <div>第三个分页器当前页码：{{ current2 }}</div>
      `,
      javascriptCode: `
        data() {
          return {
            current1: 5,
            current2: 5,
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
