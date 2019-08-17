<template>
  <div class="demo-table-11 extra-margin">
    <f-table
      :data-source="dataSource"
      :sort-rules="sortRules"
      @re-sort="reSort"
      :loading="loading"
      :height="200"
    >
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
  name: 'demo-table-11',
  components: { FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,
      sortRules: { name: 'ascend', score: 'descend', class: true },
      loading: false,

      htmlCode: `
        <f-table
          :data-source="dataSource"
          :sort-rules="sortRules"
          @re-sort="reSort"
          :loading="loading"
          :height="200"
        >
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
            sortRules: { name: 'ascend', score: 'descend', class: true },
            loading: false,
          }
        },
        methods: {
          reSort(rules) {
            this.loading = true;
            setTimeout(() => {
              Object.keys(rules).forEach(k => {
                rules[k] === 'ascend' &&
                  this.dataSource.sort((a, b) => {
                    if (a[k] < b[k]) return -1;
                    if (a[k] > b[k]) return 1;
                    return 0;
                  });
                rules[k] === 'descend' &&
                  this.dataSource.sort((a, b) => {
                    if (a[k] < b[k]) return 1;
                    if (a[k] > b[k]) return -1;
                    return 0;
                  });
              });
              this.loading = false;
            }, 3000);
          },
        },
      `,
    };
  },
  methods: {
    reSort(rules) {
      this.loading = true;
      setTimeout(() => {
        Object.keys(rules).forEach(k => {
          rules[k] === 'ascend' &&
            this.dataSource.sort((a, b) => {
              if (a[k] < b[k]) return -1;
              if (a[k] > b[k]) return 1;
              return 0;
            });
          rules[k] === 'descend' &&
            this.dataSource.sort((a, b) => {
              if (a[k] < b[k]) return 1;
              if (a[k] > b[k]) return -1;
              return 0;
            });
        });
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
