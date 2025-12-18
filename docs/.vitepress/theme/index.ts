import DefaultTheme from 'vitepress/theme'
import "./style/index.css"; //引入自定义的样式
import Layout from './Layout.vue'
import Confetti from "./components/Confetti.vue";
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import DataPanel from "./components/DataPanel.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue"
import ToolList from "./components/ToolList.vue"
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式
// import { useRoute } from 'vitepress';
// import { watch } from 'vue';

import { h } from 'vue' // h函数
// 组件
import backtotop from "./components/backtotop.vue";
import notice from "./components/notice.vue";
// import confetti from "./components/Confetti.vue"
import MouseClick from "./components/MouseClick.vue"
import MouseFollower from "./components/MouseFollower.vue"
import HomeUnderline from "./components/HomeUnderline.vue"
import Busuanzi from "./components/Busuanzi.vue" // 导入不蒜子组件

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用layout-top插槽,关闭公告只需关闭下面这一行代码
      // 'layout-top': () => h(notice),
      'doc-footer-before': () => h(backtotop),
      // 添加鼠标特效组件到布局中
      'layout-top': () => [h(MouseClick), h(MouseFollower)],
      // 添加不蒜子统计组件到H1标题下方
      'doc-after': () => h(Busuanzi)
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
    // 非SSR环境下配置路由进度条
    // @ts-ignore-error
    if (!import.meta.env.SSR) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => NProgress.start();
      router.onAfterRouteChange = () => {
        setTimeout(() => {
          NProgress.done();
        }, 100);
      };
    }
    app.component("Confetti", Confetti); //注册全局组件
    app.component("DataPanel", DataPanel);//注册全局组件
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('MouseClick', MouseClick)
    app.component('MouseFollower', MouseFollower)
    app.component('HomeUnderline', HomeUnderline) // 注册首页文字下划线组件
    app.component('ToolList', ToolList)
    app.component('Busuanzi', Busuanzi) // 注册不蒜子组件
    
    // 不蒜子统计功能增强实现
    if (inBrowser) {
      // 加载不蒜子脚本的函数
      const loadBusuanziScript = () => {
        return new Promise((resolve) => {
          // 检查是否已经存在busuanzi对象
          if (typeof busuanzi !== 'undefined') {
            resolve(true);
            return;
          }
          
          // 创建脚本元素
          const script = document.createElement('script');
          script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.js';
          script.async = true;
          script.charset = 'utf-8';
          script.crossOrigin = 'anonymous';
          
          script.onload = () => {
            resolve(true);
          };
          
          script.onerror = () => {
            console.warn('不蒜子统计脚本加载失败');
            resolve(false);
          };
          
          document.head.appendChild(script);
        });
      };
      
      // 获取统计数据的函数
      const fetchBusuanziStats = async () => {
        try {
          // 确保脚本已加载
          await loadBusuanziScript();
          
          // 延迟执行确保DOM已更新
          setTimeout(() => {
            if (typeof busuanzi !== 'undefined') {
              busuanzi.fetch();
            }
          }, 100);
        } catch (error) {
          console.warn('获取不蒜子统计数据时出错:', error);
        }
      };

      // 页面首次加载时初始化统计数据
      const initBusuanzi = () => {
        // 确保DOM已经加载完成
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            fetchBusuanziStats();
          });
        } else {
          // DOM已经加载完成
          fetchBusuanziStats();
        }
      };

      // 路由变化处理 - 确保每次路由变化都刷新统计数据
      const handleRouteChange = async () => {
        // 确保在浏览器环境中执行
        if (typeof window !== 'undefined') {
          await fetchBusuanziStats();
        }
      };

      // 保存原始的路由处理函数
      const originalOnAfterRouteChanged = router.onAfterRouteChanged;
      const originalOnBeforeRouteChange = router.onBeforeRouteChange;

      // 重写路由变化处理函数
      router.onBeforeRouteChange = (...args: any[]) => {
        // 执行原有的处理函数
        if (originalOnBeforeRouteChange) {
          originalOnBeforeRouteChange.apply(router, args);
        }
        
        // 开始进度条（如果已配置）
        if (!import.meta.env.SSR) {
          NProgress.start();
        }
      };

      router.onAfterRouteChange = (...args: any[]) => {
        // 执行原有的处理函数
        if (originalOnAfterRouteChanged) {
          originalOnAfterRouteChanged.apply(router, args);
        }
        
        // 路由变化后刷新不蒜子统计
        handleRouteChange().finally(() => {
          // 结束进度条（如果已配置）
          if (!import.meta.env.SSR) {
            setTimeout(() => {
              NProgress.done();
            }, 100);
          }
        });
      };

      // 初始化不蒜子统计
      initBusuanzi();
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