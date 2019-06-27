import Vue from 'vue';
import sinon from 'sinon';
import { describe, it, afterEach } from 'mocha';
import FInput from '../src/FInput.vue';

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FInput 测试', () => {
  it('存在', () => expect(FInput).to.exist);

  describe('props 测试', () => {
    const Component = Vue.extend(FInput);
    let vm;
    afterEach(() => vm.$destroy());

    it('可以接收 value', () => {
      vm = new Component({
        propsData: {
          value: '这是一个 value',
        },
      }).$mount();
      const input = vm.$el.querySelector('input');
      expect(input.value).to.be.eq('这是一个 value');
    });

    it('可以接收 disabled', () => {
      vm = new Component({
        propsData: {
          disabled: true,
        },
      }).$mount();
      const input = vm.$el.querySelector('input');
      expect(input.disabled).to.be.eq(true);
    });

    it('可以接收 readonly', () => {
      vm = new Component({
        propsData: {
          readonly: true,
        },
      }).$mount();
      const input = vm.$el.querySelector('input');
      expect(input.readOnly).to.be.eq(true);
    });

    it('可以接收 error', () => {
      const tip = '这是一条来自测试用例的错误提示';
      vm = new Component({
        propsData: {
          error: tip,
        },
      }).$mount();
      const use = vm.$el.querySelector('use');
      const span = vm.$el.querySelector('span');
      expect(use.getAttribute('xlink:href')).to.eq('#icon-error');
      expect(span.innerText).to.be.eq(tip);
    });
  });

  describe('event 测试', () => {
    const Component = Vue.extend(FInput);
    let vm;
    afterEach(() => vm.$destroy());
    const eventArray = ['change', 'input', 'focus', 'blur'];
    eventArray.forEach(event => {
      console.log(event);
      it(`支持 ${event} 事件`, () => {
        vm = new Component().$mount();
        const fake = sinon.fake();
        // event 事件触发后，FInput.vue 中随事件传出的参数，会传给 fake
        vm.$on(event, fake);
        const eventChange = new Event(event);
        Object.defineProperty(eventChange, 'target', {
          value: { value: 'hi' },
        });
        const input = vm.$el.querySelector('input');
        input.dispatchEvent(eventChange);
        expect(fake).to.have.been.calledWith('hi');
      });
    });
  });
});
