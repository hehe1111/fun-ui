<template>
  <div class="demo-table-6 extra-margin">
    <f-table :data-source="dataSource" is-id-visible :height="200">
      <f-table-column text="Name" field="name" />
      <f-table-column text="Score" field="score" />
      <f-table-column text="Class" field="class" />
      <f-table-column text="Moto" field="moto" />
    </f-table>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FTable from '../../../src/components/table/FTable.vue';
import FTableColumn from '../../../src/components/table/FTableColumn.vue';
import tableData from '../assets/js/table-data.js';

export default {
  name: 'demo-table-6',
  components: { FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,

      html: `
        <f-table :data-source="dataSource" is-id-visible :height="200">
          <f-table-column text="Name" field="name" />
          <f-table-column text="Score" field="score" />
          <f-table-column text="Class" field="class" />
          <f-table-column text="Moto" field="moto" />
        </f-table>
      `,
      javascript: `
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
</style>
