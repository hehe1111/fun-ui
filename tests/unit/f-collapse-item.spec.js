import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FCollapse from '../../src/components/collapse/FCollapse.vue';
import FCollapseItem from '../../src/components/collapse/FCollapseItem.vue';

describe('FCollapseItem.vue', () => {
  it('存在', () => {
    const wrapper = mount(FCollapseItem, {
      propsData: { title: '标题', name: 'xx' },
    });
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 title 和 name 属性', () => {
    const text = '标题1';
    const name = 'xxxx';
    const wrapper = mount(FCollapse, {
      propsData: { opened: [`${name}`] },
      stubs: { FCollapseItem },
      slots: {
        default: `<f-collapse-item title=${text} name=${name}>内容1</f-collapse-item>`,
      },
    });
    expect(wrapper.find('header').text()).to.eq(text);
    expect(wrapper.find('.collapse-item').attributes('data-name')).to.eq(name);
    wrapper.destroy();
  });
});
