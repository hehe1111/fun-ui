import Vue from 'vue';
import sinon from 'sinon';
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
const Constructor = Vue.extend(FTabNavItem);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FTabNavItem', () => {
  it('存在', () => expect(FTabNavItem).to.exist);

  it('可以接受 name 属性', () => {
    const vm = new Constructor({
      propsData: {
        name: 'hahaha',
      },
    });
    vm.$mount();
    expect(vm.$el.getAttribute('data-name')).to.eq('hahaha');
    vm.$el.remove();
    vm.$destroy();
  });

  it('可以接受 disabled 属性', () => {
    const vm = new Constructor({
      propsData: {
        name: 'hahaha',
        disabled: true,
      },
    });
    vm.$mount();
    expect(vm.$el.classList.contains('disabled')).to.eq(true);
    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.not.been.called;
    vm.$el.remove();
    vm.$destroy();
  });
});
