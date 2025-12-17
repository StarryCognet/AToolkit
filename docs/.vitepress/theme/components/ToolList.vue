<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Tool {
  name: string
  description: string
  url?: string
}

const props = defineProps<{
  tools: Tool[]
}>()

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const sortedTools = computed(() => {
  return [...props.tools].sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div v-if="isMounted" class="tool-list">
    <div v-for="(tool, index) in sortedTools" :key="index" class="tool-item">
      <h3>
        <a v-if="tool.url" :href="tool.url" target="_blank">{{ tool.name }}</a>
        <span v-else>{{ tool.name }}</span>
      </h3>
      <p>{{ tool.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.tool-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.tool-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.tool-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.tool-item h3 {
  margin-top: 0;
  font-size: 1.1rem;
}

.tool-item h3 a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.tool-item h3 a:hover {
  text-decoration: underline;
}

.tool-item p {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .tool-list {
    grid-template-columns: 1fr;
  }
}
</style>