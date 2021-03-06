import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FTab from '../../src/components/tab/FTab.vue';
import FTabNav from '../../src/components/tab/FTabNav.vue';
import FTabNavItem from '../../src/components/tab/FTabNavItem.vue';
import FTabBody from '../../src/components/tab/FTabBody.vue';
import FTabBodyItem from '../../src/components/tab/FTabBodyItem.vue';

function returnOptionsObj(propsData) {
  return {
    propsData,
    stubs: { FTabNav, FTabNavItem, FTabBody, FTabBodyItem },
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
  it('存在', () => {
    const wrapper = mount(FTab, returnOptionsObj({ selected: '11' }));
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 selected 属性', () => {
    const wrapper = mount(FTab, returnOptionsObj({ selected: '11' }));
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('[data-name="11"]').classes()).include(
        'f-tab-nav-item-active'
      );
      wrapper.destroy();
    });
  });

  it('可以接受 vertical 属性', () => {
    const wrapper = mount(FTab, {
      attachToDocument: true,
      ...returnOptionsObj({
        selected: '11',
        vertical: true,
      }),
    });
    expect(wrapper.find('.f-tab').element.style.display).to.eq('flex');
    expect(wrapper.find('.f-tab-nav').classes()).include('vertical');
    expect(
      window.getComputedStyle(wrapper.find('.f-tab-nav').element).display
    ).to.eq('block');
    expect(wrapper.find('.f-tab-body').classes()).include('vertical');
    wrapper.destroy();
  });
});
