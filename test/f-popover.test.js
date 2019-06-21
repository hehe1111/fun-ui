import Vue from 'vue';
import { describe, it } from 'mocha';
import FPopover from '../src/FPopover.vue';

Vue.component('f-popover', FPopover);

// eslint-disable-next-line no-undef
const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FPopover', () => {
  it('存在', () => expect(FPopover).to.exist);

  it('可以接受 position 属性', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-popover position="bottom">
        <template slot="content">
          <div class="popover-content-1">向下弹出内容</div>
        </template>
        <button>点我 bottom 弹出</button>
      </f-popover>
    `;
    // vm 时 div 对应的 Vue 实例，不是 FPopover 组件
    const vm = new Vue({
      el: div,
    });

    expect(document.querySelector('.popover-content-1')).to.not.exist;

    vm.$el.querySelector('button').click();
    vm.$nextTick(() => {
      expect(document.querySelector('.popover-content-1')).to.exist;
      expect(
        document
          .querySelector('.content-container')
          .classList.contains('position-bottom')
      ).to.eq(true);
      done();
      // 加上下面这一段会报错
      // vm.$nextTick(() => {
      //   vm.$el.remove();
      //   vm.$destroy();
      //   done();
      // });
    });
  });

  it('可以接受 trigger 属性', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-popover trigger="hover">
        <template slot="content">
          <div class="popover-content-2">弹出内容</div>
        </template>
        <button>点我</button>
      </f-popover>
    `;
    const vm = new Vue({
      el: div,
    });

    expect(document.querySelector('.popover-content-2')).to.not.exist;

    const event = new Event('mouseenter');
    vm.$el.querySelector('.popover').dispatchEvent(event);

    vm.$nextTick(() => {
      expect(document.querySelector('.popover-content-2')).to.exist;
      done();
      // 加上下面这一段会报错
      // vm.$nextTick(() => {
      //   vm.$el.remove();
      //   vm.$destroy();
      //   done();
      // });
    });
  });
});
