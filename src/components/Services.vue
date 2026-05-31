<script setup>
import { ref } from 'vue'
import { Code, Smartphone, Cpu, Activity } from '@lucide/vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeIndex = ref(1) // Default highlight on the second service (Mobile App Dev / similar)

// Map icon names to Lucide icon components
const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'Code': return Code
    case 'Smartphone': return Smartphone
    case 'Cpu': return Cpu
    case 'Activity': return Activity
    default: return Code
  }
}
</script>

<template>
  <section id="services" class="services-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrapper">
        <span class="subtitle">Offerings</span>
        <h2 class="section-title">My <span class="text-accent glow-text">Services</span></h2>
        <div class="title-divider"></div>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div 
          v-for="(service, idx) in data.services" 
          :key="idx" 
          :class="['service-card', 'glass-card', { 'glow-border-highlight': activeIndex === idx }]"
          :style="{ animationDelay: `${idx * 0.06}s` }"
          @mouseenter="activeIndex = idx"
        >
          <!-- Neon Corner Glow -->
          <div class="corner-glow"></div>
          
          <div class="service-icon-wrapper">
            <!-- Dynamic Component for Lucide Icons -->
            <component :is="getIconComponent(service.icon)" :size="28" class="service-icon" />
          </div>

          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>

          <div class="service-footer">
            <span class="learn-more">Details</span>
            <div class="arrow-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  background: var(--bg-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section Header */
.section-title-wrapper {
  text-align: center;
  margin-bottom: 60px;
}

.subtitle {
  text-transform: uppercase;
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

.section-title {
  font-size: 42px;
  color: #fff;
  margin-top: 8px;
  margin-bottom: 12px;
}

.title-divider {
  width: 60px;
  height: 3px;
  background: var(--accent);
  margin: 0 auto;
  border-radius: 999px;
  box-shadow: var(--shadow-neon);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.service-card {
  position: relative;
  padding: 36px 28px;
  border: 1px solid var(--border-glass);
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              border-color 0.3s ease, 
              box-shadow 0.3s ease, 
              background 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
}

/* Custom glow corner */
.corner-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at top right, rgba(181, 255, 43, 0.15), transparent 70%);
  opacity: 0;
  transition: var(--transition);
}

.service-card:hover .corner-glow,
.service-card.glow-border-highlight .corner-glow {
  opacity: 1;
}

.service-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: var(--transition);
}

.service-icon {
  color: var(--text-secondary);
  transition: var(--transition);
}

.service-card:hover .service-icon-wrapper,
.service-card.glow-border-highlight .service-icon-wrapper {
  background: rgba(181, 255, 43, 0.1);
  border-color: rgba(181, 255, 43, 0.2);
}

.service-card:hover .service-icon,
.service-card.glow-border-highlight .service-icon {
  color: var(--accent);
  filter: drop-shadow(0 0 5px rgba(181, 255, 43, 0.5));
}

.service-title {
  font-size: 20px;
  color: #fff;
  margin-bottom: 14px;
  font-weight: 600;
}

.service-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 24px;
  flex-grow: 1;
}

.service-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.learn-more {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  transition: var(--transition);
}

.arrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: var(--transition);
}

.service-card:hover .learn-more,
.service-card.glow-border-highlight .learn-more {
  color: var(--accent);
}

.service-card:hover .arrow-dot,
.service-card.glow-border-highlight .arrow-dot {
  background: var(--accent);
  box-shadow: var(--shadow-neon-strong);
  transform: scale(1.3);
}

/* Responsive */
@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    padding: 30px 24px;
  }
}
</style>
