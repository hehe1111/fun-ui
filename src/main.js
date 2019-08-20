import Vue from 'vue';
import App from './App.vue';
import funUI from './entry.js';
Vue.use(funUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
