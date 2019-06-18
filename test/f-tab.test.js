import Vue from 'vue';
import { describe, it } from 'mocha';
import FTab from '../src/FTab.vue';
import FTabNav from '../src/FTabNav.vue';
import FTabNavItem from '../src/FTabNavItem.vue';
import FTabBody from '../src/FTabBody.vue';
import FTabBodyItem from '../src/FTabBodyItem.vue';

Vue.component('f-tab', FTab);
Vue.component('f-tab-nav', FTabNav);
Vue.component('f-tab-nav-item', FTabNavItem);
Vue.component('f-tab-body', FTabBody);
Vue.component('f-tab-body-item', FTabBodyItem);

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FTab', () => {
  it('存在', () => expect(FTab).to.exist);

  it('可以接受 selected 属性', done => {
    const div = document.createElement('div');
    div.innerHTML = `
      <f-tab selected="11">
        <f-tab-nav>
          <f-tab-nav-item name="11">11</f-tab-nav-item>
          <f-tab-nav-item name="22">22</f-tab-nav-item>
          <f-tab-nav-item name="33">33</f-tab-nav-item>
        </f-tab-nav>
        <f-tab-body>
          <f-tab-body-item name="11">00011</f-tab-body-item>
          <f-tab-body-item name="22">00022</f-tab-body-item>
          <f-tab-body-item name="33">00033</f-tab-body-item>
        </f-tab-body>
      </f-tab>
    `;

    const vm = new Vue({
      el: div,
    }).$mount();
    vm.$nextTick(() => {
      const element = vm.$el.querySelector('.tab-nav-item[data-name="11"]');
      expect(element.classList.contains('active')).to.eq(true);
      vm.$el.remove();
      div.remove();
      vm.$destroy();
      done();
    });
  });

  it('可以接受 direction 属性', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-tab selected="11" direction="vertical">
        <f-tab-nav>
          <f-tab-nav-item name="11">11</f-tab-nav-item>
          <f-tab-nav-item name="22">22</f-tab-nav-item>
          <f-tab-nav-item name="33">33</f-tab-nav-item>
        </f-tab-nav>
        <f-tab-body>
          <f-tab-body-item name="11">00011</f-tab-body-item>
          <f-tab-body-item name="22">00022</f-tab-body-item>
          <f-tab-body-item name="33">00033</f-tab-body-item>
        </f-tab-body>
      </f-tab>
    `;

    const vm = new Vue({
      el: div,
    });
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.tab').style.display).to.eq('flex');
      expect(
        vm.$el.querySelector('.tab-nav').classList.contains('vertical')
      ).to.eq(true);
      expect(getComputedStyle(vm.$el.querySelector('.tab-nav')).display).to.eq(
        'block'
      );
      expect(
        vm.$el.querySelector('.tab-body').classList.contains('vertical')
      ).to.eq(true);
      vm.$el.remove();
      div.remove();
      vm.$destroy();
      done();
    });
  });
});
