<template>
  <div class="demo-grid-2 extra-margin">
    <f-row gutter="10">
      <f-col :span="8" v-for="n in 3" :key="n">
        <div class="item"></div>
      </f-col>
    </f-row>

    <code-box :htmlCode="htmlCode" />
  </div>
</template>


<script>
import FRow from '../../../src/components/grid/FRow.vue';
import FCol from '../../../src/components/grid/FCol.vue';

export default {
  name: 'demo-grid-2',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: `
        <f-row gutter="10">
          <f-col :span="8" v-for="n in 3" :key="n">
            <div class="item"></div>
          </f-col>
        </f-row>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-grid.scss';
</style>
