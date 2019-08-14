<template>
  <div class="demo-grid-4 extra-margin">
    <f-row>
      <f-col
        :span="24"
        :tablet="{ span: 12, offset: 12 }"
        :small-pc="{ span: 8 }"
        :pc="{ span: 6, offset: 12}"
        :large-pc="{span: 2, offset: 22}"
      >
        <div class="item"></div>
      </f-col>
    </f-row>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FRow from '../../../src/components/grid/FRow.vue';
import FCol from '../../../src/components/grid/FCol.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-grid-4',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-row>
          <f-col
            :span="24"
            :tablet="{ span: 12, offset: 12 }"
            :small-pc="{ span: 8 }"
            :pc="{ span: 6, offset: 12}"
            :large-pc="{span: 2, offset: 22}"
          >
            <div class="item"></div>
          </f-col>
        </f-row>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-grid.scss';
</style>
