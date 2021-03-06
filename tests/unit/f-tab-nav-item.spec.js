import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FTabNavItem from '../../src/components/tab/FTabNavItem.vue';
chai.use(sinonChai);

describe('FTabNavItem.vue', () => {
  it('存在', () => {
    const wrapper = mount(FTabNavItem, {
      propsData: { name: 'xx' },
    });
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 name 属性', () => {
    const name = 'hahaha';
    const wrapper = mount(FTabNavItem, {
      propsData: { name },
    });
    expect(wrapper.attributes('data-name')).to.eq(name);
    wrapper.destroy();
  });

  it('可以接受 disabled 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(FTabNavItem, {
      propsData: {
        name: 'hahaha',
        disabled: true,
      },
      listeners: { click: fake },
    });
    expect(wrapper.classes()).include('f-tab-nav-item-disabled');
    wrapper.trigger('click');
    expect(fake).to.not.have.been.called;
    wrapper.destroy();
  });
});
