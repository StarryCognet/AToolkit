import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AToolkit",
  description: "AToolkit",
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})