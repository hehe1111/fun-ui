<template>
  <div id="app">
    2333
    {{ selectedResult }}
    <f-cascader :source="source" :selected.sync="selectedResult" />2333
  </div>
</template>

<script>
import FCascader from './components/FCascader';

export default {
  name: 'app',
  components: {
    FCascader,
  },
  data() {
    return {
      selectedResult: [],
      source: [
        {
          name: '浙江浙江',
          children: [
            {
              name: '杭州杭州',
              children: [
                { name: '上城上城' },
                { name: '下城' },
                { name: '江干' },
              ],
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
      ],
    };
  },
};
</script>

<style lang="scss"></style>
