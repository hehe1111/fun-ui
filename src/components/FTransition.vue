<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
    appear
  >
    <slot />
  </transition>
</template>

<script>
import { oneOf } from '../assets/utils.js';

export default {
  name: 'FunUITransition',
  props: {
    duration: {
      type: [Number, String],
      default: 300,
    },
    direction: {
      type: String,
      default: 'vertical',
      validator(prop) {
        return oneOf(prop, ['vertical', 'horizontal']);
      },
    },
  },
  data() {
    return {
      oldOverflow: null,
      oldValue: null,
      property: this.direction === 'vertical' ? 'height' : 'width',
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transition = `all ${this.duration}ms linear`;
      this.$nextTick(() => {
        // use this.nextTick() to get the real height of el
        this.oldOverflow = window.getComputedStyle(el).overflow;
        this.oldValue = window.getComputedStyle(el)[this.property];
      });
    },
    enter(el, done) {
      this.$nextTick(() => {
        // set to hidden to avoid el overlaping on other element during transition
        el.style.overflow = 'hidden';
        el.style[this.property] = 0;
        el.getBoundingClientRect(); // force browser to render the newest style
        el.style[this.property] = this.oldValue;
        el.addEventListener('transitionend', () => done()); // wait for transition to finish
      });
    },
    afterEnter(el) {
      el.style[this.property] = 'auto';
      el.style.overflow = this.oldOverflow;
    },
    leave(el, done) {
      el.style.overflow = 'hidden';
      el.style[this.property] = this.oldValue;
      el.getBoundingClientRect();
      el.style[this.property] = 0;
      el.addEventListener('transitionend', () => done());
    },
    afterLeave(el) {
      el.style[this.property] = 'auto';
      el.style.overflow = this.oldOverflow;
    },
  },
};
</script>
