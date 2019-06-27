import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FCollapse from '@/components/FCollapse.vue';
import FCollapseItem from '@/components/FCollapseItem.vue';

describe('FCollapseItem.vue', () => {
  it('存在', () => expect(FCollapseItem).to.exist);

  it('可以接受 title 和 name 属性', () => {
    const text = '标题1';
    const name = 'xxxx';
    const wrapper = mount(FCollapse, {
      propsData: {
        opened: [`${name}`],
      },
      stubs: {
        'f-collapse-item': FCollapseItem,
      },
      slots: {
        default: `<f-collapse-item title=${text} name=${name}>内容1</f-collapse-item>`,
      },
    });
    expect(wrapper.find('header').text()).to.eq(text);
    expect(wrapper.find('.collapse-item').attributes('data-name')).to.eq(name);
  });
});
