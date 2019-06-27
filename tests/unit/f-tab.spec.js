import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FTab from '@/components/FTab.vue';
import FTabNav from '@/components/FTabNav.vue';
import FTabNavItem from '@/components/FTabNavItem.vue';
import FTabBody from '@/components/FTabBody.vue';
import FTabBodyItem from '@/components/FTabBodyItem.vue';

function returnOptionsObj(propsData) {
  return {
    propsData,
    stubs: {
      'f-tab-nav': FTabNav,
      'f-tab-nav-item': FTabNavItem,
      'f-tab-body': FTabBody,
      'f-tab-body-item': FTabBodyItem,
    },
    slots: {
      default: `
          <f-tab-nav>
            <f-tab-nav-item name="11">11</f-tab-nav-item>
            <f-tab-nav-item name="22">22</f-tab-nav-item>
            <f-tab-nav-item name="33">33</f-tab-nav-item>
          </f-tab-nav>
          <f-tab-body>
            <f-tab-body-item name="11">00011</f-tab-body-item>
            <f-tab-body-item name="22">00022</f-tab-body-item>
            <f-tab-body-item name="33">00033</f-tab-body-item>
          </f-tab-body>
        `,
    },
  };
}

describe('FTab.vue', () => {
  it('存在', () => expect(FTab).to.exist);

  it('可以接受 selected 属性', () => {
    const wrapper = mount(
      FTab,
      returnOptionsObj({
        selected: '11',
      })
    );

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.tab-nav-item[data-name="11"]').classes()).include(
        'active'
      );
    });
  });

  it('可以接受 direction 属性', () => {
    const wrapper = mount(
      FTab,
      returnOptionsObj({
        selected: '11',
        direction: 'vertical',
      })
    );
    expect(wrapper.find('.tab').element.style.display).to.eq('flex');
    expect(wrapper.find('.tab-nav').classes()).include('vertical');
    // expect(wrapper.find('.tab-nav').element.style.display).to.eq('block');
    expect(wrapper.find('.tab-body').classes()).include('vertical');
  });
});
