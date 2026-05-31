<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)
  
  const particles = []
  const maxParticles = 65 // Reduced slightly for perfect performance
  const connectionDistance = 110
  const mouse = { x: null, y: null, radius: 150 }

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.vx = (Math.random() - 0.5) * 0.4 // Slow, elegant movement
      this.vy = (Math.random() - 0.5) * 0.4
      this.radius = Math.random() * 2 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      // Bounce off screen boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1
      if (this.y < 0 || this.y > height) this.vy *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(181, 255, 43, 0.5)' // Translucent neon-lime
      ctx.fill()
    }
  }

  // Populate particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle())
  }

  // Resize handler
  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  // Mouse move handler
  const handleMouseMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
  
  const handleMouseLeave = () => {
    mouse.x = null
    mouse.y = null
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)

  // Animation Loop
  const animate = () => {
    ctx.clearRect(0, 0, width, height)

    // Update and draw particles
    particles.forEach(p => {
      p.update()
      p.draw()
    })

    // Draw connecting lines (constellation network)
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]
      
      // Connection to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x
        const dy = p1.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.25
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(181, 255, 43, ${alpha})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      // Connection to other particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(181, 255, 43, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="particles-canvas"></canvas>
</template>

<style scoped>
.particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 3; /* Render on top of grid background, under public-content text */
}
</style>
