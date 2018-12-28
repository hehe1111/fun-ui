import Vue from 'vue'
import FButton from './FButton.vue'
import FIcon from './FIcon.vue'
import FButtonGroup from './FButtonGroup.vue'
import FInput from './FInput.vue'

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
    FInput,
  },
})
