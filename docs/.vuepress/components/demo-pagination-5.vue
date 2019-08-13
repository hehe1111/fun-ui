<template>
  <div class="demo-pagination-5 extra-margin">
    <f-pagination :total="total" :on-page-change="onPageChange" />
    <br />
    <span>当前页码：{{ newPage }}</span>

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
  name: 'demo-pagination-5',
  components: { FPagination },
  data() {
    return {
      total: 10,
      newPage: 1,

      htmlCode: removePrefixSpace(`
        <f-pagination :total="total" :on-page-change="onPageChange" />
        <br />
        <span>当前页码：{{ newPage }}</span>
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            total: 10,
            newPage: 1,
          }
        },
        methods: {
          onPageChange(newPage) {
            this.newPage = newPage;
          },
        }
      `),
    };
  },
  methods: {
    onPageChange(newPage) {
      this.newPage = newPage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
