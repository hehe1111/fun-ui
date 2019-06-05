import Vue from "vue";
import FButton from "../src/FButton.vue";
const expect = chai.expect;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("FButton", () => {
  it("存在", () => {
    expect(FButton).to.exist;
    // expect(FButton).to.be.ok
  });

  it("可以通过设置 icon 来使用对应的图标", () => {
    // Vue.extend 创建子类
    let Constructor = Vue.extend(FButton);
    // new 创建子类实例
    let c = new Constructor({
      // 通过 propsData 传入 prop
      propsData: {
        icon: "loading",
      },
    }).$mount(); // 将实例挂载到内存里
    let icon = c.$el.querySelector("use").getAttribute("xlink:href");
    expect(icon).to.eq("#icon-loading");
    let classValue = c.$el.querySelector("svg").getAttribute("class");
    expect(classValue).to.eq("icon loading icon-left");
    // 测试通过就清除 c 实例，避免测试用例出现在页面中
    c.$el.remove();
    c.$destroy();
  });

  it('可以通过设置 iconPosition 来设置图标在按钮中的位置；右边的图标 order 为 "1"', () => {
    let div = document.createElement("div");
    document.body.appendChild(div);
    let Constructor = Vue.extend(FButton);
    let c = new Constructor({
      propsData: {
        icon: "setting",
        iconPosition: "right",
      },
    }).$mount(div); // 替代 div；元素必须出现在 DOM 中，才能通过 JS 获取到样式
    let icon = c.$el.querySelector("use").getAttribute("xlink:href");
    expect(icon).to.eq("#icon-setting");
    let classValue = c.$el.querySelector("svg").getAttribute("class");
    expect(classValue).to.eq("icon icon-right");
    // let order = window.getComputedStyle(c.$el.querySelector('svg')).getPropertyValue('order')
    let { order } = window.getComputedStyle(c.$el.querySelector("svg"));
    expect(typeof order).to.eq("string");
    expect(order).to.eq("1");
    div.remove(); // div 仍然存在，因此需要手动销毁
    c.$destroy();
  });

  it("点击按钮时触发 click 事件", () => {
    // mock
    let Constructor = Vue.extend(FButton);
    let c = new Constructor().$mount();
    // const spy = chai.spy(() => { console.log('spy 被执行了') })
    // c.$on('click', spy)
    const fake = sinon.fake();
    c.$on("click", fake);
    c.$el.click();
    expect(fake).to.have.been.called;
    c.$el.remove();
    c.$destroy();
  });
});
