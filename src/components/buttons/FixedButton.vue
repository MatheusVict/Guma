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
@import "../../assets/styles/components/buttons/fixed-button/index";
</style>
