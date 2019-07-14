import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FPagination from '../../src/components/pagination/FPagination.vue';
chai.use(sinonChai);

const current = 1;
const total = 10;
const noGutter = true;
const hideOnSinglePage = true;
const onPageChange = () => {};

describe('FPagination.vue', () => {
  it('存在', () => expect(FPagination).to.exist);

  it('可以接受 current / total / noGutter / hideOnSinglePage / onPageChange 属性', () => {
    const wrapper = mount(FPagination, {
      propsData: { current, total, noGutter, hideOnSinglePage, onPageChange },
    });
    expect(wrapper.vm.current).to.eq(current);
    expect(wrapper.vm.total).to.eq(total);
    expect(wrapper.vm.noGutter).to.eq(noGutter);
    expect(wrapper.vm.hideOnSinglePage).to.eq(hideOnSinglePage);
    expect(wrapper.vm.onPageChange).to.eq(onPageChange);
    wrapper.destroy();
  });

  describe('可以切换页码, 同时会触发 update:current 事件', () => {
    const returnWrapper = (listener, propsData = {}) => {
      return mount(FPagination, {
        propsData: { total, ...propsData },
        listeners: { 'update:current': listener },
      });
    };

    it('在第一页时禁止切换到上一页', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);
      const selector = `.f-button[data-name="${current}"]`;
      const prevButton = wrapper.findAll('.f-button').at(0);

      expect(wrapper.find(selector).classes()).to.include('high-light');
      expect(prevButton.classes()).to.include('disabled');
      prevButton.trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.not.been.called;
        expect(wrapper.find(selector).classes()).to.include('high-light');
        expect(prevButton.classes()).to.include('disabled');
        wrapper.destroy();
      });
    });

    it('不在第一页时可以切换到上一页', () => {
      const current = 2;
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake, { current });
      const oldSelector = `.f-button[data-name="${current}"]`;
      const newSelector = `.f-button[data-name="${current - 1}"]`;
      const prevButton = wrapper.findAll('.f-button').at(0);

      expect(wrapper.find(oldSelector).classes()).to.include('high-light');
      expect(wrapper.find(newSelector).classes()).to.not.include('high-light');
      expect(prevButton.classes()).to.not.include('disabled');
      prevButton.trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.been.calledOnceWith(current - 1);
        expect(wrapper.find(oldSelector).classes()).to.not.include(
          'high-light'
        );
        expect(wrapper.find(newSelector).classes()).to.include('high-light');
        expect(prevButton.classes()).to.include('disabled');
        wrapper.destroy();
      });
    });

    it('在最后一页时禁止切换到下一页', () => {
      const current = total;
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake, { current });
      const selector = `.f-button[data-name="${current}"]`;
      const buttons = wrapper.findAll('.f-button').wrappers;
      const nextButton = buttons[buttons.length - 1];

      expect(wrapper.find(selector).classes()).to.include('high-light');
      expect(nextButton.classes()).to.include('disabled');
      nextButton.trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.not.been.called;
        expect(wrapper.find(selector).classes()).to.include('high-light');
        expect(nextButton.classes()).to.include('disabled');
        wrapper.destroy();
      });
    });

    it('不在最后一页时可以切换到下一页', () => {
      const current = 2;
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake, { current });
      const oldSelector = `.f-button[data-name="${current}"]`;
      const newSelector = `.f-button[data-name="${current + 1}"]`;
      const buttons = wrapper.findAll('.f-button').wrappers;
      const nextButton = buttons[buttons.length - 1];

      expect(wrapper.find(oldSelector).classes()).to.include('high-light');
      expect(wrapper.find(newSelector).classes()).to.not.include('high-light');
      expect(nextButton.classes()).to.not.include('disabled');
      nextButton.trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.been.calledOnceWith(current + 1);
        expect(wrapper.find(oldSelector).classes()).to.not.include(
          'high-light'
        );
        expect(wrapper.find(newSelector).classes()).to.include('high-light');
        wrapper.destroy();
      });
    });

    it('也可以通过直接点击某一个页码来切换', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);
      const oldSelector = `.f-button[data-name="${current}"]`;
      const newSelector = `.f-button[data-name="${total}"]`;

      expect(wrapper.find(oldSelector).classes()).to.include('high-light');
      expect(wrapper.find(newSelector).classes()).to.not.include('high-light');
      wrapper.find(newSelector).trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.been.calledOnceWith(total);
        expect(wrapper.find(oldSelector).classes()).to.not.include(
          'high-light'
        );
        expect(wrapper.find(newSelector).classes()).to.include('high-light');
        wrapper.destroy();
      });
    });

    it('点击分隔符时不能切换页码', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);

      wrapper
        .findAll('.f-button.separator')
        .at(0)
        .trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(fake).to.have.not.been.called;
        wrapper.destroy();
      });
    });
  });
});
