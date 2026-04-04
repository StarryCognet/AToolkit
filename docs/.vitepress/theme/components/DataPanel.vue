<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 网站开始运行时间：2025年12月16日
const startTime = new Date('2025-12-16T00:00:00').getTime()
const runningTime = ref('0天0时0分0秒')
let timer: ReturnType<typeof setInterval> | null = null

function updateRunningTime() {
  const now = Date.now()
  const diff = now - startTime
  
  if (diff < 0) {
    runningTime.value = '即将上线'
    return
  }
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  const s = seconds % 60
  const m = minutes % 60
  const h = hours % 24
  
  runningTime.value = `${days}天${h}时${m}分${s}秒`
}

onMounted(() => {
  updateRunningTime()
  timer = setInterval(updateRunningTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="panel">
    <div class="container">
      <section class="grid">
        <div class="stat-card">
          <span class="label">本站总访问量</span>
          <span id="busuanzi_value_site_pv" class="value">0</span>
          <span class="unit">次</span>
        </div>
        <div class="stat-card">
          <span class="label">本站访客数</span>
          <span id="busuanzi_value_site_uv" class="value">0</span>
          <span class="unit">人</span>
        </div>
        <div class="stat-card">
          <span class="label">本页阅读量</span>
          <span id="busuanzi_value_page_pv" class="value">0</span>
          <span class="unit">次</span>
        </div>
        <div class="stat-card highlight">
          <span class="label">网站已运行</span>
          <span class="value time">{{ runningTime }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.panel {
  margin-top: 16px;
  margin-bottom: 16px;
}

.container {
  background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-alt));
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  min-height: 60px;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
}

.grid {
  font-weight: 500;
  justify-items: stretch;
  align-items: stretch;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  display: grid;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-elv);
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-card.highlight {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-elv));
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.value.time {
  font-size: 1rem;
  font-family: 'Courier New', monospace;
}

.unit {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: 4px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .container {
    padding: 12px;
  }

  .stat-card {
    padding: 12px 4px;
  }

  .label {
    font-size: 0.7rem;
  }

  .value {
    font-size: 1rem;
  }
  
  .value.time {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }

  .panel {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
</style>
