<template>
  <div id="app" style="display: flex; justify-content: center;">
    <f-table
      :columns="columns"
      :data-source="dataSource"
      :selected-ids="selectedIds"
      :sort-rules="sortRules"
      @re-sort="reSort"
      :loading="loading"
      :is-id-visible="true"
      :is-check-box-visible="true"
      bordered
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
        {
          text: '姓名',
          field: 'name',
          render: {
            tag: 'a',
            style: { color: 'red', fontWeight: 'bold' },
            attrs: { href: 'https://www.google.com' },
            class: { xxx: true, yyy: true },
          },
        },
        { text: '成绩', field: 'score' },
        { text: '班级', field: 'class' },
        { text: '座右铭', field: 'moto' },
        {
          text: '操作',
          field: 'actions',
          actions: [{ text: 'ALERT', callback: this.onAlert }],
        },
      ],
      dataSource: [
        {
          id: '1',
          name: '01 ',
          score: 100,
          class: '1 班',
          collapsibleContent: '弹出折叠内容1',
          moto: 'Obcaecati sequi similique, m est libero suscipit esse odit.',
        },
        {
          id: '22222222222222',
          name: '02 小黄人',
          score: 90,
          class: '2 班',
          collapsibleContent: '弹出折叠内容2',
          moto: '',
        },
        {
          id: '3',
          name: '03 小黄人',
          score: 100,
          class: '3 班',
        },
        {
          id: '4',
          name: '04 小黄人',
          score: 800,
          class: '3 班',
        },
        {
          id: '5',
          name: '05 小黄人',
          score: 50,
          class: '4 班',
        },
        {
          id: '6',
          name: '06 小黄人',
          score: 70,
          class: '1 班',
          collapsibleContent: '弹出折叠内容6',
          moto: 'Obcaecati sequi similique',
        },
        {
          id: '7',
          name: '07 小黄人',
          score: 30,
          class: '3 班',
          collapsibleContent: '弹出折叠内容7',
          moto: 'Obcaecati sequi',
        },
        {
          id: '8',
          name: '08 小黄人',
          score: 10,
          class: '2 班',
          collapsibleContent: '弹出折叠内容8',
          moto: 'Obcaecati sequi similique, m est libero suscipit esse',
        },
        {
          id: '9',
          name: '09 小黄人',
          score: 60,
          class: '1 班',
          collapsibleContent: '弹出折叠内容9',
          moto: 'Obcaecati sequi ',
        },
        {
          id: '10',
          name: '10 小黄人',
          score: 90,
          class: '4 班',
          collapsibleContent: '弹出折叠内容10',
          moto: 'Obcaecati sequi ',
        },
        {
          id: '11',
          name: '11 小黄人',
          score: 20,
          class: '2 班',
          collapsibleContent: '弹出折叠内容11',
          moto: 'Lorem ipsum dolor sit amet con',
        },
        {
          id: '12',
          name: '12 小黄人',
          score: 100,
          class: '4 班',
          collapsibleContent: '弹出折叠内容12',
          moto: 'Obcaecati sequi similique, m est libero suscipit esse odit.',
        },
        {
          id: '13',
          name: '13 小黄人',
          score: 50,
          class: '3 班',
          collapsibleContent: '弹出折叠内容13',
          moto: 'Obcaecati sequi similique, molestiae voluptate eaque',
        },
      ],
      selectedIds: ['3'],
      // 可传一或多个规则，或不传
      // sortRules: { name: 'ascend' },
      // sortRules: { name: 'ascend', score: 'descend' },
      sortRules: { name: 'ascend', score: 'descend', class: true },
      loading: false,
    };
  },
  methods: {
    onAlert(item) {
      alert('当前行数据：' + JSON.stringify(item));
    },
    reSort(rules) {
      this.loading = true;
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
        this.loading = false;
      }, 3000);
    },
  },
  components: { FTable },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
