<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FunUITransition',
  props: {
    duration: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      elHeight: null,
    };
  },
  methods: {
    beforeEnter(el) {
      // el.style.overflow = 'hidden'; // 避免过渡过程中出现元素重叠现象
      el.style.opacity = 0;
      el.style.transition = `all ${this.duration}ms linear`;
    },
    enter(el, done) {
      setTimeout(() => {
        this.elHeight = el.getBoundingClientRect().height;
        el.style.height = 0;
        el.getBoundingClientRect(); // 强制浏览器渲染上一次操作的结果
        el.style.height = `${this.elHeight}px`;
        el.style.opacity = 1;
        // 等待过渡完成
        el.addEventListener('transitionend', () => done());
      });
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    leave(el, done) {
      el.style.height = `${this.elHeight}px`;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.style.opacity = 0;
      el.addEventListener('transitionend', () => done());
    },
    afterLeave(el) {
      el.style.height = 'auto';
    },
  },
};
</script>
