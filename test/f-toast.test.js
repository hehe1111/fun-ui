import Vue from 'vue';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import FToast from '../src/FToast.vue';

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FToast', () => {
  const Constructor = Vue.extend(FToast);

  it('存在', () => expect(FToast).to.exist);

  it('可以接受 autoCloseDelay 属性', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const toast = new Constructor({
      propsData: {
        autoCloseDelay: 1,
      },
    });
    toast.$mount(div);
    toast.$on('close', () => {
      expect(document.body.contains(toast.$el)).to.eq(false);
      done();
    });
  });

  it('可以接受 closeButton 属性', () => {
    const text = '关闭啦啦啦啦啦';
    const callback = sinon.fake();
    const toast = new Constructor({
      propsData: {
        closeButton: {
          text,
          callback,
        },
      },
    });
    toast.$mount();
    const button = toast.$el.querySelector('.close-button-text');
    expect(button.textContent.trim()).to.eq(text);
    button.click();
    expect(callback).to.have.been.called;
  });

  it('可以接受 enableHTML 属性', () => {
    const toast = new Constructor({
      propsData: {
        enableHTML: true,
      },
    });
    toast.$slots.default = '<p id="testHTML">hahahahhahahah</p>';
    toast.$mount();
    const p = toast.$el.querySelector('#testHTML');
    expect(p).to.exist;
  });

  it('可以接受 position 属性', () => {
    const toast = new Constructor({
      propsData: {
        position: 'middle',
      },
    });
    toast.$mount();
    expect(toast.$el.classList.contains('position-middle')).to.eq(true);
  });
});
