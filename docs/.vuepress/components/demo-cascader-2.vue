<template>
  <div class="demo-cascader-2 extra-margin">
    <f-cascader :source.sync="source" :selected.sync="selected" :load-data="loadData" />

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FCascader from '../../../src/components/cascader/FCascader.vue';
import db from '../../../tests/fixture/db.js';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

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

      htmlCode: removePrefixSpace(`
        <f-cascader :source.sync="source" :selected.sync="selected" :load-data="loadData" />
      `),
      javascriptCode: removePrefixSpace(`
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
      `),
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
