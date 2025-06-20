<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <button
    class="about-us-btn"
    @click="goToAbout"
    title="Learn About Us"
  >
    <img src="/imgs/about_us.svg" alt="About Us"/>
  </button>
</template>

<style scoped lang="scss">
@use "../../assets/styles/variables/colors" as colors;
@use "../../assets/styles/variables/base" as base;
@use "../../assets/styles/variables/breakpoints" as breakpoints;
@use "../../assets/styles/mixins/flex" as flex;

.about-us-btn {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 90px;
    height: 90px;
    display: block;
    border-radius: 50%;
  }

  // Responsive adjustments
  @media (max-width: breakpoints.$breakpoint-md) {
    bottom: 1.5rem;
    left: 1.5rem;

    img {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    bottom: 1rem;
    left: 1rem;

    img {
      width: 45px;
      height: 45px;
    }
  }
}
</style>
