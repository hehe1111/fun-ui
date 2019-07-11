import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FRow from '../../src/components/grid/FRow.vue';
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

  it('可以接受 ipad 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        ipad: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-ipad-7');
    expect(wrapper.classes()).include('col-offset-ipad-7');
    wrapper.destroy();
  });
  it('可以接受 samllPC 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        samllPC: { span: '7', offset: '7' },
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
  it('可以接受 largePC 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        largePC: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-large-pc-7');
    expect(wrapper.classes()).include('col-offset-large-pc-7');
    wrapper.destroy();
  });

  it('可以接受 colAlign 属性', () => {
    const colAlign = 'right';
    const wrapper = mount(FRow, {
      attachToDocument: true,
      propsData: { align: 'center' },
      // https://vue-test-utils.vuejs.org/zh/api/options.html#stubs
      stubs: { FCol },
      slots: {
        default: `<f-col :span="1" col-align=${colAlign}>1</f-col>`,
      },
    });
    expect(wrapper.find('.col').classes()).include(`align-${colAlign}`);
    expect(
      window.getComputedStyle(wrapper.find('.col').element).textAlign
    ).to.eq(colAlign);
    wrapper.destroy();
  });
});
