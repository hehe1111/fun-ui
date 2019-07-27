<template>
  <div class="code-box-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="code-box" v-show="isCodeVisible" v-highlight>
        <slot />
      </div>
    </transition>

    <div class="code-box-switch" @click="toggle">{{ isCodeVisible ? '隐藏' : '显示' }}代码</div>
  </div>
</template>


<script>
import Vue from 'vue';
// https://github.com/highlightjs/highlight.js/#commonjs
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

const highlightFunc = el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => hljs.highlightBlock(block));
};

export default {
  name: 'CodeBox',
  directives: { highlight: highlightFunc },
  data() {
    return {
      isCodeVisible: false,
      codeBoxHeight: null,
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
    // 过渡 JS 钩子函数
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      this.codeBoxHeight = el.getBoundingClientRect().height;
      el.style.height = 0;
      el.getBoundingClientRect(); // 强制浏览器渲染上一次操作的结果
      el.style.height = `${this.codeBoxHeight}px`;
      el.style.opacity = 1;
      // 等待过渡完成
      el.addEventListener('transitionend', () => done());
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    leave(el, done) {
      el.style.height = `${this.codeBoxHeight}px`;
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

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.code-box-container {
  margin: 1em 0;
  border: 1px solid $blue;
  border-radius: 6px;

  > .code-box {
    transition: all $duration linear;
    overflow: hidden; // 避免动画过程中出现元素的重叠现象
    border-bottom: 1px solid $blue;
  }

  > .code-box-switch {
    @extend .flex-center;
    padding: 0.5em 0;
    color: $blue;
    cursor: pointer;
    transition: all $duration ease-in-out;
    user-select: none;
    // vuepress 默认主题的 h1 至 h6 均有 padding-top: 4.6rem;
    // 后面的标题元素的 padding-top 太大以至于覆盖到了前面的 HTML 元素上
    // 导致点击前面的元素时，实际上是点击在了后面标题元素的 padding-top 上
    // 暂时的快速解决方法：让前面的元素的 z-index 高于后面的标题
    position: relative;
    z-index: 1;

    &:hover {
      color: #fff;
      background-color: $blue;
    }
  }
}
</style>
