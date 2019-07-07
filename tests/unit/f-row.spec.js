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
      expect(wrapper.find('.row').element.style.marginLeft).to.eq('-10px');
      expect(wrapper.find('.row').element.style.marginRight).to.eq('-10px');

      // https://vue-test-utils.vuejs.org/zh/api/wrapper-array/
      const cols = wrapper.findAll('.col');

      expect(cols.at(0).element.style.paddingRight).to.eq('10px');
      expect(cols.at(1).element.style.paddingLeft).to.eq('10px');
      wrapper.destroy();
    });
  });

  xit('可以接受 align 属性', () => {
    const wrapper = mount(FRow, {
      propsData: {
        align: 'center',
      },
      stubs: { FCol },
      slots: {
        default: '<f-col span="12">1</f-col>',
      },
    });

    console.log(wrapper.html());
    console.log(1, wrapper.find('.col').element.style.textAlign);
    console.log(wrapper.exists());
    wrapper.destroy();
    console.log(wrapper.exists());

    // const div = document.createElement('div');
    // document.body.appendChild(div);
    // div.innerHTML = `
    //   <f-row align="center">
    //     <f-col span="12">1</f-col>;
    //   </f-row>
    // `;
    // const vm = new Vue({
    //   el: div,
    // });
    // setTimeout(() => {
    //   const col = vm.$el.querySelector('.col');
    //   expect(getComputedStyle(col).textAlign).to.eq('center');
    //   vm.$el.remove();
    //   vm.$destroy();
    //   done();
    // }, 0);
  });
});
