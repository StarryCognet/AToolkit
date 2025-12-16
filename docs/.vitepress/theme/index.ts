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
// import confetti from "./components/Confetti.vue"
// import MouseClick from "./components/MouseClick.vue"
// import MouseFollower from "./components/MouseFollower.vue"

export default {
  ...DefaultTheme,
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
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