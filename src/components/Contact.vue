<script setup>
import { ref } from 'vue'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle } from '@lucide/vue'
import { t, val } from '../i18n.js'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const isSubmitting = ref(false)
const submitStatus = ref(null) // 'success' or 'error'

const submitForm = () => {
  if (!name.value || !email.value || !message.value) {
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  // Simulate networking delay
  setTimeout(() => {
    try {
      const messages = JSON.parse(localStorage.getItem('dary_portfolio_messages') || '[]')
      messages.unshift({
        id: Date.now().toString(),
        name: name.value,
        email: email.value,
        subject: subject.value || 'General Inquiry',
        message: message.value,
        date: new Date().toLocaleString('id-ID', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        read: false
      })
      
      localStorage.setItem('dary_portfolio_messages', JSON.stringify(messages))
      
      submitStatus.value = 'success'
      // Reset form
      name.value = ''
      email.value = ''
      subject.value = ''
      message.value = ''
    } catch (e) {
      submitStatus.value = 'error'
    } finally {
      isSubmitting.value = false
    }
  }, 1000)
}
</script>

<template>
  <section id="contact" class="contact-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrapper">
        <span class="subtitle">{{ t('contactSubtitle') }}</span>
        <h2 class="section-title">{{ t('navContact') }} <span class="text-accent glow-text">{{ t('contactMePart2') }}</span></h2>
        <div class="title-divider"></div>
      </div>

      <div class="contact-grid">
        <!-- Left: Contact Details -->
        <div class="contact-info-container">
          <h3 class="info-title">{{ t('contactTitle') }}</h3>
          <p class="info-desc">
            {{ t('contactIntro') }}
          </p>

          <div class="info-list">
            <div class="info-item glass-card">
              <div class="icon-box">
                <Mail :size="20" class="text-accent" />
              </div>
              <div class="info-details">
                <span>{{ t('contactEmailMe') }}</span>
                <a :href="'mailto:' + data.personal.email">{{ data.personal.email }}</a>
              </div>
            </div>

            <div class="info-item glass-card">
              <div class="icon-box">
                <Phone :size="20" class="text-accent" />
              </div>
              <div class="info-details">
                <span>{{ t('contactCallWa') }}</span>
                <a :href="'tel:' + data.personal.phone">{{ data.personal.phone }}</a>
              </div>
            </div>

            <div class="info-item glass-card">
              <div class="icon-box">
                <MapPin :size="20" class="text-accent" />
              </div>
              <div class="info-details">
                <span>{{ t('dashProfileLocation') }}</span>
                <p>{{ data.personal.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Glass Contact Form -->
        <div class="contact-form-container glass-card">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">{{ t('contactFormName') }} *</label>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                placeholder="e.g. John Doe"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="email">{{ t('contactFormEmail') }} *</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="e.g. john@example.com"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="subject">{{ t('contactFormSubject') }}</label>
              <input 
                type="text" 
                id="subject" 
                v-model="subject" 
                placeholder="How can I help you?"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="message">{{ t('contactFormMessage') }} *</label>
              <textarea 
                id="message" 
                v-model="message" 
                rows="5" 
                placeholder="Write your project details or inquiries here..."
                required
                class="form-input text-area"
              ></textarea>
            </div>

            <!-- Submit Button & Feedback Status -->
            <div class="form-footer">
              <button 
                type="submit" 
                class="btn-primary submit-btn" 
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">{{ t('contactFormBtnSend') }}</span>
                <span v-else>{{ t('contactFormBtnSending') }}</span>
                <Send :size="16" />
              </button>

              <transition name="status-fade">
                <div v-if="submitStatus === 'success'" class="status-msg success-msg">
                  <CheckCircle2 :size="16" />
                  <span>{{ t('contactFormSuccess') }}</span>
                </div>
                <div v-else-if="submitStatus === 'error'" class="status-msg error-msg">
                  <AlertTriangle :size="16" />
                  <span>{{ t('contactFormError') }}</span>
                </div>
              </transition>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
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
.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 50px;
  align-items: start;
}

/* Left Column: Info */
.contact-info-container {
  text-align: left;
}

.info-title {
  font-size: 28px;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 16px;
}

.info-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 36px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  align-items: center;
  border: 1px solid var(--border-glass);
}

.icon-box {
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

.info-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.info-details span {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.info-details a {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}

.info-details a:hover {
  color: var(--accent);
}

.info-details p {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}

/* Right Column: Glass Form */
.contact-form-container {
  padding: 40px;
  border: 1px solid var(--border-glass);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.form-input {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 14px 16px;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 14.5px;
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(181, 255, 43, 0.02);
  box-shadow: 0 0 10px rgba(181, 255, 43, 0.1);
}

.text-area {
  resize: vertical;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 16px;
}

.submit-btn {
  padding: 14px 32px;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-msg {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 10px 16px;
}

.success-msg {
  background: rgba(181, 255, 43, 0.08);
  border: 1px solid rgba(181, 255, 43, 0.15);
  color: var(--accent);
}

.error-msg {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* Transitions */
.status-fade-enter-active,
.status-fade-leave-active {
  transition: opacity 0.3s ease;
}

.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form-container {
    padding: 30px 24px;
  }
}
</style>
