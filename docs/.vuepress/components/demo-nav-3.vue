<template>
  <div class="demo-nav-3 extra-margin">
    <f-nav :selected="selected" vertical>
      <f-nav-item name="movie">电影</f-nav-item>
      <f-sub-nav name="acg">
        <template slot="title">ACG</template>
        <f-nav-item name="animation">动画</f-nav-item>
        <f-nav-item name="game">游戏</f-nav-item>
        <f-sub-nav name="comic">
          <template slot="title">漫画</template>
          <f-nav-item name="american-comic">美漫</f-nav-item>
          <f-sub-nav name="chinese-comic">
            <template slot="title">国漫</template>
            <f-nav-item name="the-outcast">一人之下</f-nav-item>
            <f-nav-item name="blades-of-the-guardians">镖人</f-nav-item>
            <f-nav-item name="rakshasa-street">镇魂街</f-nav-item>
          </f-sub-nav>
          <f-sub-nav name="japanese-comic">
            <template slot="title">日漫</template>
            <f-nav-item name="one-piece">海贼王</f-nav-item>
            <f-nav-item name="attack-on-titan">进击的巨人</f-nav-item>
            <f-nav-item name="my-hero-academia">我的英雄学院</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>
      </f-sub-nav>
      <f-nav-item name="novel">小说</f-nav-item>
    </f-nav>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FNav from '../../../src/components/nav/FNav.vue';
import FSubNav from '../../../src/components/nav/FSubNav.vue';
import FNavItem from '../../../src/components/nav/FNavItem.vue';

export default {
  name: 'demo-nav-3',
  components: { FNav, FSubNav, FNavItem },
  data() {
    return {
      selected: 'movie',

      html: `
        <f-nav :selected="selected" vertical>
          <f-nav-item name="movie">电影</f-nav-item>
          <f-sub-nav name="acg">
            <template slot="title">ACG</template>
            <f-nav-item name="animation">动画</f-nav-item>
            <f-nav-item name="game">游戏</f-nav-item>
            <f-sub-nav name="comic">
              <template slot="title">漫画</template>
              <f-nav-item name="american-comic">美漫</f-nav-item>
              <f-sub-nav name="chinese-comic">
                <template slot="title">国漫</template>
                <f-nav-item name="the-outcast">一人之下</f-nav-item>
                <f-nav-item name="blades-of-the-guardians">镖人</f-nav-item>
                <f-nav-item name="rakshasa-street">镇魂街</f-nav-item>
              </f-sub-nav>
              <f-sub-nav name="japanese-comic">
                <template slot="title">日漫</template>
                <f-nav-item name="one-piece">海贼王</f-nav-item>
                <f-nav-item name="attack-on-titan">进击的巨人</f-nav-item>
                <f-nav-item name="my-hero-academia">我的英雄学院</f-nav-item>
              </f-sub-nav>
            </f-sub-nav>
          </f-sub-nav>
          <f-nav-item name="novel">小说</f-nav-item>
        </f-nav>
      `,
      javascript: `
        data() {
          return {
            selected: 'movie',
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
