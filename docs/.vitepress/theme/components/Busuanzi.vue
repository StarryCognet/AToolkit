<template>
  <div class="busuanzi-container">
    <div class="busuanzi-stats" v-if="showStats">
      <span class="stat-item">
        <span class="stat-label">页面浏览量:</span>
        <span class="stat-value" id="busuanzi_value_page_pv">-</span>|

        <span class="stat-label">站点访客数:</span>
        <span class="stat-value" id="busuanzi_value_site_uv">-</span>|

        <span class="stat-label">站点总访问量:</span>
        <span class="stat-value" id="busuanzi_value_site_pv">-</span>
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

onMounted(() => {
  // 确保只在浏览器环境中执行
  if (typeof window !== "undefined") {
    // 延迟一小段时间再显示，确保更好的视觉效果
    setTimeout(() => {
      showStats.value = true;
    }, 300);

    // 如果不蒜子脚本尚未加载，则动态加载本地版本
    if (typeof busuanzi === "undefined") {
      const script = document.createElement("script");
      script.src = "/.vitepress/theme/utils/busuanzi.min.js";
      script.async = true;
      document.head.appendChild(script);

      // 脚本加载完成后调用fetch
      script.onload = () => {
        busuanzi.fetch();
      };
    } else {
      // 如果已经加载，直接调用fetch
      busuanzi.fetch();
    }
  }
});
</script>

<style scoped>
.busuanzi-container {
  margin: 1rem 0;
  padding: 0.5rem 0;
}

.busuanzi-stats {
  display: flex;
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
  /* gap: 1.5rem; */
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  white-space: nowrap;
}

.stat-value {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

/* 占位符样式 - 模糊动态彩虹效果 */
.busuanzi-placeholder {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.placeholder-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.placeholder-label,
.placeholder-value {
  border-radius: 4px;
  height: 16px;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 10%, #a1c4fd 20%, #c2e9fb 30%, #d4fc79 40%, #96e6a1 50%, #84fab0 60%, #8fd3f4 70%, #a6c0fe 80%, #f6d365 90%, #fda085 100%);
  background-size: 200% 100%;
  animation: gradientShift 2s ease infinite, loadingPulse 1.5s ease infinite;
  opacity: 0.7;
}

.placeholder-label {
  width: 70px;
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
    gap: 0.75rem;
  }

  .stat-item,
  .placeholder-item {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
