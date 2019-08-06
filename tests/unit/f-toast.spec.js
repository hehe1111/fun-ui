import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FToast from '../../src/components/FToast.vue';
chai.use(sinonChai);

describe('FToast.vue', () => {
  it('存在', () => {
    const wrapper = mount(FToast);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 autoCloseDelay 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(FToast, {
      propsData: { autoCloseDelay: 1 },
      listeners: {
        close: () => {
          fake();
          expect(fake).to.have.been.called;
          wrapper.destroy();
        },
      },
    });
    expect(wrapper).to.exist;
  });

  it('可以接受 onClose 属性', done => {
    const timeout = 0.01;
    const fake = sinon.fake();
    const wrapper = mount(FToast, {
      propsData: { autoCloseDelay: timeout, onClose: fake },
    });
    expect(fake).to.not.have.been.called;
    setTimeout(() => {
      expect(fake).to.have.been.called;
      done();
      wrapper.destroy();
    }, timeout * 1000 + 10);
  });

  it('可以接受 closeIcon 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(FToast, {
      propsData: { onClose: fake, closeIcon: true },
    });
    const iconContainer = wrapper.find('.f-toast-close-icon-container');
    const icon = wrapper.find('.f-toast-close-icon');
    expect(iconContainer.exists()).to.eq(true);
    expect(icon.exists()).to.eq(true);
    iconContainer.trigger('click');
    expect(fake).to.have.been.called;
    wrapper.destroy();
  });

  it('可以接受 enableHTML 属性', () => {
    const wrapper = mount(FToast, {
      propsData: {
        message: '<p id="testHTML">hahahahhahahah</p>',
        enableHTML: true,
      },
    });

    // 此处必须加上 .element
    expect(wrapper.find('#testHTML').element).to.exist;
  });

  it('可以接受 position 属性', () => {
    const wrapper = mount(FToast, {
      propsData: { position: 'middle' },
    });
    expect(wrapper.classes()).include('position-middle');
    wrapper.destroy();
  });

  it('可以接受 state 属性', () => {
    const wrapper = mount(FToast, {
      attachToDocument: true,
      propsData: { state: 'success' },
    });
    expect(wrapper.find('.f-toast').classes()).include('success');
    // rgb(65, 184, 131) === #41B883 === $green
    expect(
      window.getComputedStyle(wrapper.find('.f-toast').element).backgroundColor
    ).to.eq('rgb(65, 184, 131)');
    wrapper.destroy();
  });
});
