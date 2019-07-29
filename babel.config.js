module.exports = {
  presets: ['@vue/app'],
  env: {
    // https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-karma.html#coverage
    test: {
      plugins: ['istanbul'],
    },
  },
};
