<script setup>
import { ref } from 'vue'
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from '@lucide/vue'
import { t } from '../i18n.js'

const emit = defineEmits(['login-success', 'cancel'])

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isSubmitting = ref(false)

const handleLogin = () => {
  errorMsg.value = ''
  isSubmitting.value = true

  // Simulate authentication check
  setTimeout(() => {
    // Default credentials
    const correctEmail = 'darmah250903@gmail.com'
    const correctPassword = 'dary123'

    if (email.value === correctEmail && password.value === correctPassword) {
      localStorage.setItem('dary_admin_logged_in', 'true')
      emit('login-success')
    } else {
      errorMsg.value = t('loginError')
    }
    isSubmitting.value = false
  }, 800)
}
</script>

<template>
  <div class="login-wrapper">
    <!-- Glowing background blur blobs -->
    <div class="blob-glow blob-1 anim-glow"></div>
    <div class="blob-glow blob-2 anim-glow"></div>

    <div class="login-container">
      <div class="login-card glass-card">
        <div class="login-header">
          <div class="logo-badge">DM</div>
          <h2>{{ t('loginTitle') }}</h2>
          <p>{{ t('loginSubtitle') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Error alert -->
          <transition name="fade">
            <div v-if="errorMsg" class="error-alert">
              <AlertCircle :size="16" />
              <span>{{ errorMsg }}</span>
            </div>
          </transition>

          <div class="form-group">
            <label for="login-email">{{ t('loginEmail') }}</label>
            <div class="input-wrapper">
              <Mail :size="16" class="input-icon" />
              <input 
                type="email" 
                id="login-email" 
                v-model="email" 
                placeholder="darmah250903@gmail.com" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="login-password">{{ t('loginPassword') }}</label>
            <div class="input-wrapper">
              <Lock :size="16" class="input-icon" />
              <input 
                type="password" 
                id="login-password" 
                v-model="password" 
                placeholder="••••••••" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="login-tip">
            <span>{{ t('loginTip') }}</span>
          </div>

          <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">{{ t('loginBtn') }}</span>
            <span v-else>{{ t('loginSigningIn') }}</span>
            <LogIn :size="16" />
          </button>
        </form>

        <div class="login-footer">
          <a href="#" @click.prevent="emit('cancel')" class="back-link">
            <ArrowLeft :size="14" /> {{ t('loginBack') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  background: var(--bg-dark);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container {
  max-width: 420px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.login-card {
  padding: 40px;
  border: 1px solid var(--border-glass);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  text-align: center;
}

.logo-badge {
  background: var(--accent);
  color: var(--bg-dark);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 18px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(181, 255, 43, 0.4);
  margin-bottom: 16px;
}

.login-header h2 {
  font-size: 24px;
  color: #fff;
  margin-bottom: 4px;
}

.login-header p {
  font-size: 13.5px;
  color: var(--text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  color: #ef4444;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: var(--text-muted);
}

.form-input {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 16px 12px 46px;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 14px;
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(181, 255, 43, 0.01);
}

.login-tip {
  font-size: 12px;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.01);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px dashed rgba(255, 255, 255, 0.05);
}

.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 12px 0;
  margin-top: 10px;
}

.login-footer {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
}

.back-link:hover {
  color: var(--accent);
}

/* Blobs */
.blob-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
  pointer-events: none;
}

.blob-1 {
  top: -10%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: rgba(181, 255, 43, 0.05);
}

.blob-2 {
  bottom: -10%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: rgba(22, 28, 45, 0.3);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
