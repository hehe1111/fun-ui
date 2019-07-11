import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FSubNav from '../../src/components/nav/FSubNav.vue';
import FNavItem from '../../src/components/nav/FNavItem.vue';
chai.use(sinonChai);

const subNavName = 'sub1';
const returnOptionsObj = () => {
  return {
    attrs: {
      class: 'f-sub-nav-container xxx',
    },
    propsData: { name: subNavName },
    stubs: { FNavItem },
    slots: {
      default: `<f-nav-item name="sub1-1">内容1</f-nav-item>`,
      title: '子菜单1',
    },
  };
};

describe('FSubNav.vue', () => {
  it('存在', () => {
    const wrapper = mount(FSubNav, returnOptionsObj());
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 name 属性', () => {
    const wrapper = mount(FSubNav, returnOptionsObj());
    expect(
      wrapper
        .find('.xxx > .f-sub-nav-title-container > .f-nav-item')
        .attributes('data-name')
    ).to.eq(subNavName);
    wrapper.destroy();
  });

  it('测试由 FNav 组件注入的 trigger 属性: 值为 hover 时可以触发鼠标移入移出事件', () => {
    const fake = sinon.fake();
    const onMouseEnter = $event => {
      fake();
      expect($event.target.innerText).to.not.exist;
      expect($event.target.textContent).to.eq('子菜单1');
    };
    const onMouseLeave = $event => {
      fake();
      expect($event.target.innerText).to.not.exist;
      expect($event.target.textContent).to.eq('子菜单1');
    };
    const wrapper = mount(FSubNav, {
      ...returnOptionsObj(),
      listeners: {
        mouseenter: onMouseEnter,
        mouseleave: onMouseLeave,
      },
    });
    wrapper.find('.xxx > .f-sub-nav-title-container').trigger('mouseenter');
    wrapper.find('.xxx > .f-sub-nav-title-container').trigger('mouseleave');
    expect(fake).to.have.been.calledTwice;
    wrapper.destroy();
  });

  it('测试由 FNav 组件注入的 trigger 属性: 值为 click 时可以触发点击事件', () => {
    const fake = sinon.fake();
    const onClick = $event => {
      fake();
      expect($event.target.innerText).to.not.exist;
      expect($event.target.textContent).to.eq('子菜单1');
    };
    const wrapper = mount(FSubNav, {
      ...returnOptionsObj(),
      listeners: {
        click: onClick,
      },
      provide: {
        trigger: 'click',
      },
    });
    wrapper.find('.xxx > .f-sub-nav-title-container').trigger('click');
    expect(fake).to.have.been.calledOnce;
    wrapper.destroy();
  });
});
