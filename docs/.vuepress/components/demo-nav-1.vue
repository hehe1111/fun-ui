<template>
  <div>
    <f-nav :selected="selected">
      <f-nav-item name="home">首页</f-nav-item>
      <f-sub-nav name="about">
        <template slot="title">关于</template>
        <f-nav-item name="culture">企业文化</f-nav-item>
        <f-nav-item name="team">团队</f-nav-item>
        <f-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <f-nav-item name="wechat">微信</f-nav-item>
          <f-sub-nav name="qq">
            <template slot="title">QQ</template>
            <f-nav-item name="yellow">黄钻</f-nav-item>
            <f-nav-item name="green">绿钻</f-nav-item>
            <f-nav-item name="pink">粉钻</f-nav-item>
          </f-sub-nav>
          <f-sub-nav name="phone">
            <template slot="title">手机</template>
            <f-nav-item name="cm">移动</f-nav-item>
            <f-nav-item name="cw">联通</f-nav-item>
            <f-nav-item name="cn">电信</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>
      </f-sub-nav>
      <f-nav-item name="hire">招聘</f-nav-item>
    </f-nav>
  </div>
</template>

<script>
import FNav from '../../../src/components/nav/FNav.vue';
import FSubNav from '../../../src/components/nav/FSubNav.vue';
import FNavItem from '../../../src/components/nav/FNavItem.vue';

export default {
  data() {
    return {
      selected: 'cn',
    };
  },
  components: { FNav, FSubNav, FNavItem },
};
</script>
