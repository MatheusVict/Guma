<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import HamburgerMenu from '@/components/HamburgerMenu.vue'

import maraya from '../../public/maraya.png'
import mrpunk from '../../public/mrpunkk.png'
import matheus from '../../public/matheus.png'

const teamMembers = ref([
  {
    id: 1,
    name: 'Matheus',
    description: 'The visionary architect who turns coffee into code and dreams into digital reality. Master of late-night debugging sessions.',
    image: matheus,
    delay: '0s'
  },
  {
    id: 2,
    name: 'Mariah',
    description: 'The creative genius who paints pixels with passion and designs experiences that make hearts skip a beat.',
    image: maraya,
    delay: '0.2s'
  },
  {
    id: 3,
    name: 'Gustavo',
    description: 'The problem-solving wizard who speaks fluent algorithm and has a superpower for making complex things simple.',
    image: mrpunk,
    delay: '0.4s'
  }
])

const isLoaded = ref(false)
const audioRef = ref(null)
const audioContext = ref(null)
const oscillator = ref(null)

const createAmbientSound = () => {
  try {
    // Create a simple ambient sound using Web Audio API
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()

    // Create oscillator for ambient sound
    oscillator.value = audioContext.value.createOscillator()
    const gainNode = audioContext.value.createGain()

    // Configure oscillator for ambient sound
    oscillator.value.type = 'sine'
    oscillator.value.frequency.setValueAtTime(220, audioContext.value.currentTime) // A3 note

    // Very low volume
    gainNode.gain.setValueAtTime(0.02, audioContext.value.currentTime)

    // Connect nodes
    oscillator.value.connect(gainNode)
    gainNode.connect(audioContext.value.destination)

    // Start the sound
    oscillator.value.start()

    // Add some variation to make it more ambient
    setInterval(() => {
      if (oscillator.value && audioContext.value) {
        const frequency = 220 + Math.sin(Date.now() / 1000) * 20
        oscillator.value.frequency.setValueAtTime(frequency, audioContext.value.currentTime)
      }
    }, 100)

  } catch (error) {
    console.log('Web Audio API not supported or blocked')
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  const startAudio = () => {
    createAmbientSound()
    document.removeEventListener('click', startAudio)
    document.removeEventListener('keydown', startAudio)
  }

  document.addEventListener('click', startAudio)
  document.addEventListener('keydown', startAudio)
})

onUnmounted(() => {
  if (oscillator.value) {
    oscillator.value.stop()
    oscillator.value = null
  }
  if (audioContext.value) {
    audioContext.value.close()
    audioContext.value = null
  }
})
</script>

<template>
  <main class="about-page">
    <HamburgerMenu />

    <div class="floating-elements">
      <div class="floating-circle floating-circle-1"></div>
      <div class="floating-circle floating-circle-2"></div>
      <div class="floating-circle floating-circle-3"></div>
      <div class="floating-triangle floating-triangle-1"></div>
      <div class="floating-triangle floating-triangle-2"></div>
    </div>

    <section class="hero-section" :class="{ 'loaded': isLoaded }">
      <div class="hero-content">
        <h1 class="main-title">Know Opaleiros</h1>
        <p class="hero-description">
          We are the team that build the Jala U prime.
          Three passionate individuals united by code, creativity, and countless cups of coffee.
        </p>
      </div>
    </section>

    <section class="team-section">
      <div class="team-grid">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="team-member"
          :class="{ 'loaded': isLoaded }"
          :style="{ 'animation-delay': member.delay }"
        >
          <div class="member-card">
            <div class="member-image-container">
              <div class="member-image">
                <div class="placeholder-avatar">
                    <img :src="member.image" alt="" class="avatar-initial"/>
                </div>
                <div class="overlay">
                </div>
                <div class="image-overlay"></div>
              </div>
            </div>

            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-description">{{ member.description }}</p>
            </div>

            <div class="card-decoration card-decoration-1"></div>
            <div class="card-decoration card-decoration-2"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-opaleiros-section" :class="{ 'loaded': isLoaded }">
      <div class="about-opaleiros-content">
        <h2 class="section-title">What is Opaleiros?</h2>
        <div class="opaleiros-story">
          <div class="story-text">
            <p class="story-paragraph">
              <strong>Opaleiros</strong> is more than just a team name – it's our identity, our philosophy, and our promise.
              Derived from the Portuguese word for "opal workers," we are digital craftsmen who shape raw ideas into
              brilliant, multifaceted experiences.
            </p>
            <p class="story-paragraph">
              Like the precious opal stone that displays a spectrum of colors depending on the angle of light,
              our work reflects different dimensions of creativity, innovation, and technical excellence.
              We believe that every project is a unique gem waiting to be discovered and polished to perfection.
            </p>
            <p class="story-paragraph">
              Founded on the principles of collaboration, creativity, and continuous learning, Opaleiros represents
              our commitment to transforming the digital landscape one project at a time. We don't just build applications –
              we craft digital experiences that resonate, inspire, and endure.
            </p>
          </div>
          <div class="story-visual">
            <div class="opal-animation">
              <div class="opal-core"></div>
              <div class="opal-layer opal-layer-1"></div>
              <div class="opal-layer opal-layer-2"></div>
              <div class="opal-layer opal-layer-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="join-us-section" :class="{ 'loaded': isLoaded }">
      <div class="join-us-content">
        <h2 class="section-title">Join the Opaleiros Family</h2>
        <p class="join-description">
          Are you passionate about creating exceptional digital experiences?
          Do you believe in the power of collaboration and innovation?
          We're always looking for talented individuals who share our vision.
        </p>

        <div class="join-features">
          <div class="feature-item">
            <div class="feature-icon">
              <span class="icon">🚀</span>
            </div>
            <h3 class="feature-title">Innovation First</h3>
            <p class="feature-description">Work with cutting-edge technologies and push the boundaries of what's possible.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon">
              <span class="icon">🤝</span>
            </div>
            <h3 class="feature-title">Collaborative Spirit</h3>
            <p class="feature-description">Join a team where every voice matters and creativity flourishes through collaboration.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon">
              <span class="icon">🌟</span>
            </div>
            <h3 class="feature-title">Growth Mindset</h3>
            <p class="feature-description">Continuous learning and personal development are at the core of our culture.</p>
          </div>
        </div>

        <div class="join-cta">
          <h3 class="cta-title">Ready to Shape the Future?</h3>
          <p class="cta-description">
            Whether you're a developer, designer, or digital strategist, if you're passionate about creating
            meaningful digital experiences, we want to hear from you.
          </p>
          <div class="cta-buttons">
            <button class="cta-button primary">Get In Touch</button>
            <button class="cta-button secondary">View Opportunities</button>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-section" :class="{ 'loaded': isLoaded }">
      <div class="bottom-content">
        <h2 class="section-title">Together We Create Magic</h2>
        <p class="section-description">
          From concept to creation, we blend technical expertise with creative vision
          to build digital experiences that inspire and engage.
        </p>
        <div class="stats-container">
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">Creative Minds</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">∞</span>
            <span class="stat-label">Possibilities</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">1</span>
            <span class="stat-label">Shared Vision</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/styles/pages/about-view/index";
</style>
