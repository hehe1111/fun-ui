import FToast from '../components/FToast.vue';

function createToast({ Vue, message, propsData, onClose }) {
  const Constructor = Vue.extend(FToast);
  const toast = new Constructor({
    propsData: { message, ...propsData },
  });
  // toast.$slots.default = message;
  // 用 slot 实现，则在测试时，会因为循环引用而报错，因此改用 prop
  // Error in render: "TypeError: Converting circular structure to JSON"
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
