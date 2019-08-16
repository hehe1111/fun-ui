<template>
  <div class="demo-cascader-2 extra-margin">
    <f-cascader :source.sync="source" :selected.sync="selected" :load-data="loadData" />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FCascader from '../../../src/components/cascader/FCascader.vue';
import db from '../../../tests/fixture/db.js';

const ajax = (id = 0) => {
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
    }, 1000);
  });
};

export default {
  name: 'demo-cascader-2',
  components: { FCascader },
  data() {
    return {
      selected: [],
      source: [],

      htmlCode: `
        <f-cascader :source.sync="source" :selected.sync="selected" :load-data="loadData" />
      `,
      javascriptCode: `
        const ajax = (id = 0) => {
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
            }, 1000);
          });
        };

        data() {
          return {
            selected: [],
            source: db,
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
      `,
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

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
