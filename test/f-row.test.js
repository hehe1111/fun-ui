import Vue from "vue";
import FRow from "../src/FRow.vue";
import FCol from "../src/FCol.vue";
const expect = chai.expect;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("FRow", () => {
  Vue.component("f-row", FRow);
  Vue.component("f-col", FCol);
  it("存在", () => expect(FRow).to.exist);

  // done 会等待异步测试代码执行完成后，再执行 done
  // 不加 done，则默认测试代码全为同步代码，执行完同步代码后，就立即销毁实例，关闭页面
  // 因此即使代码中有定时器，也不会被执行，除非传入 done
  it("接受 gutter 属性", done => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
      <f-row gutter="20">
        <f-col span="12"></f-col>
        <f-col span="12"></f-col>
      </f-row>
    `;

    const vm = new Vue({
      el: div,
    });

    setTimeout(() => {
      const row = vm.$el.querySelector(".row");
      expect(getComputedStyle(row).marginLeft).to.eq("-10px");
      expect(getComputedStyle(row).marginRight).to.eq("-10px");
      const cols = vm.$el.querySelectorAll(".col");
      expect(getComputedStyle(cols[0]).paddingRight).to.eq("10px");
      expect(getComputedStyle(cols[1]).paddingLeft).to.eq("10px");
      vm.$el.remove();
      vm.$destroy();
      done();
    }, 0);
  });

  it("接受 align 属性", done => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
      <f-row align="center">
        <f-col span="12">1</f-col>
      </f-row>
    `;

    const vm = new Vue({
      el: div,
    });

    setTimeout(() => {
      const col = vm.$el.querySelector(".col");
      expect(getComputedStyle(col).textAlign).to.eq("center");
      vm.$el.remove();
      vm.$destroy();
      done();
    }, 0);
  });
});
