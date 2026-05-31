<script setup>
import { Mail, ArrowUp } from '@lucide/vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-top">
        <div class="logo-area">
          <div class="logo-badge">DM</div>
          <span class="logo-text">Dary<span>Mahdi</span></span>
        </div>
        
        <div class="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <button @click="scrollToTop" class="back-to-top" aria-label="Back to top">
          <ArrowUp :size="18" />
        </button>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} Dary Mahdi. Built with Vue 3 & Vite.
        </p>

        <div class="social-links">
          <a :href="data.personal.linkedin" target="_blank" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a :href="data.personal.github" target="_blank" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a :href="'mailto:' + data.personal.email" aria-label="Email">
            <Mail :size="18" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  background: #040508;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding: 60px 0 30px;
  position: relative;
  z-index: 10;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-badge {
  background: var(--accent);
  color: var(--bg-dark);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(181, 255, 43, 0.2);
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: var(--accent);
}

.footer-nav {
  display: flex;
  gap: 24px;
}

.footer-nav a {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.footer-nav a:hover {
  color: var(--accent);
}

.back-to-top {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.back-to-top:hover {
  background: rgba(181, 255, 43, 0.1);
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--shadow-neon);
  transform: translateY(-2px);
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 30px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 13px;
  color: var(--text-muted);
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  transition: var(--transition);
}

.social-links a:hover {
  background: rgba(181, 255, 43, 0.08);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  
  .footer-nav {
    flex-direction: column;
    gap: 16px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
