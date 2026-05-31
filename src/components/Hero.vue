<script setup>
import { ArrowRight, Download, Mail } from '@lucide/vue'
import { t, val } from '../i18n.js'
const avatarUrl = '/avatar.png'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const handleContactClick = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleDownloadCV = () => {
  window.print()
}

const getStatLabel = (label) => {
  if (label.includes('Experience')) return t('statExp')
  if (label.includes('Projects')) return t('statProj')
  if (label.includes('Stacks')) return t('statTech')
  if (label.includes('Certifications')) return t('statCert')
  return label
}
</script>

<template>
  <section id="home" class="hero-section section-padding">
    <!-- Glowing background blur blobs -->
    <div class="blob-glow blob-1 anim-glow"></div>
    <div class="blob-glow blob-2 anim-glow"></div>

    <div class="hero-container">
      <div class="hero-grid">
        <!-- Left: Text content -->
        <div class="hero-content">
          <div class="badge-tag">
            <span class="pulse-dot"></span>
            {{ t('heroStatus') }}
          </div>
          
          <h1 class="hero-title">
            {{ t('heroGreeting') }} <span class="highlight-text">{{ data.personal.name }}</span>
            <span class="role-text text-gradient">{{ val(data.personal, 'title') }}</span>
          </h1>
          
          <p class="hero-description">
            {{ val(data.personal, 'bio') }}
          </p>

          <div class="hero-actions">
            <button @click="handleContactClick" class="btn-primary">
              {{ t('heroContactMe') }} <ArrowRight :size="16" />
            </button>
            <button @click="handleDownloadCV" class="btn-secondary">
              {{ t('heroDownloadCV') }} <Download :size="16" />
            </button>
          </div>

          <div class="hero-socials">
            <a :href="data.personal.linkedin" target="_blank" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a :href="data.personal.github" target="_blank" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a :href="'mailto:' + data.personal.email" aria-label="Email">
              <Mail :size="20" />
            </a>
          </div>
        </div>

        <!-- Right: Animated Portrait -->
        <div class="hero-image-container">
          <div class="portrait-wrapper anim-float">
            <div class="glowing-ring"></div>
            <div class="glowing-ring ring-2"></div>
            <div class="portrait-image-mask">
              <img :src="avatarUrl" alt="Dary Mahdi Portrait" class="portrait-img" />
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Bar (below hero grid) -->
      <div class="stats-bar glass-card">
        <div v-for="(stat, idx) in data.personal.stats" :key="idx" class="stat-item">
          <div class="stat-value text-accent glow-text">{{ stat.value }}</div>
          <div class="stat-label">{{ getStatLabel(stat.label) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 140px;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 60px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(181, 255, 43, 0.08);
  color: var(--accent);
  border: 1px solid rgba(181, 255, 43, 0.15);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: var(--accent);
  border-radius: 50%;
  position: relative;
}

.pulse-dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent);
  animation: pulse-glow 1.5s infinite;
}

.hero-title {
  font-size: 56px;
  line-height: 1.1;
  margin-bottom: 20px;
  color: #fff;
  letter-spacing: -0.03em;
}

.highlight-text {
  display: block;
  font-weight: 800;
}

.role-text {
  display: block;
  font-size: 42px;
  margin-top: 8px;
}

.hero-description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 36px;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
}

.hero-socials {
  display: flex;
  gap: 16px;
}

.hero-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  transition: var(--transition);
}

.hero-socials a:hover {
  background: rgba(181, 255, 43, 0.1);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-neon);
}

/* Image styling */
.hero-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.portrait-wrapper {
  position: relative;
  width: 340px;
  height: 340px;
}

.portrait-image-mask {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: #0f131f;
  z-index: 5;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.glowing-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 50%, var(--accent) 100%);
  filter: blur(15px);
  z-index: 1;
  animation: rotate 8s linear infinite;
  opacity: 0.5;
}

.ring-2 {
  filter: blur(5px);
  opacity: 0.3;
  animation: rotate 12s linear infinite reverse;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: space-around;
  padding: 24px 16px;
  margin-top: 40px;
  border: 1px solid var(--border-glass);
}

.stat-item {
  text-align: center;
  flex: 1;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 36px;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
}

/* Background Blobs */
.blob-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
  pointer-events: none;
}

.blob-1 {
  top: 10%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(181, 255, 43, 0.06);
}

.blob-2 {
  bottom: 10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: rgba(22, 28, 45, 0.4);
}

/* Responsive */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .hero-content {
    order: 2;
    align-items: center;
    text-align: center;
  }
  
  .badge-tag {
    align-self: center;
  }
  
  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    align-self: center;
  }
  
  .hero-socials {
    align-self: center;
  }
  
  .hero-image-container {
    order: 1;
  }
  
  .portrait-wrapper {
    width: 280px;
    height: 280px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding-top: 100px;
  }
  
  .hero-title {
    font-size: 38px;
  }
  
  .role-text {
    font-size: 28px;
  }
  
  .stats-bar {
    flex-wrap: wrap;
    gap: 20px;
    padding: 24px;
  }
  
  .stat-item {
    flex: 0 0 calc(50% - 10px);
    border-right: none;
  }
}
</style>
