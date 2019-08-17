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

    <code-box :htmlCode="htmlCode" />
  </div>
</template>

<script>
import FRow from '../../../src/components/grid/FRow.vue';
import FCol from '../../../src/components/grid/FCol.vue';

export default {
  name: 'demo-grid-3',
  components: { FRow, FCol },
  data() {
    return {
      htmlCode: `
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
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-grid.scss';
</style>
