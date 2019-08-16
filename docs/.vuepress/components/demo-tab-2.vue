<template>
  <div class="demo-tab-2 extra-margin">
    <f-tab :selected.sync="selectedTab" direction="vertical">
      <f-tab-nav>
        <f-tab-nav-item name="1">1</f-tab-nav-item>
        <f-tab-nav-item name="2" disabled>2</f-tab-nav-item>
        <f-tab-nav-item name="3">3</f-tab-nav-item>
      </f-tab-nav>
      <f-tab-body>
        <f-tab-body-item name="1">0001</f-tab-body-item>
        <f-tab-body-item name="2">0002</f-tab-body-item>
        <f-tab-body-item name="3">0003</f-tab-body-item>
      </f-tab-body>
    </f-tab>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>


<script>
import FTab from '../../../src/components/tab/FTab.vue';
import FTabNav from '../../../src/components/tab/FTabNav.vue';
import FTabNavItem from '../../../src/components/tab/FTabNavItem.vue';
import FTabBody from '../../../src/components/tab/FTabBody.vue';
import FTabBodyItem from '../../../src/components/tab/FTabBodyItem.vue';

export default {
  name: 'demo-tab-2',
  components: { FTab, FTabNav, FTabNavItem, FTabBody, FTabBodyItem },
  data() {
    return {
      selectedTab: '1',

      htmlCode: `
        <f-tab :selected.sync="selectedTab" direction="vertical">
          <f-tab-nav>
            <f-tab-nav-item name="1">1</f-tab-nav-item>
            <f-tab-nav-item name="2" disabled>2</f-tab-nav-item>
            <f-tab-nav-item name="3">3</f-tab-nav-item>
          </f-tab-nav>
          <f-tab-body>
            <f-tab-body-item name="1">0001</f-tab-body-item>
            <f-tab-body-item name="2">0002</f-tab-body-item>
            <f-tab-body-item name="3">0003</f-tab-body-item>
          </f-tab-body>
        </f-tab>
      `,
      javascriptCode: `
        data() {
          return {
            selectedTab: '1',
          }
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
