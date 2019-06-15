import FToast from './FToast.vue';

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (message, toastOptions) {
      const Constructor = Vue.extend(FToast);
      const vm = new Constructor({
        propsData: {
          closeButton: toastOptions.closeButton,
        },
      });
      vm.$slots.default = message;
      vm.$mount();
      document.body.appendChild(vm.$el);
    };
  },
};
