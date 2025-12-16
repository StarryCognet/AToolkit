import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AToolkit",
  description: "AToolkit",
  //fav图标
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '目录', link: '/catalogue/' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: '运行时 API 示例', link: '/api-examples' }
        ]
      },
      {
        text: '目录',
        items: [
          { text: 'Markdown 示例', link: '/catalogue/tools' },
          { text: 'Electron入门笔记', link: '/catalogue/Electron入门笔记' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/StarryCognet/AToolkit' }
    ]
  },
  markdown: {
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      }
    }
  }
})