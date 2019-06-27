import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FToast from '@/components/FToast.vue';
chai.use(sinonChai);

describe('FToast.vue', () => {
  it('存在', () => expect(FToast).to.exist);

  it('可以接受 autoCloseDelay 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(FToast, {
      propsData: {
        autoCloseDelay: 1,
      },
      listeners: {
        close: () => {
          fake();
          expect(fake).to.have.been.called;
        },
      },
    });
    expect(wrapper).to.exist;
  });

  it('可以接受 closeButton 属性', () => {
    const text = '关闭啦啦啦啦啦';
    const fake = sinon.fake();
    const wrapper = mount(FToast, {
      propsData: {
        closeButton: {
          text,
          callback: fake,
        },
      },
    });
    const button = wrapper.find('.close-button-text');
    expect(button.text().trim()).to.eq(text);
    button.trigger('click');
    expect(fake).to.have.been.called;
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
      propsData: {
        position: 'middle',
      },
    });
    expect(wrapper.classes()).include('position-middle');
  });
});
