<template>
  <div class="demo-cascader-1 extra-margin">
    <f-cascader :source.sync="source" :selected.sync="selected" />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FCascader from '../../../src/components/cascader/FCascader.vue';

const db = [
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
  name: 'demo-cascader-1',
  components: { FCascader },
  data() {
    return {
      selected: [],
      source: db,

      htmlCode: `
        <f-cascader :source.sync="source" :selected.sync="selected" />
      `,
      javascriptCode: `
        const db = [
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

        data() {
          return {
            selected: [],
            source: db,
          };
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
