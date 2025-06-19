<script setup>
import ButtonPrimary from "../components/buttons/ButtonPrimary.vue";
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const goToApp = () => {
  router.push('/app')
}
</script>

<template>
  <div class="hero">
    <div class="hero-image">
      <img src="../assets/img/guma.svg" alt="Guma Agent"/>
    </div>

    <div class="hero-divider"></div>

    <div class="hero-content">
      <div class="hero-text">
        <h1>Guma Agent</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eius eligendi id ipsum labore minus nam nemo similique temporibus ullam!
        </p>
      </div>

      <div class="hero-button">
        <ButtonPrimary text="Get it now" @click="goToApp"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/components/hero/hero";
</style>
