import DefaultTheme from 'vitepress/theme'
import "./style/index.css"; //引入自定义的样式
import Layout from './Layout.vue'
import Confetti from "./components/Confetti.vue";
import { inBrowser } from "vitepress";
import busuanzi from "busuanzi.pure.js";
import DataPanel from "./components/DataPanel.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue"
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { watch } from 'vue';

import { h } from 'vue' // h函数
// 组件
import backtotop from "./components/backtotop.vue";
import notice from "./components/notice.vue";
// import confetti from "./components/Confetti.vue"
// import MouseClick from "./components/MouseClick.vue"
// import MouseFollower from "./components/MouseFollower.vue"

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用layout-top插槽,关闭公告只需关闭下面这一行代码
      // 'layout-top': () => h(notice),
      'doc-footer-before': () => h(backtotop),
    })
  },
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
    app.component("Confetti", Confetti); //注册全局组件
    app.component("DataPanel", DataPanel);//注册全局组件
    app.component('ArticleMetadata', ArticleMetadata)
    // app.component('MouseClick', MouseClick)
    // app.component('MouseFollower', MouseFollower)
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    // giscus配置
    giscusTalk({
      repo: 'StarryCognet/AToolkit', //仓库
      repoId: 'R_kgDOQpevAQ', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOQpevAc4Cz3lm', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
    },
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  }
}


function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}