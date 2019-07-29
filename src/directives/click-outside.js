const callbacks = [];
const onClickDocument = event => {
  callbacks.forEach(n => {
    if (n.el.contains(event.target)) return;
    n.callback();
  });
};
const removeClickOutsideListener = () => {
  document.removeEventListener('click', onClickDocument);
};
const clickOutside = {
  bind(el, binding, vnode, oldnode) {
    callbacks.push({ el, callback: binding.value });
  },
};

document.addEventListener('click', onClickDocument);

export default clickOutside;
export { removeClickOutsideListener };
