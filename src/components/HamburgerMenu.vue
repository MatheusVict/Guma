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

    <!-- Menu -->
    <nav
      class="menu"
      :class="{ 'active': isMenuOpen }"
    >
      <ul class="menu-list">
        <li class="menu-item">
          <a href="#hero" @click="scrollToSection('hero')" class="menu-link">
            Home
          </a>
        </li>
        <li class="menu-item">
          <a href="#why-do-you-need" @click="scrollToSection('why-do-you-need')" class="menu-link">
            Why Do You Need
          </a>
        </li>
        <li class="menu-item">
          <a href="#how-does-it-work" @click="scrollToSection('how-does-it-work')" class="menu-link">
            How Does It Work
          </a>
        </li>
        <li class="menu-item">
          <a href="#how-to-use-it" @click="scrollToSection('how-to-use-it')" class="menu-link">
            How To Use It
          </a>
        </li>
        <li class="menu-item">
          <a href="#is-that-for-me" @click="scrollToSection('is-that-for-me')" class="menu-link">
            Is That For Me
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

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

// Watch for menu state changes
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
@use "../assets/styles/variables/colors" as colors;
@use "../assets/styles/variables/base" as base;
@use "../assets/styles/variables/breakpoints" as breakpoints;
@use "../assets/styles/variables/typography" as typography;

.hamburger-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}

.hamburger-button {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: colors.color("orange", "primary");
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  z-index: 1002;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  // Mobile optimizations
  @media (max-width: breakpoints.$breakpoint-sm) {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    gap: 3px;
  }

  @media (max-width: breakpoints.$breakpoint-xs) {
    top: 12px;
    right: 12px;
    width: 42px;
    height: 42px;
  }

  &:hover {
    background: colors.color("orange", "dark-1");
    transform: scale(1.05);

    // Disable hover effects on touch devices
    @media (hover: none) {
      transform: none;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background: colors.color("red", "primary");

    .hamburger-line {
      &:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);

        @media (max-width: breakpoints.$breakpoint-sm) {
          transform: rotate(45deg) translate(5px, 5px);
        }
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);

        @media (max-width: breakpoints.$breakpoint-sm) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }
  }
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: colors.color("neutral", "white-off");
  border-radius: 2px;
  transition: all 0.3s ease;

  @media (max-width: breakpoints.$breakpoint-sm) {
    width: 22px;
    height: 2.5px;
  }

  @media (max-width: breakpoints.$breakpoint-xs) {
    width: 20px;
    height: 2px;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.menu {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 280px;
  background: colors.color("dark", "dark-2");
  border-radius: 12px;
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1001;
  padding: 20px 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid colors.color("neutral", "gray-dark");

  // Tablet adjustments
  @media (max-width: breakpoints.$breakpoint-md) {
    width: 260px;
    top: 75px;
  }

  // Mobile adjustments
  @media (max-width: breakpoints.$breakpoint-sm) {
    top: 70px;
    right: 15px;
    width: 240px;
    padding: 16px 0;
    border-radius: 10px;
  }

  // Small mobile - center the menu
  @media (max-width: breakpoints.$breakpoint-xs) {
    width: calc(100vw - 24px);
    right: 12px;
    left: 12px;
    top: 65px;
    padding: 12px 0;
    border-radius: 8px;
  }

  // Very small screens - full width with minimal margins
  @media (max-width: 280px) {
    width: calc(100vw - 16px);
    right: 8px;
    left: 8px;
    top: 60px;
  }

  &.active {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }

  // Add a subtle arrow pointing to the hamburger button
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 25px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid colors.color("dark", "dark-2");

    @media (max-width: breakpoints.$breakpoint-sm) {
      right: 22px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid colors.color("dark", "dark-2");
    }

    @media (max-width: breakpoints.$breakpoint-xs) {
      // Center the arrow on small screens
      right: 50%;
      transform: translateX(50%);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: -9px;
    right: 25px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid colors.color("neutral", "gray-dark");

    @media (max-width: breakpoints.$breakpoint-sm) {
      right: 22px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid colors.color("neutral", "gray-dark");
    }

    @media (max-width: breakpoints.$breakpoint-xs) {
      // Center the arrow on small screens
      right: 50%;
      transform: translateX(50%);
    }
  }
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 4px 12px;
  border-radius: 8px;
  overflow: hidden;

  a {
    font-family: typography.$font-secondary;
  }

  // Mobile adjustments
  @media (max-width: breakpoints.$breakpoint-sm) {
    margin: 3px 10px;
    border-radius: 6px;
  }

  @media (max-width: breakpoints.$breakpoint-xs) {
    margin: 2px 8px;
    border-radius: 4px;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.menu-link {
  display: block;
  padding: 16px 20px;
  color: colors.color("neutral", "white-off");
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;

  // Tablet adjustments
  @media (max-width: breakpoints.$breakpoint-md) {
    padding: 15px 18px;
    font-size: 15px;
  }

  // Mobile adjustments
  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: 14px 16px;
    font-size: 14px;
    border-radius: 6px;
  }

  // Small mobile adjustments
  @media (max-width: breakpoints.$breakpoint-xs) {
    padding: 12px 14px;
    font-size: 13px;
    border-radius: 4px;
  }

  // Very small screens
  @media (max-width: 280px) {
    padding: 10px 12px;
    font-size: 12px;
  }

  &:hover {
    background: colors.color("orange", "primary");
    color: colors.color("neutral", "white-off");
    transform: translateX(4px);

    // Disable hover transform on touch devices
    @media (hover: none) {
      transform: none;
    }

    @media (max-width: breakpoints.$breakpoint-sm) {
      transform: translateX(2px);
    }
  }

  // Active/focus states for better mobile accessibility
  &:active,
  &:focus {
    background: colors.color("orange", "dark-1");
    outline: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 0;
    width: 3px;
    background: colors.color("orange", "primary");
    border-radius: 0 2px 2px 0;
    transition: height 0.3s ease;

    @media (max-width: breakpoints.$breakpoint-sm) {
      width: 2px;
    }
  }

  &:hover::before {
    height: 60%;
  }
}
</style>
