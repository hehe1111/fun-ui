import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FRow from '@/components/FRow.vue';
import FCol from '@/components/FCol.vue';

describe('FCol.vue', () => {
  it('存在', () => expect(FCol).to.exist);

  it('可以接受 span 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        span: 7,
      },
    });
    // https://www.chaijs.com/api/bdd/#method_include
    // .include .includes .contain .contains 四者等价，后三者是别名
    // expect(wrapper.classes()).include('col-7');
    // 等价于
    expect(wrapper.classes('col-7')).to.eq(true);
  });

  it('可以接受 offset 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        span: 1,
        offset: 7,
      },
    });
    expect(wrapper.classes()).include('col-offset-7');
  });

  it('可以接受 ipad 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        ipad: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-ipad-7');
    expect(wrapper.classes()).include('col-offset-ipad-7');
  });
  it('可以接受 small_pc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        small_pc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-small-pc-7');
    expect(wrapper.classes()).include('col-offset-small-pc-7');
  });
  it('可以接受 pc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        pc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-pc-7');
    expect(wrapper.classes()).include('col-offset-pc-7');
  });
  it('可以接受 large_pc 属性', () => {
    const wrapper = mount(FCol, {
      propsData: {
        large_pc: { span: '7', offset: '7' },
      },
    });
    expect(wrapper.classes()).include('col-large-pc-7');
    expect(wrapper.classes()).include('col-offset-large-pc-7');
  });

  it('可以接受 col_align 属性', () => {
    const wrapper = mount(FRow, {
      // https://vue-test-utils.vuejs.org/zh/api/options.html#stubs
      propsData: {
        align: 'center',
      },
      stubs: {
        'f-col': FCol,
      },
      slots: {
        default: '<f-col :span="1" col_align="right">1</f-col>',
      },
    });
    expect(wrapper.find('.col').classes()).include('align-right');
  });
});
