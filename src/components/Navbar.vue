<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, LayoutDashboard, Home, User, Briefcase, Code, MessageSquare } from '@lucide/vue'
import { t, currentLocale, setLocale } from '../i18n.js'

const props = defineProps({
  activePage: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigateTo = (pageId) => {
  isMobileMenuOpen.value = false
  emit('navigate', pageId)
  
  if (pageId !== 'dashboard') {
    const el = document.getElementById(pageId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <nav :class="['navbar-container', { 'navbar-scrolled': isScrolled || activePage === 'dashboard' }]">
    <div class="navbar-content">
      <!-- Logo -->
      <a href="#" @click.prevent="navigateTo('home')" class="logo-area">
        <div class="logo-badge">DM</div>
        <span class="logo-text">Dary<span>Mahdi</span></span>
      </a>

      <!-- Desktop Nav Links -->
      <div class="nav-links-desktop" v-if="activePage !== 'dashboard'">
        <a href="#home" @click.prevent="navigateTo('home')" :class="{ active: activePage === 'home' }">{{ t('navHome') }}</a>
        <a href="#about" @click.prevent="navigateTo('about')" :class="{ active: activePage === 'about' }">{{ t('navAbout') }}</a>
        <a href="#services" @click.prevent="navigateTo('services')" :class="{ active: activePage === 'services' }">{{ t('navServices') }}</a>
        <a href="#projects" @click.prevent="navigateTo('projects')" :class="{ active: activePage === 'projects' }">{{ t('navProjects') }}</a>
        <a href="#contact" @click.prevent="navigateTo('contact')" :class="{ active: activePage === 'contact' }">{{ t('navContact') }}</a>
      </div>

      <!-- Exit Dashboard / Mobile Actions -->
      <div class="nav-actions">
        <button 
          v-if="activePage === 'dashboard'"
          @click="navigateTo('home')" 
          class="exit-dashboard-btn"
        >
          <Home :size="16" />
          <span>{{ t('dashBack') }}</span>
        </button>

        <!-- Desktop Language Toggle -->
        <div v-if="activePage !== 'dashboard'" class="lang-selector-desktop">
          <div class="lang-selector">
            <button 
              @click="setLocale('en')" 
              :class="['lang-btn', { active: currentLocale === 'en' }]"
              aria-label="Switch to English"
            >EN</button>
            <span class="lang-divider">|</span>
            <button 
              @click="setLocale('id')" 
              :class="['lang-btn', { active: currentLocale === 'id' }]"
              aria-label="Switch to Indonesian"
            >ID</button>
          </div>
        </div>
        
        <button 
          v-if="activePage !== 'dashboard'"
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="mobile-toggle"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Nav Menu -->
    <transition name="fade">
      <div class="mobile-menu glass-card" v-if="isMobileMenuOpen && activePage !== 'dashboard'">
        <a href="#home" @click.prevent="navigateTo('home')" :class="{ active: activePage === 'home' }">
          <Home :size="18" /> {{ t('navHome') }}
        </a>
        <a href="#about" @click.prevent="navigateTo('about')" :class="{ active: activePage === 'about' }">
          <User :size="18" /> {{ t('navAbout') }}
        </a>
        <a href="#services" @click.prevent="navigateTo('services')" :class="{ active: activePage === 'services' }">
          <Code :size="18" /> {{ t('navServices') }}
        </a>
        <a href="#projects" @click.prevent="navigateTo('projects')" :class="{ active: activePage === 'projects' }">
          <Briefcase :size="18" /> {{ t('navProjects') }}
        </a>
        <a href="#contact" @click.prevent="navigateTo('contact')" :class="{ active: activePage === 'contact' }">
          <MessageSquare :size="18" /> {{ t('navContact') }}
        </a>

        <!-- Mobile Language Toggle -->
        <div class="mobile-lang-selector">
          <div class="lang-selector">
            <button 
              @click="setLocale('en')" 
              :class="['lang-btn', { active: currentLocale === 'en' }]"
            >EN</button>
            <span class="lang-divider">|</span>
            <button 
              @click="setLocale('id')" 
              :class="['lang-btn', { active: currentLocale === 'id' }]"
            >ID</button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 24px 0;
  transition: var(--transition);
  background: transparent;
}

.navbar-scrolled {
  padding: 16px 0;
  background: rgba(6, 7, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(181, 255, 43, 0.08);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(181, 255, 43, 0.4);
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: var(--accent);
}

.nav-links-desktop {
  display: flex;
  align-items: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px 24px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-links-desktop a {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  position: relative;
  padding: 4px 0;
}

.nav-links-desktop a:hover,
.nav-links-desktop a.active {
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.nav-links-desktop a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: var(--transition);
  transform: translateX(-50%);
  border-radius: 999px;
  box-shadow: 0 0 8px var(--accent);
}

.nav-links-desktop a:hover::after,
.nav-links-desktop a.active::after {
  width: 80%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dashboard-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(181, 255, 43, 0.1);
  color: var(--accent);
  border: 1px solid rgba(181, 255, 43, 0.2);
  padding: 8px 18px;
  border-radius: 9999px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.dashboard-btn:hover {
  background: var(--accent);
  color: var(--bg-dark);
  box-shadow: var(--shadow-neon);
  transform: translateY(-1px);
}

.exit-dashboard-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 18px;
  border-radius: 9999px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.exit-dashboard-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(181, 255, 43, 0.05);
}

.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px;
}

.mobile-menu {
  position: absolute;
  top: 80px;
  left: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  background: rgba(10, 12, 20, 0.95);
  border: 1px solid rgba(181, 255, 43, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.mobile-menu a {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.mobile-menu a.active,
.mobile-menu a:hover {
  color: var(--accent);
  padding-left: 8px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-links-desktop {
    display: none;
  }
  
  .lang-selector-desktop {
    display: none;
  }
  
  .mobile-toggle {
    display: block;
  }
  
  .dashboard-btn span,
  .exit-dashboard-btn span {
    display: none;
  }
  
  .dashboard-btn,
  .exit-dashboard-btn {
    padding: 8px;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    justify-content: center;
  }
}

/* i18n Styles */
.lang-selector-desktop {
  display: flex;
  align-items: center;
}

.lang-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 8px;
  border-radius: 9999px;
}

.lang-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 9999px;
  transition: var(--transition);
}

.lang-btn:hover {
  color: var(--text-primary);
}

.lang-btn.active {
  color: var(--bg-dark);
  background: var(--accent);
  box-shadow: 0 0 10px rgba(181, 255, 43, 0.3);
}

.lang-divider {
  color: rgba(255, 255, 255, 0.15);
  font-size: 11px;
}

.mobile-lang-selector {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
