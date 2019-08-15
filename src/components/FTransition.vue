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
      type: [Number, String],
      default: 300,
    },
  },
  data() {
    return {
      oldOverflow: null,
      oldHeight: null,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transition = `all ${this.duration}ms linear`;
      this.$nextTick(() => {
        // use this.nextTick() to get the real height of el
        this.oldOverflow = window.getComputedStyle(el).overflow;
        this.oldHeight = window.getComputedStyle(el).height;
      });
    },
    enter(el, done) {
      this.$nextTick(() => {
        // set to hidden to avoid el overlaping on other element during transition
        el.style.overflow = 'hidden';
        el.style.height = 0;
        el.getBoundingClientRect(); // force browser to render the newest style
        el.style.height = this.oldHeight;
        el.addEventListener('transitionend', () => done()); // wait for transition to finish
      });
    },
    afterEnter(el) {
      el.style.height = 'auto';
      el.style.overflow = this.oldOverflow;
    },
    leave(el, done) {
      el.style.overflow = 'hidden';
      el.style.height = this.oldHeight;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.addEventListener('transitionend', () => done());
    },
    afterLeave(el) {
      el.style.height = 'auto';
      el.style.overflow = this.oldOverflow;
    },
  },
};
</script>
