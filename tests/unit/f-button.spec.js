import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FButton from '@/components/FButton.vue';
chai.use(sinonChai);

describe('FButton.vue', () => {
  // it('存在', () => expect(FButton).to.exist);
  // expect(FButton).to.be.ok
  it('存在', () => {
    const wrapper = mount(FButton);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以通过设置 icon 来使用对应的图标', () => {
    const wrapper = mount(FButton, {
      // 通过 propsData 传入 prop
      propsData: { icon: 'loading' },
    });
    const href = wrapper.find('use').attributes('href');
    const classValue = wrapper.find('svg').attributes('class');
    expect(href).to.eq('#icon-loading');
    expect(classValue).to.eq('icon loading icon-left');
    wrapper.destroy();
  });

  xit('可以通过设置 iconPosition 来设置图标在按钮中的位置；右边的图标 order 为 "1"', () => {
    const wrapper = mount(FButton, {
      propsData: {
        icon: 'setting',
        iconPosition: 'right',
      },
    });
    const href = wrapper.find('use').attributes()['href'];
    const svg = wrapper.find('svg');
    const classValue = svg.attributes()['class'];
    expect(href).to.eq('#icon-setting');
    expect(classValue).to.eq('icon icon-right');
    // const { order } = window.getComputedStyle(c.$el.querySelector('svg'));
    // expect(typeof order).to.eq('string');
    // expect(order).to.eq('1');
    wrapper.destroy();
  });

  it('点击按钮时触发 click 事件', () => {
    // const fake = sinon.fake();
    // const wrapper = mount(FButton);
    // wrapper.vm.$on('click', fake);
    // wrapper.trigger('click');
    // expect(fake).to.have.been.called;

    const fake = sinon.fake();
    const wrapper = mount(FButton, {
      // https://vue-test-utils.vuejs.org/zh/api/options.html#listeners
      listeners: { click: fake },
    });
    wrapper.trigger('click');
    expect(fake).to.have.been.called;
    wrapper.destroy();
  });
});
