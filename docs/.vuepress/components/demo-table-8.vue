<template>
  <div class="demo-table-8 extra-margin">
    当前被选中项：{{ selectedIds }}
    <f-table :data-source="dataSource" :selected-ids.sync="selectedIds" is-id-visible is-checkbox-visible :height="200">
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
  name: 'demo-table-8',
  components: { FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,
      selectedIds: ['3'],

      html: `
        当前被选中项：{{ selectedIds }}
        <f-table :data-source="dataSource" :selected-ids.sync="selectedIds" is-id-visible is-checkbox-visible :height="200">
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
            selectedIds: ['3'],
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
