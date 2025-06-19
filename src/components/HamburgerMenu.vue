<template>
  <div class="hamburger-menu">
    <button
      class="hamburger-button"
      :class="{ 'active': isMenuOpen }"
      @click="toggleMenu"
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <div
      class="overlay"
      :class="{ 'active': isMenuOpen }"
      @click="closeMenu"
    ></div>

    <nav
      class="menu"
      :class="{ 'active': isMenuOpen }"
    >
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/" @click="closeMenu" class="menu-link">
            Home
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about" @click="closeMenu" class="menu-link">
            About Opaleiros
          </router-link>
        </li>
        <li class="menu-item" v-if="$route.name === 'home'">
          <a href="#why-do-you-need" @click="scrollToSection('why-do-you-need')" class="menu-link">
            Why Do You Need
          </a>
        </li>
        <li class="menu-item" v-if="$route.name === 'home'">
          <a href="#how-does-it-work" @click="scrollToSection('how-does-it-work')" class="menu-link">
            How Does It Work
          </a>
        </li>
        <li class="menu-item" v-if="$route.name === 'home'">
          <a href="#how-to-use-it" @click="scrollToSection('how-to-use-it')" class="menu-link">
            How To Use It
          </a>
        </li>
        <li class="menu-item" v-if="$route.name === 'home'">
          <a href="#is-that-for-me" @click="scrollToSection('is-that-for-me')" class="menu-link">
            Is That For Me
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = window.innerWidth <= 576 ? 60 : 80
    const elementPosition = element.offsetTop - offset

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
  closeMenu()
}

const handleClickOutside = (event) => {
  const menu = document.querySelector('.menu')
  const button = document.querySelector('.hamburger-button')

  if (isMenuOpen.value &&
    !menu?.contains(event.target) &&
    !button?.contains(event.target)) {
    closeMenu()
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

const toggleBodyScroll = (disable) => {
  if (window.innerWidth <= 576) {
    document.body.style.overflow = disable ? 'hidden' : ''
  }
}

watch(isMenuOpen, (newValue) => {
  toggleBodyScroll(newValue)
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
  toggleBodyScroll(false) // Ensure body scroll is restored
})
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/hamburger-menu/index";
</style>
