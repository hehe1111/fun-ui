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
import FButton from '../../../src/components/button/FButton.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-pagination-3',
  components: { FPagination, FButton },
  data() {
    return {
      total: 1,
      hideOnSinglePage: false,

      htmlCode: removePrefixSpace(`
        <f-pagination :total="total" hide-on-single-page />
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            total: 1,
          }
        }
      `),
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
