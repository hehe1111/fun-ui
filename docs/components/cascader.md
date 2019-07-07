# 级联选择器 Cascader

## 代码演示

- 静态加载数据

  <ClientOnly>
    <demo-cascader-1 />
  </ClientOnly>

  ```vue
  <template>
    <div>
      <f-cascader :source.sync="source" :selected.sync="selected" />
    </div>
  </template>

  <script>
  import FCascader from "../../../src/components/cascader/FCascader.vue";

  const db = [
    {
      name: "浙江",
      children: [
        {
          name: "杭州",
          children: [{ name: "上城" }, { name: "下城" }, { name: "江干" }],
        },
        {
          name: "嘉兴",
          children: [{ name: "南湖" }, { name: "秀洲" }, { name: "嘉善" }],
        },
      ],
    },
    {
      name: "福建",
      children: [
        {
          name: "福州",
          children: [{ name: "鼓楼" }, { name: "台江" }, { name: "仓山" }],
        },
      ],
    },
    {
      name: "安徽",
      children: [
        {
          name: "合肥",
          children: [{ name: "瑶海" }, { name: "庐阳" }],
        },
      ],
    },
  ];

  export default {
    components: {
      FCascader,
    },
    data() {
      return {
        selected: [],
        source: db,
      };
    },
  };
  </script>
  ```

- 动态加载数据

  <ClientOnly>
    <demo-cascader-2 />
  </ClientOnly>

  ```vue
  <template>
    <div>
      <f-cascader
        :source.sync="source"
        :selected.sync="selected"
        :load-data="loadData"
      />
    </div>
  </template>

  <script>
  import FCascader from "../../../src/components/cascader/FCascader.vue";
  import db from "../../../tests/fixture/db.js";

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
  ```

## API

```vue
<f-cascader :source.sync="source" :selected.sync="selected" />
```

| 参数     | 说明                             | 类型                 | 默认值 |
| -------- | -------------------------------- | -------------------- | ------ |
| source   | 数据来源                         | object[]             | -      |
| selected | 当前所有展开层级的被选中项       | object[]             | -      |
| loadData | 告知组件如何动态加载每一层的数据 | function({ id }, fn) | -      |
