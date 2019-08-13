<template>
  <div class="demo-pagination-2 extra-margin">
    <f-pagination :total="total" class="extra-margin" />
    <f-pagination :current="current1" :total="total" class="extra-margin" />
    <f-pagination :current.sync="current2" :total="total" class="extra-margin" />
    <div>第三个分页器当前页码：{{ current2 }}</div>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
        <code class="scss">{{scssCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-pagination-2',
  components: { FPagination },
  data() {
    return {
      current1: 5,
      current2: 5,
      total: 10,

      htmlCode: removePrefixSpace(`
        <f-pagination :total="total" class="extra-margin" />
        <f-pagination :current="current1" :total="total" class="extra-margin" />
        <f-pagination :current.sync="current2" :total="total" class="extra-margin" />
        <div>第三个分页器当前页码：{{ current2 }}</div>
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            current1: 5,
            current2: 5,
            total: 10,
          }
        }
      `),
      scssCode: removePrefixSpace(`
        .extra-margin {
          margin: 1em 0;
        }
      `)
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.extra-margin {
  margin: 1em 0;
}
</style>
