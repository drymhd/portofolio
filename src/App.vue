<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import defaultData from './assets/data-default.json'

// Components
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Services from './components/Services.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import SplashScreen from './components/SplashScreen.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import CVPrintTemplate from './components/CVPrintTemplate.vue'
import CustomCursor from './components/CustomCursor.vue'

const activePage = ref('home')
const portfolioData = ref(null)
const showSplash = ref(true)

// Initialize data from localStorage or default JSON
const initData = () => {
  const localData = localStorage.getItem('dary_portfolio_data')
  if (localData) {
    try {
      const parsed = JSON.parse(localData)
      // Check if it's the old mock projects list, lacks bilingual support, or lacks the new certifications
      const hasRecentProjects = parsed.projects && parsed.projects.some(p => p.title.includes('HIMSI CENGKARENG'))
      const hasBilingualSupport = parsed.personal && parsed.personal.bio_en !== undefined
      const hasAllCertifications = parsed.certifications && parsed.certifications.length >= 9
      
      if (!hasRecentProjects || !hasBilingualSupport || !hasAllCertifications) {
        portfolioData.value = defaultData
        localStorage.setItem('dary_portfolio_data', JSON.stringify(defaultData))
      } else {
        portfolioData.value = parsed
      }
    } catch (e) {
      portfolioData.value = defaultData
      localStorage.setItem('dary_portfolio_data', JSON.stringify(defaultData))
    }
  } else {
    portfolioData.value = defaultData
    localStorage.setItem('dary_portfolio_data', JSON.stringify(defaultData))
  }
}

// Update database handler
const updateData = (newData) => {
  portfolioData.value = newData
  localStorage.setItem('dary_portfolio_data', JSON.stringify(newData))
}

// Set active page view / scroll position
const setPage = (pageId) => {
  if (pageId === 'home' && activePage.value === 'dashboard') {
    // Log out when exiting dashboard
    localStorage.setItem('dary_admin_logged_in', 'false')
    window.location.hash = '#home'
  }
  activePage.value = pageId
}

// URL Hash routing check
const handleHashChange = () => {
  const hash = window.location.hash
  if (hash === '#/login' || hash === '#login') {
    activePage.value = 'login'
  } else if (hash === '#/dashboard' || hash === '#dashboard') {
    const isLoggedIn = localStorage.getItem('dary_admin_logged_in') === 'true'
    if (isLoggedIn) {
      activePage.value = 'dashboard'
    } else {
      window.location.hash = '#/login'
    }
  } else if (activePage.value === 'login' || activePage.value === 'dashboard') {
    activePage.value = 'home'
  }
}

const onLoginSuccess = () => {
  activePage.value = 'dashboard'
  window.location.hash = '#/dashboard'
}

const onLoginCancel = () => {
  activePage.value = 'home'
  window.location.hash = '#home'
}

// Mouse position tracking for background spotlight glow
const mouseX = ref(0)
const mouseY = ref(0)

const updateMousePosition = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

// Scroll Spy to highlight active navbar section based on viewport scroll position
const handleScrollSpy = () => {
  if (activePage.value === 'dashboard' || activePage.value === 'login') return

  const scrollPosition = window.scrollY + 250 // Offset for floating navbar and trigger zone
  const sections = ['home', 'about', 'services', 'projects', 'contact']

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight

      if (scrollPosition >= top && scrollPosition < top + height) {
        activePage.value = id
        break
      }
    }
  }
}

// Prevent right click and common dev tools shortcuts on public pages
const blockDevTools = (e) => {
  if (activePage.value === 'dashboard') return

  if (e.type === 'contextmenu') {
    e.preventDefault()
    return false
  }

  if (e.type === 'keydown') {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault()
      return false
    }
    // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault()
      return false
    }
    // Ctrl+Shift+J / Cmd+Opt+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault()
      return false
    }
    // Ctrl+Shift+C / Cmd+Opt+C (Element selection)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault()
      return false
    }
    // Ctrl+U / Cmd+Opt+U (View source code)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault()
      return false
    }
    // Ctrl+S / Cmd+S (Save page HTML)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault()
      return false
    }
  }
}

onMounted(() => {
  initData()
  
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('mousemove', updateMousePosition)
  window.addEventListener('scroll', handleScrollSpy)
  window.addEventListener('contextmenu', blockDevTools)
  window.addEventListener('keydown', blockDevTools)
  
  handleHashChange()
  handleScrollSpy() // Initial check on mount
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('mousemove', updateMousePosition)
  window.removeEventListener('scroll', handleScrollSpy)
  window.removeEventListener('contextmenu', blockDevTools)
  window.removeEventListener('keydown', blockDevTools)
})
</script>

<template>
  <div v-if="portfolioData" class="app-layout">
    <!-- Background grid & accent particles -->
    <div class="grid-overlay"></div>
    <div class="glow-radial-bg"></div>
    <div 
      class="cursor-spotlight" 
      :style="{ 
        background: `radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, rgba(181, 255, 43, 0.025), transparent 80%)` 
      }"
    ></div>
    <ParticlesBackground v-if="!showSplash && activePage !== 'dashboard'" />

    <!-- Header Navbar (Hidden on Login Page) -->
    <Navbar v-if="activePage !== 'login'" :activePage="activePage" @navigate="setPage" />

    <!-- Public Portofolio Layout -->
    <div v-if="activePage !== 'dashboard' && activePage !== 'login'" class="public-content">
      <Hero :data="portfolioData" />
      <About :data="portfolioData" />
      <Services :data="portfolioData" />
      <Projects :data="portfolioData" />
      <Contact :data="portfolioData" />
      <Footer :data="portfolioData" />
    </div>

    <!-- Login Page View -->
    <div v-else-if="activePage === 'login'" class="login-content">
      <Login @login-success="onLoginSuccess" @cancel="onLoginCancel" />
    </div>

    <!-- Admin Dashboard Panel -->
    <div v-else-if="activePage === 'dashboard'" class="dashboard-content">
      <Dashboard 
        :data="portfolioData" 
        @update-data="updateData" 
        @exit="setPage('home')" 
      />
    </div>

    <!-- Entrance Splash Screen -->
    <SplashScreen v-if="showSplash" @complete="showSplash = false" />

    <!-- Printable CV Template -->
    <CVPrintTemplate :data="portfolioData" />

    <!-- Custom Animated Trailing Cursor -->
    <CustomCursor v-if="!showSplash && activePage !== 'dashboard'" />
  </div>
  
  <div v-else class="loading-screen">
    <div class="loader"></div>
  </div>
</template>

<style>
/* App layout variables & general classes */
.app-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Graphic Overlay Grid Background */
.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.007) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.007) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 2;
}

.glow-radial-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(181, 255, 43, 0.015), transparent 70%);
  pointer-events: none;
  z-index: 1;
}

/* Loading animations */
.loading-screen {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(181, 255, 43, 0.1);
  border-radius: 50%;
  border-top-color: var(--accent);
  animation: spin 1s ease-in-out infinite;
  box-shadow: var(--shadow-neon);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media print {
  /* Hide every part of the app layout except the print area */
  .grid-overlay,
  .glow-radial-bg,
  .cursor-spotlight,
  .particles-container,
  nav,
  .public-content,
  .login-content,
  .dashboard-content,
  .loading-screen,
  .splash-screen,
  .custom-cursor-wrapper {
    display: none !important;
  }
}
</style>

