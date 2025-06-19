<script setup>

</script>

<template>

  <div class="separator"></div>

</template>

<style scoped lang="scss">
@use "../assets/styles/variables/colors" as colors;
@use "../assets/styles/variables/base" as base;
@use "../assets/styles/variables/breakpoints" as breakpoints;

.separator {
  width: 120px;
  max-width: 15%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(colors.color("orange", "primary"), 0.3) 20%,
    colors.color("orange", "primary") 50%,
    rgba(colors.color("orange", "primary"), 0.3) 80%,
    transparent 100%
  );
  border-radius: 2px;
  margin: base.$margin-xl auto;
  position: relative;
  
  @media (max-width: breakpoints.$breakpoint-md) {
    width: 100px;
    max-width: 20%;
    height: 2px;
    margin: base.$margin-lg auto;
  }
  
  @media (max-width: breakpoints.$breakpoint-sm) {
    width: 80px;
    max-width: 25%;
    height: 2px;
    margin: base.$margin-md auto;
  }
  
  @media (max-width: breakpoints.$breakpoint-xs) {
    width: 60px;
    max-width: 30%;
    margin: base.$margin-sm auto;
  }
  
  // Add a subtle glow effect
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(4px);
    opacity: 0.5;
    z-index: -1;
  }
}
</style>
