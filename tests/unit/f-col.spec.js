import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FCol from '../../src/components/grid/FCol.vue';

describe('FCol.vue', () => {
  it('存在', () => {
    const wrapper = mount(FCol);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 span 属性', () => {
    const wrapper = mount(FCol, {
      propsData: { span: 7 },
    });
    // https://www.chaijs.com/api/bdd/#method_include
    // .include .includes .contain .contains 四者等价，后三者是别名
    // expect(wrapper.classes()).include('col-7');
    // 等价于
    expect(wrapper.classes('col-7')).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 offset 属性', () => {
    const wrapper = mount(FCol, {
      propsData: { span: 1, offset: 7 },
    });
    expect(wrapper.classes()).include('col-offset-7');
    wrapper.destroy();
  });

  it('可以接受 tablet 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        tablet: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-tablet-7');
    expect(wrapper.classes()).include('col-offset-tablet-7');
    wrapper.destroy();
  });
  it('可以接受 smallPc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        smallPc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-small-pc-7');
    expect(wrapper.classes()).include('col-offset-small-pc-7');
    wrapper.destroy();
  });
  it('可以接受 pc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        pc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-pc-7');
    expect(wrapper.classes()).include('col-offset-pc-7');
    wrapper.destroy();
  });
  it('可以接受 largePc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        largePc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-large-pc-7');
    expect(wrapper.classes()).include('col-offset-large-pc-7');
    wrapper.destroy();
  });
});
