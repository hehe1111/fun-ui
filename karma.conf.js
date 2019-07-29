// https://vue-test-utils.vuejs.org/zh/guides/testing-single-file-components-with-karma.html
// https://cli.vuejs.org/zh/guide/webpack.html#以一个文件的方式使用解析好的配置

var webpackConfig = require('@vue/cli-service/webpack.config.js');

// eslint-disable-next-line prettier/prettier
module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: ['tests/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
    },

    browsers: ['ChromeHeadless'],
  });
};
