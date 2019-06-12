import Vue from 'vue';
import chai from 'chai';
import { describe, it } from 'mocha';
import FRow from '../src/FRow.vue';
import FCol from '../src/FCol.vue';

const { expect } = chai;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('FCol', () => {
  const Constructor = Vue.extend(FCol);

  it('存在', () => expect(FCol).to.exist);

  // it("接受 span 属性", (done) => {
  //   Vue.component("f-row", FRow);
  //   Vue.component("f-col", FCol);
  //   const div = document.createElement("div");
  //   document.body.appendChild(div);
  //   div.innerHTML = `
  //     <f-row>
  //       <f-col span="7">1</f-col>
  //     </f-row>
  //   `;

  //   const vm = new Vue({
  //     el: div,
  //   });

  //   setTimeout(() => {
  //     const col = vm.$el.querySelector(".col");
  //     expect(col.classList.contains('col-7')).to.eq(true);
  //     vm.$el.remove();
  //     vm.$destroy();
  //     done();
  //   }, 0);
  // });

  it('接受 span 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        span: 7,
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });

  it('接受 offset 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        offset: 7,
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-offset-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });

  it('接受 ipad 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        ipad: { span: '7', offset: '7' },
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-ipad-7')).to.eq(true);
    expect(vm.$el.classList.contains('col-offset-ipad-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it('接受 small_pc 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        small_pc: { span: '7', offset: '7' },
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-small-pc-7')).to.eq(true);
    expect(vm.$el.classList.contains('col-offset-small-pc-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it('接受 pc 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        pc: { span: '7', offset: '7' },
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-pc-7')).to.eq(true);
    expect(vm.$el.classList.contains('col-offset-pc-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it('接受 large_pc 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        large_pc: { span: '7', offset: '7' },
      },
    }).$mount(div);
    expect(vm.$el.classList.contains('col-large-pc-7')).to.eq(true);
    expect(vm.$el.classList.contains('col-offset-large-pc-7')).to.eq(true);
    div.remove();
    vm.$destroy();
  });

  it('接受 col_align 属性', done => {
    Vue.component('f-row', FRow);
    Vue.component('f-col', FCol);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <f-row align="center">
        <f-col col_align="right">1</f-col>
      </f-row>
    `;

    const vm = new Vue({
      el: div,
    });

    setTimeout(() => {
      const col = vm.$el.querySelector('.col');
      expect(getComputedStyle(col).textAlign).to.eq('right');
      div.remove();
      vm.$destroy();
      done();
    }, 0);
  });
});
