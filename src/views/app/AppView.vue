<script setup lang="ts">
import MultiStepSelector from '../../components/MultiStepSelector.vue'
</script>

<template>
  <div class="app-view">
    <div class="container">
      <header class="app-header">
        <img src="../../assets/img/guma.svg" alt="Guma Agent"/>
        <h1 class="app-title">Guma Agent</h1>
      </header>

      <main class="app-main">
        <MultiStepSelector />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../assets/styles/variables/colors" as colors;
@use "../../assets/styles/variables/base" as base;
@use "../../assets/styles/variables/typography" as typography;
@use "../../assets/styles/variables/breakpoints" as breakpoints;
@use "../../assets/styles/mixins/flex" as flex;

.app-view {
  min-height: 100vh;
  padding: base.$padding-xl 0;

  @media (max-width: breakpoints.$breakpoint-md) {
    padding: base.$padding-lg 0;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: base.$padding-md 0;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 base.$padding-lg;

  @media (max-width: breakpoints.$breakpoint-md) {
    padding: 0 base.$padding-md;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: 0 base.$padding-sm;
  }
}

.app-header {
  @include flex.flex-row();
  justify-content: center;

  text-align: center;
  margin-bottom: base.$margin-xxl;

  gap: 5rem;

  @media (max-width: breakpoints.$breakpoint-md) {
    margin-bottom: base.$margin-xl;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    margin-bottom: base.$margin-lg;
  }
}

.app-title {
  font-family: typography.$font-secondary;
  font-size: map-get(typography.$font-sizes, '4xl');
  font-weight: map-get(typography.$font-weights, 'bold');
  margin-bottom: base.$margin-lg;
  text-shadow: 0 2px 4px rgba(colors.color("dark", "primary"), 0.3);

  @media (max-width: breakpoints.$breakpoint-md) {
    font-size: map-get(typography.$font-sizes, '3xl');
    margin-bottom: base.$margin-md;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    font-size: map-get(typography.$font-sizes, '2xl');
    margin-bottom: base.$margin-sm;
  }
}

.app-description {
  font-family: typography.$font-primary;
  font-size: map-get(typography.$font-sizes, 'lg');
  font-weight: map-get(typography.$font-weights, 'regular');
  color: colors.color("neutral", "white-off");
  max-width: 600px;
  margin: 0 auto;
  line-height: map-get(typography.$line-heights, 'relaxed');

  @media (max-width: breakpoints.$breakpoint-md) {
    font-size: map-get(typography.$font-sizes, 'md');
    max-width: 500px;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    font-size: map-get(typography.$font-sizes, 'base');
    max-width: 100%;
  }
}

.app-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
