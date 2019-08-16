<template>
  <div class="demo-grid-1 extra-margin">
    <f-row>
      <f-col :span="8" v-for="n in 3" :key="n">
        <div class="item"></div>
      </f-col>
    </f-row>

    <code-box :htmlCode="htmlCode" :scssCode="scssCode" />
  </div>
</template>


<script>
import FRow from '../../../src/components/grid/FRow.vue';
import FCol from '../../../src/components/grid/FCol.vue';

export default {
  name: 'demo-grid-1',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: `
        <f-row>
          <f-col :span="8" v-for="n in 3" :key="n">
            <div class="item"></div>
          </f-col>
        </f-row>
      `,
      scssCode: `
        .item {
          height: 2em;
          border: 1px solid $blue;
          padding: 0 10px;
          margin: 5px 0;
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-grid.scss';
</style>
