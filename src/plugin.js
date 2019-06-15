import FToast from './FToast.vue';

export default {
  install(Vue, options) {
    // eslint-disable-next-line prettier/prettier
    Vue.prototype.$toast = function (message, toastOptions) {
      const Constructor = Vue.extend(FToast);
      const vm = new Constructor({
        propsData: toastOptions,
      });
      vm.$slots.default = message;
      vm.$mount();
      document.body.appendChild(vm.$el);
    };
  },
};
