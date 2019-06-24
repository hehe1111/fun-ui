import Vue from 'vue';
import { describe, it } from 'mocha';
import FCollapse from '../src/FCollapse.vue';
import FCollapseItem from '../src/FCollapseItem.vue';

Vue.component('f-collapse', FCollapse);
Vue.component('f-collapse-item', FCollapseItem);

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FCollapseItem', () => {
  it('存在', () => expect(FCollapseItem).to.exist);

  it('可以接受 title 和 name 属性', () => {
    const div = document.createElement('div');
    const text = '标题1';
    const name = 'xxxx';
    document.body.appendChild(div);
    div.innerHTML = `
      <f-collapse :opened="arr">
        <f-collapse-item title=${text} name=${name}>内容1</f-collapse-item>
      </f-collapse>
    `;

    const vm = new Vue({
      el: div,
      data: {
        arr: [`${name}`],
      },
    });

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('header').textContent).to.eq(text);
      expect(
        vm.$el.querySelector('.collapse-item').getAttribute('data-name')
      ).to.eq(name);
      vm.$el.remove();
      vm.$destroy();
    });
  });
});
