import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FNav from '../../src/components/nav/FNav.vue';
import FNavItem from '../../src/components/nav/FNavItem.vue';
chai.use(sinonChai);

const itemName = 'xxx';
const returnOptionsObj = () => {
  return {
    propsData: { name: itemName },
    slots: { default: '<span>内容</span>' },
  };
};

describe('FNavIem.vue', () => {
  it('存在', () => {
    const wrapper = mount(FNavItem, returnOptionsObj());
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 name 属性', () => {
    const wrapper = mount(FNavItem, returnOptionsObj());
    expect(wrapper.find('.f-nav-item').attributes('data-name')).to.eq(itemName);
    wrapper.destroy();
  });

  it('当且仅当传入 FNavItem 组件的是单个标签时，就劫持 FNavItem 组件的点击事件到该单标签上', () => {
    const wrapper1 = mount(FNav, {
      stubs: { FNavItem },
      slots: {
        default: '<f-nav-item name="x1"><span>内容</span></f-nav-item>',
      },
    });
    const fake = sinon.fake();
    wrapper1.find('.f-nav-item').trigger('click');
    expect(fake).to.not.have.been.called;
    wrapper1.find('span').element.addEventListener('click', fake);
    wrapper1.find('.f-nav-item').trigger('click');
    expect(fake).to.have.been.calledOnce;
    wrapper1.find('span').element.removeEventListener('click', fake);
    wrapper1.destroy();

    const wrapper2 = mount(FNav, {
      stubs: { FNavItem },
      slots: {
        default: `
          <f-nav-item name="x1">
            <span>内容1</span>
            <span>内容2</span>
          </f-nav-item>
        `,
      },
    });
    const fake2 = sinon.fake();
    wrapper2
      .findAll('span')
      .wrappers.map(w => w.element.addEventListener('click', fake2));
    wrapper2.find('.f-nav-item').trigger('click');
    expect(fake2).to.not.have.been.called;
    wrapper2
      .findAll('span')
      .wrappers.map(w => w.element.removeEventListener('click', fake2));
    wrapper2.destroy();
  });
});
