import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FTabNavItem from '@/components/FTabNavItem.vue';
chai.use(sinonChai);

describe('FTabNavItem.vue', () => {
  it('存在', () => expect(FTabNavItem).to.exist);

  it('可以接受 name 属性', () => {
    /**
     * ERROR: '[Vue warn]: Injection "eventBus" not found
     * 解决：可选注入
     * inject: {
     *   eventBus: {
     *     from: 'eventBus',
     *     default: () => ({}), // 注意加括号
     *   },
     * },
     */
    const name = 'hahaha';
    const wrapper = mount(FTabNavItem, {
      propsData: { name },
    });
    expect(wrapper.attributes('data-name')).to.eq(name);
  });

  it('可以接受 disabled 属性', () => {
    const fake = sinon.fake();
    const wrapper = mount(FTabNavItem, {
      propsData: {
        name: 'hahaha',
        disabled: true,
      },
      listeners: {
        click: fake,
      },
    });
    expect(wrapper.classes()).include('disabled');
    wrapper.trigger('click');
    expect(fake).to.have.not.been.called;
  });
});
