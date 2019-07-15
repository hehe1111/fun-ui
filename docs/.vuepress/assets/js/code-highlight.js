import Vue from 'vue';
// https://github.com/highlightjs/highlight.js/#commonjs
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

// eslint-disable-next-line prettier/prettier
Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

const removeNSpace = (code, spaceNumber = 8) => {
  const rule = [' ', '{', spaceNumber, '}'].join('');
  const pattern = new RegExp(rule, 'g');
  return code.replace(pattern, '').trim();
};

export default removeNSpace;
