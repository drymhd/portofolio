<script setup>
import { ref, watch } from 'vue'
import { Monitor, Smartphone, Terminal, Image } from '@lucide/vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Project Showcase'
  },
  category: {
    type: String,
    default: 'Web'
  }
})

const isError = ref(!props.src)
const isLoading = ref(!!props.src)

// Watch for src changes (in case it is updated in dashboard)
watch(() => props.src, (newSrc) => {
  if (newSrc) {
    isError.value = false
    isLoading.value = true
  } else {
    isError.value = true
    isLoading.value = false
  }
})

const handleLoad = () => {
  isLoading.value = false
}

const handleError = () => {
  isError.value = true
  isLoading.value = false
}
</script>

<template>
  <div class="safe-image-container">
    <!-- Image state -->
    <img 
      v-if="!isError && src" 
      :src="src" 
      :alt="alt" 
      @load="handleLoad" 
      @error="handleError"
      :class="['project-image-tag', { loaded: !isLoading }]"
    />

    <!-- Skeleton Shimmer Loader -->
    <div v-if="isLoading && src" class="shimmer-skeleton"></div>

    <!-- Fallback Graphic Placeholder -->
    <div v-if="isError || !src" class="fallback-placeholder">
      <div class="glow-layer"></div>
      
      <!-- Dynamic Placeholder Icon -->
      <div class="placeholder-icon-wrapper">
        <Monitor v-if="category === 'Web'" :size="40" class="placeholder-icon" />
        <Smartphone v-else-if="category === 'Mobile'" :size="40" class="placeholder-icon" />
        <Terminal v-else-if="category === 'API'" :size="40" class="placeholder-icon" />
        <Image v-else :size="40" class="placeholder-icon" />
      </div>

      <span class="fallback-category">{{ category }} System</span>
      <span class="fallback-tip">No preview available</span>
    </div>
  </div>
</template>

<style scoped>
.safe-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0d111c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image-tag {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-image-tag.loaded {
  opacity: 1;
}

/* Skeleton shimmer */
.shimmer-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    #0d111c 25%,
    #1b233a 50%,
    #0d111c 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Fallback Design */
.fallback-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 24px;
}

.glow-layer {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(181, 255, 43, 0.08) 0%, transparent 70%);
  filter: blur(15px);
  pointer-events: none;
}

.placeholder-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.fallback-placeholder:hover .placeholder-icon-wrapper {
  border-color: rgba(181, 255, 43, 0.3);
  background: rgba(181, 255, 43, 0.05);
}

.placeholder-icon {
  color: var(--text-secondary);
  transition: var(--transition);
}

.fallback-placeholder:hover .placeholder-icon {
  color: var(--accent);
  filter: drop-shadow(0 0 5px rgba(181, 255, 43, 0.4));
}

.fallback-category {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 15px;
  color: #fff;
  letter-spacing: 0.5px;
}

.fallback-tip {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
