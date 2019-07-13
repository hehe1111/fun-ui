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

  describe('可以切换页码', () => {
    const returnWrapper = (listener, propsData = {}) => {
      return mount(FPagination, {
        propsData: { total, ...propsData },
        listeners: { 'update:current': listener },
      });
    };

    it('在第一页时禁止切换到上一页', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);

      wrapper
        .findAll('.f-button')
        .at(0)
        .trigger('click');
      expect(fake).to.have.not.been.called;
      wrapper.destroy();
    });

    it('不在第一页时可以切换到上一页', () => {
      const fake = sinon.fake();
      const current = 2;
      const wrapper = returnWrapper(fake, { current });

      wrapper
        .findAll('.f-button')
        .at(0)
        .trigger('click');
      expect(fake).to.have.been.calledOnceWith(current - 1);
      wrapper.destroy();
    });

    it('在最后一页时禁止切换到下一页', () => {
      const current = total;
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake, { current });
      const vmArray = wrapper.findAll('.f-button').wrappers;

      vmArray[vmArray.length - 1].trigger('click');
      expect(fake).to.have.not.been.called;
      wrapper.destroy();
    });

    it('不在最后一页时可以切换到下一页', () => {
      const fake = sinon.fake();
      const current = 2;
      const wrapper = returnWrapper(fake, { current });
      const vmArray = wrapper.findAll('.f-button').wrappers;

      vmArray[vmArray.length - 1].trigger('click');
      expect(fake).to.have.been.calledOnceWith(current + 1);
      wrapper.destroy();
    });

    it('也可以通过直接点击某一个页码来切换', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);
      const vmArray = wrapper.findAll('.f-button').wrappers;

      vmArray[vmArray.length - 2].trigger('click');
      expect(fake).to.have.been.calledOnceWith(total);
      wrapper.destroy();
    });

    it('点击分隔符时不能切换页码', () => {
      const fake = sinon.fake();
      const wrapper = returnWrapper(fake);

      wrapper
        .findAll('.f-button.separator')
        .at(0)
        .trigger('click');
      expect(fake).to.have.not.been.called;
      wrapper.destroy();
    });
  });
});
