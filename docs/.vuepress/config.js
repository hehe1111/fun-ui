module.exports = {
  // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上
  title: 'Fun UI',

  // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  description: '一个基于 Vue 2.0 的 UI 组件库',

  // 网站部署到 https://hehe1111.github.io/fun-ui/
  base: '/fun-ui/',

  // 配置默认主题
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '文档', link: '/introduction' }, // 前缀 https://hehe1111.github.io/fun-ui/
      { text: 'GitHub', link: 'https://github.com/hehe1111/fun-ui' },
    ],

    // 侧边栏配置
    // 可以省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
    // 如果你想要显示地指定链接的文字，使用一个格式为 [link, text] 的数组
    // sidebar: ['/', '/install/', ['/components/', '组件']],

    // 嵌套的标题链接
    // 0 将会禁用标题（headers）链接
    // 默认的深度是 1，它将提取到 h2 的标题
    // 最大的深度为 2，它将同时提取 h2 和 h3 标题
    sidebarDepth: 2,

    // 侧边栏分组
    // 侧边栏的每个子组默认是可折叠的
    // 可以设置 collapsable: false 来让一个组永远都是展开状态。
    sidebar: [
      // / 基于 /docs/，而非 /docs/.vuepress/
      '/introduction',
      '/install',
      '/get-started',
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/button',
          '/components/carousel',
          '/components/cascader',
          '/components/collapse',
          '/components/date-picker',
          '/components/grid',
          '/components/icon',
          '/components/input',
          '/components/layout',
          '/components/nav',
          '/components/pagination',
          '/components/popover',
          '/components/scrollable-picker',
          '/components/tab',
          '/components/table',
          '/components/toast',
          '/components/upload',
        ],
      },
    ],
    // 最后更新时间 基于 git
    lastUpdated: 'Last Updated',
  },
};
