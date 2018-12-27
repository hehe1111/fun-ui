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
