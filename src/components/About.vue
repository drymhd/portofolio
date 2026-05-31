<script setup>
import { ref } from 'vue'
import { Briefcase, GraduationCap, Award, Globe, CheckCircle2 } from '@lucide/vue'
import { t, val } from '../i18n.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeTab = ref('experience')
</script>

<template>
  <section id="about" class="about-section section-padding">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title-wrapper">
        <span class="subtitle">{{ t('aboutSubtitle') }}</span>
        <h2 class="section-title">{{ t('aboutMePart1') }} <span class="text-accent glow-text">{{ t('aboutMePart2') }}</span></h2>
        <div class="title-divider"></div>
      </div>

      <div class="about-grid">
        <!-- Left: Bio & Tech Skills -->
        <div class="about-left">
          <div class="bio-card glass-card">
            <h3>{{ t('aboutWhoIs') }} Dary Mahdi?</h3>
            <p>{{ val(data.personal, 'aboutText') }}</p>
          </div>

          <!-- Skills Cards -->
          <div class="skills-wrapper">
            <h3>{{ t('aboutTechCap') }}</h3>
            <div class="skills-categories">
              <div v-for="(cat, idx) in data.skills" :key="idx" class="skill-category-card glass-card">
                <h4>{{ val(cat, 'category') }}</h4>
                <div class="skill-list">
                  <div v-for="(skill, sIdx) in cat.items" :key="sIdx" class="skill-item">
                    <div class="skill-info">
                      <span>{{ skill.name }}</span>
                      <span>{{ skill.level }}%</span>
                    </div>
                    <div class="progress-bar-track">
                      <div class="progress-bar-fill" :style="{ width: skill.level + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Tabs for Experience / Education / Certs -->
        <div class="about-right">
          <div class="tabs-header glass-card">
            <button 
              @click="activeTab = 'experience'" 
              :class="['tab-btn', { active: activeTab === 'experience' }]"
            >
              <Briefcase :size="16" /> {{ t('aboutTabExp') }}
            </button>
            <button 
              @click="activeTab = 'education'" 
              :class="['tab-btn', { active: activeTab === 'education' }]"
            >
              <GraduationCap :size="16" /> {{ t('aboutTabEdu') }}
            </button>
            <button 
              @click="activeTab = 'certifications'" 
              :class="['tab-btn', { active: activeTab === 'certifications' }]"
            >
              <Award :size="16" /> {{ t('aboutTabCreds') }}
            </button>
          </div>

          <!-- Tabs Content -->
          <div class="tab-content">
            <!-- Experience Timeline -->
            <div v-if="activeTab === 'experience'" class="timeline-container">
              <div v-for="(job, idx) in data.experience" :key="idx" class="timeline-item glass-card">
                <div class="timeline-dot"></div>
                <div class="timeline-meta">
                  <span class="timeline-period">{{ job.period }}</span>
                  <span class="timeline-location">{{ job.location }}</span>
                </div>
                <h4 class="timeline-role">{{ val(job, 'role') }}</h4>
                <h5 class="timeline-company">{{ job.company }}</h5>
                <ul class="timeline-details">
                  <li v-for="(bullet, bIdx) in val(job, 'bullets')" :key="bIdx">
                    <CheckCircle2 :size="12" class="bullet-icon text-accent" />
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Education -->
            <div v-if="activeTab === 'education'" class="education-container">
              <div v-for="(edu, idx) in data.education" :key="idx" class="edu-card glass-card">
                <div class="edu-icon-bg">
                  <GraduationCap :size="24" class="text-accent" />
                </div>
                <div class="edu-info">
                  <span class="edu-period">{{ edu.period }}</span>
                  <h4 class="edu-school">{{ edu.school }}</h4>
                  <p class="edu-degree">{{ val(edu, 'degree') }}</p>
                  <span v-if="edu.details" class="edu-gpa badge">{{ val(edu, 'details') }}</span>
                </div>
              </div>
            </div>

            <!-- Certifications & Languages -->
            <div v-if="activeTab === 'certifications'" class="cert-lang-container">
              <div class="cert-section">
                <h4>{{ t('aboutCert') }}</h4>
                <div class="cert-grid">
                  <div v-for="(cert, idx) in data.certifications" :key="idx" class="cert-card glass-card">
                    <Award :size="20" class="text-accent cert-icon" />
                    <div>
                      <h5>{{ val(cert, 'title') }}</h5>
                      <p>{{ cert.issuer }} <span v-if="cert.period">• {{ cert.period }}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lang-section glass-card">
                <h4><Globe :size="18" class="text-accent" /> {{ t('aboutLangs') }}</h4>
                <div class="lang-grid">
                  <div v-for="(lang, idx) in data.languages" :key="idx" class="lang-item">
                    <div class="lang-name">{{ lang.name }}</div>
                    <div class="lang-proficiency badge">{{ lang.proficiency }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
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

/* Grid Layout */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Left Column */
.about-left {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.bio-card {
  padding: 30px;
  border: 1px solid var(--border-glass);
}

.bio-card h3 {
  font-size: 24px;
  color: #fff;
  margin-bottom: 16px;
}

.bio-card p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.skills-wrapper h3 {
  font-size: 22px;
  color: #fff;
  margin-bottom: 20px;
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-category-card {
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.skill-category-card h4 {
  font-size: 16px;
  color: var(--accent);
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.progress-bar-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(181, 255, 43, 0.5);
  transition: width 1.5s ease-out;
}

/* Right Column: Tab system */
.about-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tabs-header {
  display: flex;
  padding: 6px;
  border: 1px solid var(--border-glass);
  border-radius: 12px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 12px;
  border-radius: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.tab-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.02);
}

.tab-btn.active {
  background: var(--accent);
  color: var(--bg-dark);
  box-shadow: 0 4px 15px rgba(181, 255, 43, 0.2);
}

/* Experience timeline */
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-left: 2px solid rgba(181, 255, 43, 0.1);
  padding-left: 20px;
  margin-left: 10px;
}

.timeline-item {
  position: relative;
  padding: 24px;
  border: 1px solid var(--border-glass);
  text-align: left;
}

.timeline-dot {
  position: absolute;
  left: -27px;
  top: 30px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--bg-dark);
  box-shadow: 0 0 8px var(--accent);
}

.timeline-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.timeline-period {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--text-secondary);
}

.timeline-role {
  font-size: 18px;
  color: #fff;
  margin-bottom: 4px;
}

.timeline-company {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 500;
}

.timeline-details {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-details li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.bullet-icon {
  margin-top: 4px;
  flex-shrink: 0;
}

/* Education Layout */
.education-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edu-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  align-items: center;
  text-align: left;
}

.edu-icon-bg {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(181, 255, 43, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(181, 255, 43, 0.15);
  flex-shrink: 0;
}

.edu-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.edu-period {
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 4px;
}

.edu-school {
  font-size: 18px;
  color: #fff;
  margin-bottom: 4px;
}

.edu-degree {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.badge {
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--text-secondary);
}

.edu-gpa.badge {
  background: rgba(181, 255, 43, 0.1);
  border-color: rgba(181, 255, 43, 0.2);
  color: var(--accent);
}

/* Credentials Layout */
.cert-lang-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cert-section h4 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 16px;
  text-align: left;
}

.cert-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cert-card {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  align-items: center;
  text-align: left;
}

.cert-icon {
  flex-shrink: 0;
}

.cert-card h5 {
  font-size: 15px;
  color: #fff;
  margin-bottom: 2px;
}

.cert-card p {
  font-size: 13px;
  color: var(--text-muted);
}

.lang-section {
  padding: 24px;
  border: 1px solid var(--border-glass);
}

.lang-section h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #fff;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
  text-align: left;
}

.lang-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lang-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
