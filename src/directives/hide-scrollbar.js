export default {
  inserted: (el, binding, vnode, oldnode) => {
    if (!el.parentElement) {
      throw new Error(
        'binding element should be wrapped up by a parent element'
      );
    }
    el.style.overflow = 'auto';
    binding.value = binding.value || 'vertical';
    let property;
    binding.value === 'vertical' && (property = 'Width');
    binding.value === 'horizontal' && (property = 'Height');
    if (
      el[`offset${property}`] -
        el[`client${property}`] -
        window.parseInt(window.getComputedStyle(el).borderLeftWidth) * 2 >=
      17
    ) {
      el.parentElement.style.overflow = 'hidden';
      binding.value === 'vertical' && (el.style.marginRight = '-17px');
      binding.value === 'horizontal' && (el.style.marginBottom = '-17px');
    }
  },
};
