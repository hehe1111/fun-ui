<template>
  <div class="demo-table-9 extra-margin">
    <f-button-group>
      <f-button
        v-for="a in alignArray"
        :key="a"
        @click="changeAlign(a)"
        :type="a === align ? 'primary': 'default'"
      >{{a}}</f-button>
    </f-button-group>
    <f-table :data-source="dataSource" :align="align" :height="200">
      <f-table-column text="Name" field="name" />
      <f-table-column text="Score" field="score" />
      <f-table-column text="Class" field="class" />
      <f-table-column text="Moto" field="moto" />
    </f-table>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';
import FButton from '../../../src/components/button/FButton.vue';
import FTable from '../../../src/components/table/FTable.vue';
import FTableColumn from '../../../src/components/table/FTableColumn.vue';
import tableData from '../assets/js/table-data.js';

export default {
  name: 'demo-table-9',
  components: { FButtonGroup, FButton, FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,
      alignArray: ['left', 'center', 'right'],
      align: 'right',

      html: `
        <f-button-group>
          <f-button
            v-for="a in alignArray"
            :key="a"
            @click="changeAlign(a)"
            :type="a === align ? 'primary': 'default'"
          >{{a}}</f-button>
        </f-button-group>
        <f-table :data-source="dataSource" :align="align" :height="200">
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
            alignArray: ['left', 'center', 'right'],
            align: 'right',
          }
        }，
        methods: {
          changeAlign(align) {
            this.align = align;
          },
        },
      `,
    };
  },
  methods: {
    changeAlign(align) {
      this.align = align;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
