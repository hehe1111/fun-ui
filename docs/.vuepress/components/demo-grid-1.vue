<template>
  <div class="demo-grid-1 extra-margin">
    <f-row>
      <f-col :span="8" v-for="n in 3" :key="n">
        <div class="item"></div>
      </f-col>
    </f-row>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="scss">{{scssCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FRow from '../../../src/components/grid/FRow.vue';
import FCol from '../../../src/components/grid/FCol.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-grid-1',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-row>
          <f-col :span="8" v-for="n in 3" :key="n">
            <div class="item"></div>
          </f-col>
        </f-row>
      `),
      scssCode: removePrefixSpace(`
        .item {
          height: 2em;
          border: 1px solid $blue;
          padding: 0 10px;
          margin: 5px 0;
        }
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-grid.scss';
</style>
