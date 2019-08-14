import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FRow from '../../src/components/grid/FRow.vue';
import FCol from '../../src/components/grid/FCol.vue';

describe('FRow.vue', () => {
  it('存在', () => {
    const wrapper = mount(FRow);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 gutter 属性', () => {
    const wrapper = mount(FRow, {
      propsData: { gutter: '20' },
      stubs: { FCol },
      slots: {
        default: `
          <f-col span="12"></f-col>
          <f-col span="12"></f-col>
        `,
      },
    });
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-row').element.style.marginLeft).to.eq('-10px');
      expect(wrapper.find('.f-row').element.style.marginRight).to.eq('-10px');

      // https://vue-test-utils.vuejs.org/zh/api/wrapper-array/
      const cols = wrapper.findAll('.f-col');

      expect(cols.at(0).element.style.paddingRight).to.eq('10px');
      expect(cols.at(1).element.style.paddingLeft).to.eq('10px');
      wrapper.destroy();
    });
  });
});
