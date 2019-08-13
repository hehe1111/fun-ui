<template>
  <div class="code-box-container">
    <f-transition :duration="400">
      <div class="code-box" v-show="isCodeVisible" v-highlight>
        <slot />
      </div>
    </f-transition>

    <div class="code-box-switch" @click="toggle">{{ isCodeVisible ? '隐藏' : '显示' }}代码</div>
  </div>
</template>


<script>
import FTransition from '../../../src/components/FTransition.vue';
// https://github.com/highlightjs/highlight.js/#commonjs
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

const highlightFunc = el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => hljs.highlightBlock(block));
};

export default {
  name: 'CodeBox',
  components: { FTransition },
  directives: { highlight: highlightFunc },
  data() {
    return {
      isCodeVisible: false,
    };
  },
  props: {
    showCode: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.isCodeVisible = this.showCode;
  },
  methods: {
    toggle() {
      this.isCodeVisible = !this.isCodeVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.code-box-container {
  margin: 1em 0;
  border: 1px solid $blue;
  border-radius: 6px;

  > .code-box {
    border-bottom: 1px solid $blue;
  }

  > .code-box-switch {
    @extend .flex-center;
    padding: 0.5em 0;
    color: $blue;
    cursor: pointer;
    transition: all $duration ease-in-out;
    user-select: none;
    position: relative;

    &:hover {
      color: #fff;
      background-color: $blue;
    }
  }
}
</style>
