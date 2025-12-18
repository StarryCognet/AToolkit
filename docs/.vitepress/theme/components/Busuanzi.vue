<template>
  <div class="busuanzi-container">
    <div class="busuanzi-stats" v-if="showStats">
      <span class="stat-item">
        <span class="stat-label">页面浏览量:</span>
        <span class="stat-value" id="busuanzi_value_page_pv"></span>
      </span>
      <span class="stat-item">
        <span class="stat-label">站点访客数:</span>
        <span class="stat-value" id="busuanzi_value_site_uv"></span>
      </span>
      <span class="stat-item">
        <span class="stat-label">站点总访问量:</span>
        <span class="stat-value" id="busuanzi_value_site_pv"></span>
      </span>
    </div>
    <!-- 加载时显示的模糊动态彩虹占位符 -->
    <div class="busuanzi-placeholder" v-else>
      <div class="placeholder-item" v-for="i in 3" :key="i">
        <div class="placeholder-label"></div>
        <div class="placeholder-value"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showStats = ref(false);

// 确保在浏览器环境中才执行
if (typeof window !== "undefined") {
  onMounted(() => {
    // 延迟一小段时间再显示，确保更好的视觉效果
    setTimeout(() => {
      showStats.value = true;
    }, 500);

    // 检查是否已经存在不蒜子对象
    if (typeof busuanzi !== "undefined") {
      // 如果已经加载，直接调用fetch
      busuanzi.fetch();
    } else {
      // 动态加载不蒜子脚本
      const loadBusuanziScript = () => {
        // 首先尝试加载本地版本
        const script = document.createElement("script");
        script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.js";
        script.async = true;
        script.charset = "utf-8";
        script.crossOrigin = "anonymous";
        
        script.onload = () => {
          // 脚本加载完成后延迟调用fetch
          setTimeout(() => {
            if (typeof busuanzi !== "undefined") {
              busuanzi.fetch();
            }
          }, 100);
        };
        
        script.onerror = () => {
          // CDN加载失败时尝试备用方案
          console.warn("不蒜子CDN加载失败，尝试备用方案");
          // 可以在这里添加备用统计方案
        };
        
        document.head.appendChild(script);
      };

      // 执行脚本加载
      loadBusuanziScript();
    }
  });
}
</script>

<style scoped>
.busuanzi-container {
  margin: 16px 0 24px 0;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.busuanzi-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  white-space: nowrap;
}

.stat-value {
  font-weight: bold;
  color: var(--vp-c-text-1);
  min-width: 40px;
  text-align: center;
}

/* 占位符样式 - 模糊动态彩虹效果 */
.busuanzi-placeholder {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.placeholder-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.placeholder-label,
.placeholder-value {
  border-radius: 4px;
  height: 16px;
  background: linear-gradient(90deg, 
    #ff9a9e 0%, #fad0c4 10%, 
    #a1c4fd 20%, #c2e9fb 30%, 
    #d4fc79 40%, #96e6a1 50%, 
    #84fab0 60%, #8fd3f4 70%, 
    #a6c0fe 80%, #f6d365 90%, 
    #fda085 100%);
  background-size: 200% 100%;
  animation: gradientShift 2s ease infinite, loadingPulse 1.5s ease infinite;
  opacity: 0.7;
}

.placeholder-label {
  width: 80px;
}

.placeholder-value {
  width: 40px;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes loadingPulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .busuanzi-stats,
  .busuanzi-placeholder {
    flex-direction: column;
    gap: 12px;
  }
  
  .stat-item,
  .placeholder-item {
    justify-content: space-between;
    width: 100%;
  }
}
</style>