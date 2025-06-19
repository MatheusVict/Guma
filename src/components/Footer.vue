<script setup>
import GumaLogo from "@/assets/img/guma.svg";
</script>

<template>
  <footer>
    <img :src="GumaLogo" alt="">
    <h6>Guma Agent</h6>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/mixins/flex" as flex;
@use "../assets/styles/variables/colors" as colors;
@use "../assets/styles/variables/base" as base;
@use "../assets/styles/variables/typography" as typography;
@use "../assets/styles/variables/breakpoints" as breakpoints;

footer {
  @include flex.flex-column(center, center, no-wrap, base.$size-md);
  padding: base.$padding-xxl base.$padding-lg;
  background: linear-gradient(135deg, 
    colors.color("dark", "primary"), 
    colors.color("dark", "dark-2")
  );
  color: colors.color("neutral", "white-off");
  width: 100%;
  margin-top: base.$margin-xxl;
  border-top: 1px solid rgba(colors.color("neutral", "gray-dark"), 0.3);
  
  @media (max-width: breakpoints.$breakpoint-md) {
    padding: base.$padding-xl base.$padding-md;
    margin-top: base.$margin-xl;
  }
  
  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: base.$padding-lg base.$padding-sm;
    margin-top: base.$margin-lg;
  }
  
  img {
    max-width: 80px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 12px rgba(colors.color("orange", "primary"), 0.3));
    
    @media (max-width: breakpoints.$breakpoint-md) {
      max-width: 60px;
    }
    
    @media (max-width: breakpoints.$breakpoint-sm) {
      max-width: 50px;
    }
  }
  
  h6 {
    font-family: typography.$font-secondary;
    font-size: map-get(typography.$font-sizes, 'lg');
    font-weight: map-get(typography.$font-weights, 'semi-bold');
    color: colors.color("neutral", "white-off");
    margin: 0;
    text-align: center;
    
    @media (max-width: breakpoints.$breakpoint-md) {
      font-size: map-get(typography.$font-sizes, 'base');
    }
    
    @media (max-width: breakpoints.$breakpoint-sm) {
      font-size: map-get(typography.$font-sizes, 'sm');
    }
  }
}
</style>
