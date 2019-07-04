<template>
  <div>
    <!-- 动态加载数据 需要传入 loadData，且需要 ajax 函数 -->
    <f-cascader
      :source.sync="source"
      :selected.sync="selected"
      :load-data="loadData"
      style="z-index: 2;" 
    />
  </div>
</template>

<script>
import FCascader from "../../../src/components/FCascader.vue";
import db from "../../../src/assets/db.js";

function ajax(id = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = JSON.parse(
        JSON.stringify(db.filter(n => n["parent_id"] === id))
      );
      result.forEach(a => {
        const hasChild = db.some(b => b["parent_id"] === a.id);
        a.isLeaf = !hasChild;
      });
      resolve(result);
    }, 2000);
  });
}

export default {
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
