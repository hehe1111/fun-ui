import FToast from './FToast.vue';

function createToast({ Vue, message, propsData, onClose }) {
  const Constructor = Vue.extend(FToast);
  const toast = new Constructor({ propsData });
  toast.$slots.default = message;
  toast.$mount();
  toast.$on('close', onClose);
  document.body.appendChild(toast.$el);
  return toast;
}

let currentToast;

export default {
  install(Vue, options) {
    // eslint-disable-next-line prettier/prettier
    Vue.prototype.$toast = function (message, toastOptions) {
      if (currentToast) currentToast.close();
      currentToast = createToast({
        Vue,
        message,
        propsData: toastOptions,
        onClose: () => {
          currentToast = null;
        },
      });
    };
  },
};
