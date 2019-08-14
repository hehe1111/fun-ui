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

    it('可以接受 hint 属性', () => {
      const hint = { type: 'success', message: '这是一条成功提示' };
      const wrapper = mount(FInput, {
        propsData: { hint },
      });
      expect(wrapper.find('.f-input').classes()).to.include('f-input-success');
      const href = wrapper
        .find('.f-input-success-icon > use')
        .attributes('href');
      const span = wrapper.find('.f-input-success-hint').text();
      expect(href).to.eq('#icon-check');
      expect(span).to.eq(hint.message);
      wrapper.destroy();
    });

    it('可以接受 clearable 属性', () => {
      const value = '待清除';
      const wrapper = mount(FInput, {
        propsData: { value, clearable: true },
      });
      expect(wrapper.find('input').element.value).to.eq(value);
      wrapper.find('.f-input-clear-icon').trigger('click');
      expect(wrapper.find('input').element.value).to.eq('');
      wrapper.destroy();
    });

    it('可以接受 autoFocus 属性', () => {
      const fake = sinon.fake();
      const wrapper = mount(FInput, {
        propsData: { autoFocus: true },
        listeners: { focus: fake },
      });
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.been.calledOnce;
        wrapper.destroy();
      });
    });

    it('可以接受 placeholder 属性', () => {
      const placeholder = 'hello world';
      const wrapper = mount(FInput, {
        propsData: { placeholder },
      });
      expect(wrapper.find('input').attributes('placeholder')).to.eq(
        placeholder
      );
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
