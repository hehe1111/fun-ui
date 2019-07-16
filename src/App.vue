<template>
  <div id="app" style="margin: 100px;">
    <f-table
      :columns="columns"
      :data-source="dataSource"
      :selected-items.sync="selectedItems"
      :sort-rules="sortRules"
      @re-sort="reSort"
    />
  </div>
</template>

<script>
import FTable from './components/FTable.vue';

export default {
  name: 'App',
  data() {
    return {
      columns: [
        { text: '姓名', field: 'name' },
        { text: '成绩', field: 'score' },
        { text: '班级', field: 'class' },
      ],
      dataSource: [
        { id: 1, name: '01 小黄人', score: 100, class: '1 班' },
        { id: 2, name: '02 小黄人', score: 90, class: '2 班' },
        { id: 3, name: '03 小黄人', score: 100, class: '3 班' },
        { id: 4, name: '04 小黄人', score: 800, class: '3 班' },
        { id: 5, name: '05 小黄人', score: 50, class: '4 班' },
        { id: 6, name: '06 小黄人', score: 70, class: '1 班' },
        { id: 7, name: '07 小黄人', score: 30, class: '3 班' },
        { id: 8, name: '08 小黄人', score: 10, class: '2 班' },
        { id: 9, name: '09 小黄人', score: 60, class: '1 班' },
        { id: 10, name: '10 小黄人', score: 90, class: '4 班' },
        { id: 11, name: '11 小黄人', score: 20, class: '2 班' },
        { id: 12, name: '12 小黄人', score: 100, class: '4 班' },
        { id: 13, name: '13 小黄人', score: 50, class: '3 班' },
      ],
      selectedItems: [2, 4, 6, 9],
      // 可传一或多个规则，或不传
      // sortRules: { name: 'ascend' },
      // sortRules: { name: 'ascend', score: 'descend' },
      sortRules: { name: 'ascend', score: 'descend', class: true },
    };
  },
  methods: {
    reSort(rules) {
      // 模拟后端排序
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
      });
    },
  },
  components: { FTable },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
