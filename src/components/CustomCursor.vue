<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dotX = ref(0)
const dotY = ref(0)
const ringX = ref(0)
const ringY = ref(0)
const isHovered = ref(false)
const isClicked = ref(false)
const isHidden = ref(true)

const updateCoords = (e) => {
  dotX.value = e.clientX
  dotY.value = e.clientY
  
  if (isHidden.value) isHidden.value = false
  
  ringX.value = e.clientX
  ringY.value = e.clientY
}

const handleMouseDown = () => {
  isClicked.value = true
}

const handleMouseUp = () => {
  isClicked.value = false
}

const handleMouseLeave = () => {
  isHidden.value = true
}

const handleMouseEnter = () => {
  isHidden.value = false
}

// Add listeners to detect hovering over interactive elements
const addHoverListeners = () => {
  const hoverables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .clickable')
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', onHoverStart)
    el.addEventListener('mouseleave', onHoverEnd)
  })
}

const onHoverStart = () => {
  isHovered.value = true
}

const onHoverEnd = () => {
  isHovered.value = false
}

let observer = null

onMounted(() => {
  window.addEventListener('mousemove', updateCoords)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseenter', handleMouseEnter)
  
  // Initial hover listeners
  addHoverListeners()
  
  // Observe DOM changes to re-attach hover listeners to new dynamic elements
  observer = new MutationObserver(() => {
    addHoverListeners()
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCoords)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseenter', handleMouseEnter)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div 
    :class="[
      'custom-cursor-wrapper', 
      { 'is-hovered': isHovered, 'is-clicked': isClicked, 'is-hidden': isHidden }
    ]"
  >
    <!-- Outer Ring (trailing) -->
    <div 
      class="cursor-ring" 
      :style="{ 
        transform: `translate3d(${ringX - (isHovered ? 27 : isClicked ? 15 : 18)}px, ${ringY - (isHovered ? 27 : isClicked ? 15 : 18)}px, 0)`,
        width: `${isHovered ? 54 : isClicked ? 30 : 36}px`,
        height: `${isHovered ? 54 : isClicked ? 30 : 36}px`
      }"
    ></div>
    <!-- Inner Dot (exact position) -->
    <div 
      class="cursor-dot" 
      :style="{ transform: `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)` }"
    ></div>
  </div>
</template>

<style scoped>
/* Only enable custom cursor on devices that support hover (desktops/laptops) */
@media (hover: hover) {
  .custom-cursor-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 99999;
    transition: opacity 0.3s ease;
  }

  .cursor-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 100000;
    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
    box-shadow: 0 0 10px var(--accent);
    will-change: transform;
  }

  .cursor-ring {
    position: absolute;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: transform 0.1s cubic-bezier(0.1, 0.8, 0.25, 1), width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.25s;
    will-change: transform, width, height;
    opacity: 0.85;
    box-shadow: 0 0 8px rgba(181, 255, 43, 0.2);
  }

  /* Hover states */
  .is-hovered .cursor-dot {
    width: 4px;
    height: 4px;
    opacity: 0;
  }

  .is-hovered .cursor-ring {
    border-color: #ffffff;
    background-color: rgba(181, 255, 43, 0.15); /* Light glowing green core */
    box-shadow: 0 0 20px rgba(181, 255, 43, 0.5);
  }

  /* Click states */
  .is-clicked .cursor-ring {
    background-color: rgba(181, 255, 43, 0.4);
    border-color: var(--accent);
    box-shadow: 0 0 15px var(--accent);
  }

  .is-clicked .cursor-dot {
    width: 6px;
    height: 6px;
    opacity: 1;
  }

  .is-hidden {
    opacity: 0;
  }
}
</style>
