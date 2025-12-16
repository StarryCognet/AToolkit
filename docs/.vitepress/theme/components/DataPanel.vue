<script setup lang="ts"></script>

<template>
  <div class="panel">
    <div class="container">
      <!-- 不蒜子统计图标代码 Start -->
      <a href="https://www.busuanzi.cc/count.php?search=atoolkit.starrymiku.com" title="不蒜子统计" target="_blank">
        <img style="width: 85px; height: 25px" src="https://www.busuanzi.cc/static/images/bsz-tongji.png" />
      </a>
      <!-- 不蒜子统计图标代码 End -->
      <section class="grid" style="padding-top: 20px">
        <div class="stat-card">
          <span class="label">今日总访问量</span>
          <span id="busuanzi_value_today_pv" class="value">0</span>
          <span class="unit">次</span>
        </div>
        <div class="stat-card">
          <span class="label">今日总访客数</span>
          <span id="busuanzi_value_today_uv" class="value">0</span>
          <span class="unit">人</span>
        </div>
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
          <span class="label">本页总阅读量</span>
          <span id="busuanzi_value_page_pv" class="value">0</span>
          <span class="unit">次</span>
        </div>
        <div class="stat-card">
          <span class="label">本页总访客数</span>
          <span id="busuanzi_value_page_uv" class="value">0</span>
          <span class="unit">人</span>
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
  grid-template-columns: repeat(3, 1fr);
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
  /* background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-elv)); */
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

.unit {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: 4px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .container {
    padding: 12px;
  }

  .stat-card {
    padding: 12px 4px;
  }

  .label {
    font-size: 0.75rem;
  }

  .value {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .panel {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
</style>
