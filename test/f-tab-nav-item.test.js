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

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FTabNavItem', () => {
  it('存在', () => expect(FTabNavItem).to.exist);

  it('可以接受 name 属性', () => {
    /**
     * ERROR: '[Vue warn]: Injection "eventBus" not found
     * 解决：可选注入
     */
    const Constructor = Vue.extend(FTabNavItem);
    const name = 'hahaha';
    const vm = new Constructor({
      propsData: { name },
    });
    vm.$mount();
    expect(vm.$el.getAttribute('data-name')).to.eq(name);
    vm.$el.remove();
    vm.$destroy();

    /**
     * 故改用下面的测试用例
     */
    // const div = document.createElement('div');
    // document.body.appendChild(div);
    // div.innerHTML = `
    //   <f-tab selected="hahaha">
    //     <f-tab-nav>
    //       <f-tab-nav-item name="hahaha">hahaha</f-tab-nav-item>
    //     </f-tab-nav>
    //     <f-tab-body>
    //       <f-tab-body-item name="hahaha">hahaha</f-tab-body-item>
    //     </f-tab-body>
    //   </f-tab>
    // `;

    // const vm = new Vue({
    //   el: div,
    // });

    // expect(
    //   vm.$el.querySelector('.tab-nav-item').getAttribute('data-name')
    // ).to.eq('hahaha');
    // vm.$nextTick(() => {
    //   // 不放到 $nextTick 则会报错
    //   // ERROR: '[Vue warn]: Error in nextTick: "TypeError: Cannot read property 'style' of undefined"
    //   // 报错来源 FTabNav.vue 组件
    //   vm.$el.remove();
    //   vm.$destroy();
    //   done();
    // });
  });

  it('可以接受 disabled 属性', () => {
    /**
     * ERROR: '[Vue warn]: Injection "eventBus" not found
     * 解决：可选注入
     */
    const Constructor = Vue.extend(FTabNavItem);
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

    /**
     * 故改用下面的测试用例
     */
    // const div = document.createElement('div');
    // document.body.appendChild(div);
    // const callback = sinon.fake();
    // div.innerHTML = `
    //   <f-tab selected="hohoho">
    //     <f-tab-nav>
    //       <f-tab-nav-item name="hahaha" disabled @click="callback" class="target">hahaha</f-tab-nav-item>
    //       <f-tab-nav-item name="hohoho">hohoho</f-tab-nav-item>
    //     </f-tab-nav>
    //     <f-tab-body>
    //       <f-tab-body-item name="hahaha">hahaha</f-tab-body-item>
    //       <f-tab-body-item name="hohoho">hohoho</f-tab-body-item>
    //     </f-tab-body>
    //   </f-tab>
    // `;

    // const vm = new Vue({
    //   el: div,
    //   methods: { callback },
    // });

    // const target = vm.$el.querySelector('.tab-nav-item.target');
    // vm.$nextTick(() => {
    //   expect(target.classList.contains('disabled')).to.eq(true);
    // });
    // target.click();
    // expect(callback).to.have.not.been.called;
    // vm.$nextTick(() => {
    //   // 不放到 $nextTick 则会报错
    //   // ERROR: '[Vue warn]: Error in nextTick: "TypeError: Cannot read property 'style' of undefined"
    //   // 报错来源 FTabNav.vue 组件
    //   vm.$el.remove();
    //   vm.$destroy();
    //   done();
    // });
  });
});
