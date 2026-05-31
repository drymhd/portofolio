<script setup>
import { ref, computed } from 'vue'
import { ExternalLink } from '@lucide/vue'
import { t, val } from '../i18n.js'
import SafeImage from './SafeImage.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeFilter = ref('All')
const categories = ['All', 'Web', 'Mobile', 'API']

// Calculate dynamic project count for each filter category
const projectCounts = computed(() => {
  const counts = { All: props.data.projects.length }
  props.data.projects.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })
  return counts
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return props.data.projects
  }
  return props.data.projects.filter(p => p.category === activeFilter.value)
})

// Highlight flagship production systems
const isFlagship = (id) => {
  // BHE-GTK (1), LMS (8), SAITRANS Mobile (9)
  return ['1', '8', '9'].includes(id)
}

const getCategoryLabel = (cat) => {
  if (cat === 'All') return t('catAll')
  if (cat === 'API') return 'APIs'
  return cat
}
</script>

<template>
  <section id="projects" class="projects-section section-padding">
    <!-- Standout Background Glow Blobs -->
    <div class="projects-glow-blob blob-1"></div>
    <div class="projects-glow-blob blob-2"></div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrapper" data-aos="fade-up">
        <span class="subtitle">{{ t('projectsSubtitle') }}</span>
        <h2 class="section-title">{{ t('projectsTitlePart1') }} <span class="text-accent glow-text">{{ t('projectsTitlePart2') }}</span></h2>
        <p class="section-intro">
          {{ t('projectsIntro') }}
        </p>
        <div class="title-divider"></div>
      </div>

      <!-- Filters with Count Badges -->
      <div class="filters-container" data-aos="fade-up">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          @click="activeFilter = cat" 
          :class="['filter-btn', { active: activeFilter === cat }]"
        >
          <span>{{ getCategoryLabel(cat) }}</span>
          <span class="filter-count">{{ projectCounts[cat] || 0 }}</span>
        </button>
      </div>

      <!-- Projects Grid (Asymmetrical Layout) -->
      <transition-group name="list" tag="div" class="projects-grid" data-aos="fade-up">
        <div 
          v-for="(project, idx) in filteredProjects" 
          :key="project.id" 
          :class="['project-card', 'glass-card', { 'flagship-card': isFlagship(project.id) }]"
        >
          <!-- Flagship Ribbon Badge -->
          <div v-if="isFlagship(project.id)" class="flagship-badge">
            <span class="pulse-dot"></span>
            ⚡ {{ t('projectsFlagship') }}
          </div>

          <!-- Project Image Area -->
          <div class="project-img-wrapper">
            <SafeImage 
              :src="project.image" 
              :alt="project.title" 
              :category="project.category" 
              class="project-image" 
            />
            <div class="project-overlay">
              <div class="project-links">
                <a :href="project.link" target="_blank" class="overlay-link-btn" aria-label="GitHub Source">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="javascript:void(0)" class="overlay-link-btn" aria-label="Live Demo">
                  <ExternalLink :size="20" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Info Area -->
          <div class="project-info">
            <div class="project-meta">
              <span class="project-category">{{ getCategoryLabel(project.category) }}</span>
              <span class="project-location" v-if="isFlagship(project.id)">Surabaya / Jakarta</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ val(project, 'description') }}</p>
            
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag-badge">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </transition-group>
      
      <!-- Footer Call to Action for GitHub -->
      <div class="projects-cta">
        <p>{{ t('projectsCtaText') }}</p>
        <a href="https://github.com/darymahdi" target="_blank" class="btn-secondary cta-btn">
          {{ t('projectsCtaBtn') }} 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  background: #06070a; /* Slightly darker than other parts to make it stand out */
  overflow: hidden;
}

/* Standout Glow Blobs */
.projects-glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
}

.projects-glow-blob.blob-1 {
  top: 10%;
  left: 20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(181, 255, 43, 0.08) 0%, transparent 70%);
}

.projects-glow-blob.blob-2 {
  bottom: 20%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(30, 41, 59, 0.8) 0%, transparent 75%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

/* Section Header */
.section-title-wrapper {
  text-align: center;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.subtitle {
  text-transform: uppercase;
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2.5px;
}

.section-title {
  font-size: 42px;
  color: #fff;
  margin-top: 8px;
  margin-bottom: 16px;
}

.section-intro {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.title-divider {
  width: 80px;
  height: 3px;
  background: var(--accent);
  margin: 0 auto;
  border-radius: 999px;
  box-shadow: var(--shadow-neon);
}

/* Filters */
.filters-container {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  padding: 10px 24px;
  border-radius: 9999px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  border-color: rgba(181, 255, 43, 0.3);
  color: #fff;
}

.filter-btn.active {
  background: var(--accent);
  color: var(--bg-dark);
  border-color: var(--accent);
  box-shadow: 0 4px 15px rgba(181, 255, 43, 0.3);
}

.filter-count {
  font-size: 11px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 7px;
  border-radius: 99px;
  transition: var(--transition);
  color: var(--text-primary);
}

.filter-btn.active .filter-count {
  background: rgba(0, 0, 0, 0.15);
  color: var(--bg-dark);
}

/* Grid Layout with Asymmetric Flagship Card */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.project-card {
  border: 1px solid var(--border-glass);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background: rgba(15, 20, 32, 0.4);
}

.project-card:hover {
  border-color: var(--border-glass-hover);
  background: rgba(22, 28, 45, 0.6);
  box-shadow: 0 0 25px rgba(181, 255, 43, 0.1);
}

/* Flagship horizontal style on desktop */
.project-card.flagship-card {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  border: 1px solid rgba(181, 255, 43, 0.2);
  background: rgba(20, 26, 42, 0.55);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.project-card.flagship-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(181, 255, 43, 0.18);
}

.flagship-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 15;
  background: var(--bg-dark);
  color: var(--accent);
  border: 1px solid rgba(181, 255, 43, 0.4);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
}

.pulse-dot {
  width: 6px;
  height: 6px;
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

@keyframes pulse-glow {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

.project-img-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #0f131f;
}

.flagship-card .project-img-wrapper {
  height: 100%;
  min-height: 320px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .project-image {
  transform: scale(1.06);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(6, 7, 10, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
  z-index: 10;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 16px;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .project-links {
  transform: translateY(0);
}

.overlay-link-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(181, 255, 43, 0.3);
  transition: var(--transition);
}

.overlay-link-btn:hover {
  transform: scale(1.1);
  background: var(--accent-hover);
  box-shadow: var(--shadow-neon-strong);
}

.project-info {
  padding: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-category {
  font-size: 11px;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.project-location {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}

.project-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 14px;
  line-height: 1.3;
}

.project-description {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-badge {
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4px 12px;
  border-radius: 999px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.project-card:hover .tag-badge {
  border-color: rgba(181, 255, 43, 0.2);
  background: rgba(181, 255, 43, 0.02);
  color: var(--text-primary);
}

.flagship-card .tag-badge {
  border-color: rgba(255, 255, 255, 0.08);
}

/* CTA Bottom Section */
.projects-cta {
  margin-top: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.projects-cta p {
  font-size: 15px;
  color: var(--text-secondary);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
}

.cta-btn svg {
  transition: transform 0.3s ease;
}

.cta-btn:hover svg {
  transform: translateX(4px);
}

/* Animations */
.list-enter-active,
.list-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.list-move {
  transition: transform 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
  position: absolute;
}

/* Responsive */
@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .project-card.flagship-card {
    grid-column: span 1;
    grid-template-columns: 1fr;
  }
  
  .flagship-card .project-img-wrapper {
    min-height: 250px;
    height: 250px;
  }
}
</style>
