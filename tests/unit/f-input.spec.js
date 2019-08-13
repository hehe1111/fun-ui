import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FInput from '../../src/components/FInput.vue';
chai.use(sinonChai);

describe('FInput.vue', () => {
  it('存在', () => {
    const wrapper = mount(FInput);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  describe('props 测试', () => {
    it('可以接受 value 属性', () => {
      const value = '这是一个 value';
      const wrapper = mount(FInput, {
        propsData: { value },
      });
      expect(wrapper.find('input').element.value).to.eq(value);
      wrapper.destroy();
    });

    it('可以接受 disabled 属性', () => {
      const wrapper = mount(FInput, {
        propsData: { disabled: true },
      });
      expect(wrapper.find('input').attributes('disabled')).to.eq('disabled');
      wrapper.destroy();
    });

    it('可以接受 readonly 属性', () => {
      const wrapper = mount(FInput, {
        propsData: { readonly: true },
      });
      expect(wrapper.find('input').attributes('readonly')).to.eq('readonly');
      wrapper.destroy();
    });

    it('可以接受 error 属性', () => {
      const tip = '这是一条来自测试用例的错误提示';
      const wrapper = mount(FInput, {
        propsData: { error: tip },
      });
      const href = wrapper.find('use').attributes('href');
      const span = wrapper.find('span').text();
      expect(href).to.eq('#icon-circle-cross');
      expect(span).to.eq(tip);
      wrapper.destroy();
    });
  });

  describe('event 测试', () => {
    const eventArray = ['change', 'input', 'focus', 'blur'];
    const fake = sinon.fake();
    eventArray.forEach(event => {
      it(`支持 ${event} 事件`, () => {
        const wrapper = mount(FInput, {
          // event 事件触发后，FInput.vue 中随事件传出的参数，会传给 fake
          listeners: { [event]: fake },
        });
        wrapper.find('input').trigger(event);
        expect(fake).to.have.been.called;
        wrapper.destroy();
      });
    });
  });
});
