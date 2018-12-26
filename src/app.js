import Vue from 'vue'
import FButton from './FButton.vue'
import FIcon from './Icon.vue'

// 全局注册
// Vue.component('FButton', FButton)
// Vue.component('FIcon', FIcon)

new Vue({
  el: '#app',
  // 局部注册
  components: {
    FButton,
    FIcon,
  }
})
