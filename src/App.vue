<template>
  <div id="app">
    <f-cascader
      :source.sync="source"
      :selected.sync="selected"
      :load-data="loadData"
    />
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

export default {
  name: 'app',
  components: {
    FCascader,
  },
  data() {
    return {
      selected: [],
      source: [],
    };
  },
  created() {
    ajax(0).then(result => (this.source = result));
  },
  methods: {
    loadData({ id }, updateSource) {
      ajax(id).then(result => updateSource(result));
    },
  },
};
</script>

<style lang="scss"></style>
