<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['complete'])

const progress = ref(0)
const statusText = ref('Loading profile database...')
const isCompleted = ref(false)
const triggerShockwave = ref(false)

const statuses = [
  { val: 20, text: 'Compiling credentials...' },
  { val: 50, text: 'Configuring custom modules...' },
  { val: 80, text: 'Polishing user interface...' },
  { val: 100, text: 'Welcome!' }
]

onMounted(() => {
  let step = 0
  const interval = setInterval(() => {
    progress.value += 1
    
    // Update status text based on progress
    const matchedStatus = statuses.find(s => progress.value <= s.val)
    if (matchedStatus && statusText.value !== matchedStatus.text) {
      statusText.value = matchedStatus.text
    }

    if (progress.value >= 100) {
      clearInterval(interval)
      // Trigger completion animations
      triggerShockwave.value = true
      
      setTimeout(() => {
        isCompleted.value = true
        setTimeout(() => {
          emit('complete')
        }, 600) // Delay to let slide-up finish
      }, 500) // Delay to show welcome state & shockwave
    }
  }, 25) // Total loading time approx 2.5 seconds
})
</script>

<template>
  <transition name="slide-up">
    <div v-if="!isCompleted" class="splash-overlay">
      <!-- Ambient light sweeps in background -->
      <div class="radial-glow-ambient"></div>
      
      <div class="splash-content">
        <!-- Monogram Logo Container -->
        <div class="logo-outer">
          <!-- Concentric rotating decorative loaders -->
          <div class="spinner-ring ring-fast"></div>
          <div class="spinner-ring ring-slow"></div>
          
          <!-- Shockwave Ripple -->
          <div :class="['shockwave-circle', { active: triggerShockwave }]"></div>

          <div class="logo-inner">
            <span class="monogram">DM</span>
          </div>
        </div>

        <!-- Details -->
        <div class="splash-text-area">
          <h1 class="splash-title">Dary<span>Mahdi</span></h1>
          <p class="splash-subtitle">Portfolio & Control Panel</p>
        </div>

        <!-- Progress Widget -->
        <div class="progress-container">
          <div class="progress-info">
            <span class="status-lbl">{{ statusText }}</span>
            <span class="percent-lbl">{{ progress }}%</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.splash-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #040508;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.radial-glow-ambient {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at center, rgba(181, 255, 43, 0.04), transparent 70%);
  filter: blur(50px);
  pointer-events: none;
  animation: pulse-glow 3s ease-in-out infinite;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 10;
  max-width: 320px;
  width: 100%;
}

/* Logo and Rotating Rings */
.logo-outer {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-inner {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #0c0f17;
  border: 1px solid rgba(181, 255, 43, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.monogram {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 28px;
  color: var(--accent);
  text-shadow: 0 0 12px rgba(181, 255, 43, 0.5);
}

.spinner-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}

.ring-fast {
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-top-color: var(--accent);
  border-bottom-color: var(--accent);
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  opacity: 0.8;
}

.ring-slow {
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-left-color: rgba(255, 255, 255, 0.1);
  border-right-color: rgba(255, 255, 255, 0.1);
  animation: spin 3s linear infinite reverse;
}

/* Shockwave Ripple Effect */
.shockwave-circle {
  position: absolute;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid var(--accent);
  box-shadow: 0 0 30px var(--accent);
  opacity: 0;
  z-index: 2;
  transform: scale(1);
  pointer-events: none;
}

.shockwave-circle.active {
  animation: ripple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
}

@keyframes ripple {
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(2.8);
    opacity: 0;
    border-width: 1px;
    filter: blur(2px);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Typography */
.splash-text-area {
  text-align: center;
}

.splash-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 26px;
  letter-spacing: -0.5px;
  color: #fff;
  margin-bottom: 4px;
}

.splash-title span {
  color: var(--accent);
}

.splash-subtitle {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  font-weight: 600;
}

/* Progress bar styling */
.progress-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.status-lbl {
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.percent-lbl {
  color: var(--accent);
}

.progress-bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  box-shadow: 0 0 10px rgba(181, 255, 43, 0.5);
  border-radius: 99px;
  transition: width 0.05s linear;
}

/* Slide Up Transition */
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  filter: blur(10px);
}
</style>
