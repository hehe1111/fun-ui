<template>
  <div id="app">
    {{selected}}
    <f-nav :selected.sync="selected">
      <f-nav-item name="home">首页</f-nav-item>
      <f-sub-nav name="about">
        <!-- eslint-disable-next-line -->
        <template slot="title">关于</template>
        <!-- 上面一行抽风了。一定要换行， prettier 才不会报 warning。但这个 warning 真的是多余，你让它保持一行又不会死！！！  -->
        <f-nav-item name="culture">企业文化</f-nav-item>
        <f-nav-item name="team">团队</f-nav-item>
        <f-nav-item name="contancts">联系方式</f-nav-item>
      </f-sub-nav>
      <f-nav-item name="hire">招聘</f-nav-item>
    </f-nav>
  </div>
</template>

<script>
import FNav from './components/nav/FNav.vue';
import FSubNav from './components/nav/FSubNav.vue';
import FNavItem from './components/nav/FNavItem.vue';

export default {
  name: 'app',
  components: {
    FNav,
    FSubNav,
    FNavItem,
  },
  data() {
    return {
      selected: 'team',
    };
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
