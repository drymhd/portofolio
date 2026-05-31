<script setup>
import { val } from '../i18n.js'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div id="cv-print-area" class="cv-print-container">
    <!-- Header -->
    <header class="cv-header">
      <h1 class="cv-name">{{ data.personal.name }}</h1>
      <h2 class="cv-title">{{ val(data.personal, 'title') }}</h2>
      
      <div class="cv-contact-row">
        <span>📍 {{ data.personal.location }}</span>
        <span>✉️ {{ data.personal.email }}</span>
        <span>📞 {{ data.personal.phone }}</span>
      </div>
      <div class="cv-contact-row secondary-contacts">
        <span>🔗 linkedin.com/in/darymahdi</span>
        <span>💻 github.com/darymahdi</span>
      </div>
    </header>

    <hr class="cv-divider" />

    <!-- Two Column Layout -->
    <div class="cv-body-grid">
      <!-- Main Column: Summary, Experience, Education -->
      <div class="cv-main-col">
        <!-- Summary / About -->
        <section class="cv-section">
          <h3 class="cv-section-title">Professional Summary</h3>
          <p class="cv-text">{{ val(data.personal, 'bio') }}</p>
        </section>

        <!-- Experience -->
        <section class="cv-section">
          <h3 class="cv-section-title">Work Experience</h3>
          
          <div v-for="(exp, idx) in data.experience" :key="idx" class="cv-entry">
            <div class="cv-entry-header">
              <span class="cv-entry-company">{{ exp.company }}</span>
              <span class="cv-entry-period">{{ exp.period }}</span>
            </div>
            <div class="cv-entry-subheader">
              <span class="cv-entry-role">{{ val(exp, 'role') }}</span>
              <span class="cv-entry-loc">{{ exp.location }}</span>
            </div>
            <ul class="cv-bullets">
              <li v-for="(bullet, bIdx) in val(exp, 'bullets')" :key="bIdx">
                {{ bullet }}
              </li>
            </ul>
          </div>
        </section>

        <!-- Education -->
        <section class="cv-section">
          <h3 class="cv-section-title">Education</h3>
          
          <div v-for="(edu, idx) in data.education" :key="idx" class="cv-entry">
            <div class="cv-entry-header">
              <span class="cv-entry-school">{{ edu.school }}</span>
              <span class="cv-entry-period">{{ edu.period }}</span>
            </div>
            <div class="cv-entry-subheader">
              <span class="cv-entry-degree">{{ val(edu, 'degree') }}</span>
              <span class="cv-entry-gpa">{{ val(edu, 'details') }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar Column: Skills, Certifications, Languages -->
      <div class="cv-sidebar-col">
        <!-- Technical Skills -->
        <section class="cv-section">
          <h3 class="cv-section-title">Skills</h3>
          <div v-for="(cat, idx) in data.skills" :key="idx" class="cv-skill-group">
            <h4 class="cv-skill-cat">{{ val(cat, 'category') }}</h4>
            <div class="cv-skills-list">
              <span v-for="(item, iIdx) in cat.items" :key="iIdx" class="cv-skill-tag">
                {{ item.name }}
              </span>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section class="cv-section">
          <h3 class="cv-section-title">Certifications</h3>
          <div v-for="(cert, idx) in data.certifications" :key="idx" class="cv-cert-entry">
            <div class="cv-cert-title">{{ val(cert, 'title') }}</div>
            <div class="cv-cert-meta">{{ cert.issuer }} | {{ cert.period }}</div>
            <div v-if="cert.credentialId" class="cv-cert-meta">ID: {{ cert.credentialId }}</div>
          </div>
        </section>

        <!-- Languages -->
        <section class="cv-section">
          <h3 class="cv-section-title">Languages</h3>
          <div v-for="(lang, idx) in data.languages" :key="idx" class="cv-lang-entry">
            <strong>{{ lang.name }}</strong> — <span class="cv-lang-desc">{{ lang.proficiency }}</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Screen styles: Hidden by default on the website layout */
.cv-print-container {
  display: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1a1a1a;
  background: #ffffff;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: left;
}

/* Print Optimization Styles */
@media print {
  .cv-print-container {
    display: block !important;
    background: #ffffff !important;
    color: #000000 !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Force light backgrounds for print */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
    background-color: transparent !important;
  }
}

.cv-header {
  text-align: center;
  margin-bottom: 12px;
}

.cv-name {
  font-size: 26px;
  font-weight: 800;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.cv-title {
  font-size: 15px;
  font-weight: 600;
  color: #4a5568;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.cv-contact-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
  color: #4a5568;
  margin-bottom: 2px;
}

.secondary-contacts {
  font-size: 10.5px;
  color: #718096;
}

.cv-divider {
  border: 0;
  border-top: 1.5px solid #2d3748;
  margin: 12px 0 16px 0;
}

.cv-body-grid {
  display: grid;
  grid-template-columns: 1.7fr 1.3fr;
  gap: 24px;
}

.cv-section {
  margin-bottom: 16px;
  page-break-inside: avoid;
}

.cv-section-title {
  font-size: 13px;
  font-weight: 800;
  color: #000000;
  border-bottom: 1px solid #cbd5e0;
  padding-bottom: 3px;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.cv-text {
  font-size: 11px;
  color: #2d3748;
  margin: 0;
  text-align: justify;
}

.cv-entry {
  margin-bottom: 12px;
  page-break-inside: avoid;
}

.cv-entry-header,
.cv-entry-subheader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cv-entry-company,
.cv-entry-school {
  font-size: 12px;
  font-weight: 700;
  color: #000000;
}

.cv-entry-period {
  font-size: 10px;
  font-weight: 600;
  color: #4a5568;
}

.cv-entry-role,
.cv-entry-degree {
  font-size: 11px;
  font-weight: 600;
  color: #2d3748;
}

.cv-entry-loc,
.cv-entry-gpa {
  font-size: 10px;
  color: #718096;
  font-style: italic;
}

.cv-bullets {
  margin: 4px 0 0 0;
  padding-left: 16px;
  font-size: 10.5px;
  color: #2d3748;
}

.cv-bullets li {
  margin-bottom: 2px;
}

.cv-skill-group {
  margin-bottom: 10px;
}

.cv-skill-cat {
  font-size: 11px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
}

.cv-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.cv-skill-tag {
  background: #edf2f7;
  color: #2d3748;
  font-size: 9.5px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

@media print {
  .cv-skill-tag {
    background: #edf2f7 !important;
    border: 1px solid #cbd5e0 !important;
  }
}

.cv-cert-entry {
  margin-bottom: 8px;
}

.cv-cert-title {
  font-size: 10.5px;
  font-weight: 700;
  color: #1a1a1a;
}

.cv-cert-meta {
  font-size: 9.5px;
  color: #718096;
}

.cv-lang-entry {
  font-size: 10.5px;
  margin-bottom: 6px;
  color: #2d3748;
}

.cv-lang-desc {
  font-size: 9.5px;
  color: #718096;
}
</style>
