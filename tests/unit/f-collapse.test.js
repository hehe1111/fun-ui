import Vue from 'vue';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import FCollapse from '../src/FCollapse.vue';
import FCollapseItem from '../src/FCollapseItem.vue';

Vue.component('f-collapse', FCollapse);
Vue.component('f-collapse-item', FCollapseItem);

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FCollapse', () => {
  it('存在', () => expect(FCollapse).to.exist);

  it('可以接受 opened 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-collapse :opened='["c2", "c3"]'>
        <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
        <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
        <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
      </f-collapse>
    `;

    const vm = new Vue({
      el: div,
    });

    const e = vm.$el;

    vm.$nextTick(() => {
      expect(e.querySelector('[data-name="c1"] > .content')).to.not.exist;
      expect(e.querySelector('[data-name="c2"] > .content')).to.exist;
      expect(e.querySelector('[data-name="c3"] > .content')).to.exist;
      vm.$el.remove();
      vm.$destroy();
    });
  });

  it('可以接受 single 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-collapse :opened='["c2"]' single>
        <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
        <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
        <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
      </f-collapse>
    `;

    const vm = new Vue({
      el: div,
    });

    const e = vm.$el;

    vm.$nextTick(() => {
      expect(e.querySelector('[data-name="c1"] > .content')).to.not.exist;
      expect(e.querySelector('[data-name="c2"] > .content')).to.exist;
      expect(e.querySelector('[data-name="c3"] > .content')).to.not.exist;

      e.querySelector('[data-name="c3"] > header').click();

      vm.$nextTick(() => {
        expect(e.querySelector('[data-name="c1"] > .content')).to.not.exist;
        expect(e.querySelector('[data-name="c2"] > .content')).to.not.exist;
        expect(e.querySelector('[data-name="c3"] > .content')).to.exist;
        vm.$el.remove();
        vm.$destroy();
      });
    });
  });

  it('可以触发 update:opened 事件', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-collapse :opened.sync='arr' ref="FCollapse">
        <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
        <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
        <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
      </f-collapse>
    `;

    const callback = sinon.fake();
    const vm = new Vue({
      el: div,
      data: {
        arr: [],
      },
      methods: { callback },
    });

    vm.$nextTick(() => {
      vm.$refs.FCollapse.$on('update:opened', callback);
      vm.$el.querySelector('[data-name="c3"] > header').click();
      vm.$nextTick(() => {
        expect(callback).to.have.been.called;
        expect(vm.arr[0]).to.eq('c3');
        vm.$el.remove();
        vm.$destroy();
      });
    });
  });

  // it('可以触发 update:opened 事件', () => {
  //   const div = document.createElement('div');
  //   document.body.appendChild(div);
  //   div.innerHTML = `
  //     <f-collapse :opened='arr' @update:opened="callback">
  //       <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
  //       <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
  //       <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
  //     </f-collapse>
  //   `;

  //   const callback = sinon.fake();
  //   const vm = new Vue({
  //     el: div,
  //     data: {
  //       arr: [],
  //     },
  //     methods: { callback },
  //   });

  //   vm.$nextTick(() => {
  //     vm.$el.querySelector('[data-name="c3"] > header').click();
  //     vm.$nextTick(() => {
  //       expect(callback).to.have.been.called;
  //       vm.$el.remove();
  //       vm.$destroy();
  //     });
  //   });
  // });
});
