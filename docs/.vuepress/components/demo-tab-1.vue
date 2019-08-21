<template>
  <div class="demo-tab-1 extra-margin">
    <f-tab :selected.sync="selectedTab1">
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

    <f-tab :selected.sync="selectedTab2">
      <f-tab-nav :actions="action2">
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

    <f-tab :selected.sync="selectedTab3">
      <f-tab-nav :actions="action3">
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

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FTab from '../../../src/components/tab/FTab.vue';
import FTabNav from '../../../src/components/tab/FTabNav.vue';
import FTabNavItem from '../../../src/components/tab/FTabNavItem.vue';
import FTabBody from '../../../src/components/tab/FTabBody.vue';
import FTabBodyItem from '../../../src/components/tab/FTabBodyItem.vue';

export default {
  name: 'demo-tab-1',
  components: { FTab, FTabNav, FTabNavItem, FTabBody, FTabBodyItem },
  data() {
    return {
      selectedTab1: '1',
      selectedTab2: '1',
      selectedTab3: '1',
      action2: [{ callback: this.alert2, text: 'action' }],
      action3: [{ callback: this.alert3, text: 'action-small', small: true }],

      html: `
        <f-tab :selected.sync="selectedTab1">
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

        <f-tab :selected.sync="selectedTab2">
          <f-tab-nav :actions="action2">
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

        <f-tab :selected.sync="selectedTab3">
          <f-tab-nav :actions="action3">
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
      javascript: `
        data() {
          return {
            selectedTab1: '1',
            selectedTab2: '1',
            selectedTab3: '1',
            action2: [{ callback: this.alert2, text: 'action' }],
            action3: [
              { callback: this.alert3, text: 'action-small', small: true },
            ],
          }
        },
        methods: {
          alert2() {
            alert('I am action1');
          },
          alert3() {
            alert('I am action2');
          },
        },
      `,
    };
  },
  methods: {
    alert2() {
      alert('I am action1');
    },
    alert3() {
      alert('I am action2');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
