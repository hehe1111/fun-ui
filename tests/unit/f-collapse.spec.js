import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FCollapse from '../../src/components/collapse/FCollapse.vue';
import FCollapseItem from '../../src/components/collapse/FCollapseItem.vue';
chai.use(sinonChai);

function returnOptionsObj(propsData) {
  return {
    propsData,
    stubs: { FCollapseItem },
    slots: {
      default: `
        <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
        <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
        <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
      `,
    },
  };
}

describe('FCollapse.vue', () => {
  it('存在', () => {
    const wrapper = mount(FCollapse, returnOptionsObj({ opened: ['c1'] }));
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 opened 属性', () => {
    const wrapper = mount(
      FCollapse,
      returnOptionsObj({ opened: ['c2', 'c3'] })
    );

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('[data-name="c1"] > .content').element).to.not.exist;
      expect(wrapper.find('[data-name="c2"] > .content').element).to.exist;
      expect(wrapper.find('[data-name="c3"] > .content').element).to.exist;
      wrapper.destroy();
    });
  });

  it('可以接受 multiple 属性，默认是 true', () => {
    const wrapper = mount(
      FCollapse,
      returnOptionsObj({
        opened: ['c2'],
        multiple: false,
      })
    );

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('[data-name="c1"] > .content').element).to.not.exist;
      expect(wrapper.find('[data-name="c2"] > .content').element).to.exist;
      expect(wrapper.find('[data-name="c3"] > .content').element).to.not.exist;

      wrapper.find('[data-name="c3"] > header').trigger('click');

      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('[data-name="c1"] > .content').element).to.not
          .exist;
        expect(wrapper.find('[data-name="c2"] > .content').element).to.not
          .exist;
        expect(wrapper.find('[data-name="c3"] > .content').element).to.exist;

        wrapper.destroy();
      });
    });
  });

  it('可以触发 update:opened 事件', () => {
    const callback = sinon.fake();
    const wrapper = mount(FCollapse, {
      ...returnOptionsObj({ opened: [] }),
      listeners: { 'update:opened': callback },
    });

    wrapper.find('[data-name="c3"] > header').trigger('click');
    expect(callback).to.have.been.called;
    wrapper.destroy();
  });
});
