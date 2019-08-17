<template>
  <div class="demo-table-5 extra-margin">
    <f-table :data-source="dataSource" small :height="200">
      <f-table-column text="Name" field="name" />
      <f-table-column text="Score" field="score" />
      <f-table-column text="Class" field="class" />
      <f-table-column text="Moto" field="moto" />
    </f-table>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FTable from '../../../src/components/table/FTable.vue';
import FTableColumn from '../../../src/components/table/FTableColumn.vue';
import tableData from '../assets/js/table-data.js';

export default {
  name: 'demo-table-5',
  components: { FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,

      htmlCode: `
        <f-table :data-source="dataSource" small :height="200">
          <f-table-column text="Name" field="name" />
          <f-table-column text="Score" field="score" />
          <f-table-column text="Class" field="class" />
          <f-table-column text="Moto" field="moto" />
        </f-table>
      `,
      javascriptCode: `
        data() {
          return {
            dataSource: tableData,
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

// .demo-table-1 {
//   padding: 20px;
//   border: 2px solid $blue;
//   overflow: auto;
// }
</style>
