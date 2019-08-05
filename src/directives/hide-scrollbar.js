import { hasScrollbar } from '../assets/utils.js';

const _hasParentElement = el => {
  if (!el.parentElement) {
    throw new Error('binding element should be wrapped up by a parent element');
  }
  return true;
};

export default {
  inserted: (el, binding, vnode, oldnode) => {
    if (!_hasParentElement(el)) return;
    el.style.overflow = 'auto';
    binding.value = binding.value || 'vertical';
    if (hasScrollbar(el, binding.value)) {
      el.parentElement.style.overflow = 'hidden';
      binding.value === 'vertical' && (el.style.marginRight = '-17px');
      binding.value === 'horizontal' && (el.style.marginBottom = '-17px');
    }
  },
};
