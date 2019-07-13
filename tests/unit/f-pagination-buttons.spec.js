import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FPaginationButtons from '../../src/components/pagination/FPaginationButtons.vue';
chai.use(sinonChai);

const total = 10;
const returnOptionsObj = (propsData = {}) => {
  return {
    propsData: { total, ...propsData },
  };
};

describe('FPaginationButtons.vue', () => {
  it('存在', () => expect(FPaginationButtons).to.exist);

  it('可以接受 current 属性，current 可以不传，默认值为 1', () => {
    const wrapper1 = mount(FPaginationButtons, returnOptionsObj());
    const selector1 = '.f-button[data-name="1"]';
    expect(wrapper1.find(selector1).classes()).include('high-light');
    expect(wrapper1.find(selector1).text()).to.eq('1');
    wrapper1.destroy();

    const current = 2;
    const wrapper2 = mount(FPaginationButtons, returnOptionsObj({ current }));
    const selector2 = `.f-button[data-name="${current}"]`;
    expect(wrapper2.find(selector2).classes()).to.include('high-light');
    expect(wrapper2.find(selector2).text()).to.eq(`${current}`);
    wrapper2.destroy();
  });

  it('可以接受 total 属性', () => {
    const wrapper = mount(FPaginationButtons, returnOptionsObj());
    const buttons = wrapper.findAll('.f-button').wrappers;
    expect(buttons[buttons.length - 2].text()).to.eq(`${total}`);
    wrapper.destroy();
  });

  it('可以接受 noGutter 属性', () => {
    const wrapper = mount(
      FPaginationButtons,
      returnOptionsObj({ noGutter: true })
    );
    expect(wrapper.find('.f-pagination-buttons').classes()).to.include(
      'f-button-group'
    );
    wrapper.destroy();
  });

  it('可以接受 hideOnSinglePage 属性', () => {
    const wrapper = mount(
      FPaginationButtons,
      returnOptionsObj({ total: 1, hideOnSinglePage: true })
    );
    expect(wrapper.html()).to.not.exist;
    wrapper.destroy();
  });

  it('可以接受 onPageChange 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(
      FPaginationButtons,
      returnOptionsObj({ onPageChange: fake })
    );
    const pageNumber = 2;
    const selector = `.f-button[data-name="${pageNumber}"]`;
    wrapper.find(selector).trigger('click');

    expect(fake).to.have.been.calledOnceWith(pageNumber);
    wrapper.destroy();
  });

  it('可以触发 update:current 事件', () => {
    const fake = sinon.fake();
    const wrapper = mount(FPaginationButtons, {
      ...returnOptionsObj(),
      listeners: { 'update:current': fake },
    });
    const pageNumber = 2;
    const selector = `.f-button[data-name="${pageNumber}"]`;

    wrapper.find(selector).trigger('click');
    expect(fake).to.have.been.calledOnceWith(pageNumber);
    wrapper.destroy();
  });
});
