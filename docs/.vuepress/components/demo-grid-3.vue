<template>
  <div class="demo-grid-3 extra-margin">
    <f-row>
      <f-col span="8">
        <div class="item"></div>
      </f-col>
      <f-col span="8" offset="8">
        <div class="item"></div>
      </f-col>
    </f-row>
    <f-row>
      <f-col span="8" offset="8">
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
  name: 'demo-grid-3',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-row>
          <f-col span="8">
            <div class="item"></div>
          </f-col>
          <f-col span="8" offset="8">
            <div class="item"></div>
          </f-col>
        </f-row>
        <f-row>
          <f-col span="8" offset="8">
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
