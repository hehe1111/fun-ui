<template>
  <div class="demo-pagination-4 extra-margin">
    <f-pagination :total="total" no-gutter />

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FPagination from '../../../src/components/pagination/FPagination.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-pagination-4',
  components: { FPagination },
  data() {
    return {
      total: 10,

      htmlCode: removePrefixSpace(`
        <f-pagination :total="total" no-gutter />
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            total: 10,
          }
        }
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
