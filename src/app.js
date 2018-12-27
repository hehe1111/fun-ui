import Vue from 'vue'
import FButton from './FButton.vue'
import FIcon from './Icon.vue'
import FButtonGroup from './FButtonGroup.vue'
import chai from 'chai'
import spies from 'chai-spies'
const expect = chai.expect
chai.use(spies)

// 全局注册
// Vue.component('FButton', FButton)
// Vue.component('FIcon', FIcon)
// Vue.component('FButtonGroup', FButtonGroup)

new Vue({
  el: '#app',
  // 局部注册
  components: {
    FButton,
    FIcon,
    FButtonGroup,
  },
  methods: {
    log1 () {
      console.log(1)
    },
  },
})

// 单元测试
{
  // Vue.extend 创建子类
  let Component = Vue.extend(FButton)
  // new 创建子类实例
  let c = new Component({
    propsData: {
      icon: 'loading'
    },
  }).$mount()
  let icon = c.$el.querySelector('use').getAttribute('xlink:href')
  expect(icon).to.eq('#icon-loading')
  let classValue = c.$el.querySelector('svg').getAttribute('class')
  expect(classValue).to.eq('icon loading icon-left')
  // 测试通过就清除 c 实例，避免测试用例出现在页面中
  c.$el.remove()
  c.$destroy()
}
{
  let div = document.createElement('div')
  document.body.appendChild(div)
  let Component = Vue.extend(FButton)
  let c = new Component({
    propsData: {
      icon: 'setting',
      iconPosition: 'right'
    },
  }).$mount(div) // 替代 div；元素必须出现在 DOM 中，才能通过 JS 获取到样式
  let icon = c.$el.querySelector('use').getAttribute('xlink:href')
  expect(icon).to.eq('#icon-setting')
  let classValue = c.$el.querySelector('svg').getAttribute('class')
  expect(classValue).to.eq('icon icon-right')
  // let order = window.getComputedStyle(c.$el.querySelector('svg')).getPropertyValue('order')
  let {order} = window.getComputedStyle(c.$el.querySelector('svg'))
  expect(typeof order).to.eq('string')
  expect(order).to.eq('1')
  c.$el.remove()
  c.$destroy()
}
{
  // mock
  let Component = Vue.extend(FButton)
  let c = new Component().$mount()
  const spy = chai.spy(() => { console.log('spy 被执行了') })
  c.$on('click', spy)
  c.$el.click()
  expect(spy).to.have.been.called()
  c.$el.remove()
  c.$destroy()
}
