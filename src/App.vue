<template>
  <div id="app">
    <f-cascader :source.sync="source" :selected.sync="selected" />
    <!-- :load-data="loadData" -->
    selected - {{ selected }}
    <hr />
    source - {{ source }}
  </div>
</template>

<script>
import FCascader from './components/FCascader';
import db from './assets/db.js';

function ajax(id = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = JSON.parse(
        JSON.stringify(db.filter(n => n['parent_id'] === id))
      );
      result.forEach(a => {
        const hasChild = db.some(b => b['parent_id'] === a.id);
        a.isLeaf = !hasChild;
      });
      resolve(result);
    }, 500);
  });
}

const db2 = [
  {
    name: '浙江',
    children: [
      {
        name: '杭州',
        children: [{ name: '上城' }, { name: '下城' }, { name: '江干' }],
      },
      {
        name: '嘉兴',
        children: [{ name: '南湖' }, { name: '秀洲' }, { name: '嘉善' }],
      },
    ],
  },
  {
    name: '福建',
    children: [
      {
        name: '福州',
        children: [{ name: '鼓楼' }, { name: '台江' }, { name: '仓山' }],
      },
    ],
  },
  {
    name: '安徽',
    children: [
      {
        name: '合肥',
        children: [{ name: '瑶海' }, { name: '庐阳' }],
      },
    ],
  },
];

export default {
  name: 'app',
  components: {
    FCascader,
  },
  data() {
    return {
      selected: [],
      source: db2,
    };
  },
  created() {
    // ajax(0).then(result => (this.source = result));
  },
  methods: {
    loadData({ id }, updateSource) {
      ajax(id).then(result => updateSource(result));
    },
  },
};
</script>

<style lang="scss"></style>
