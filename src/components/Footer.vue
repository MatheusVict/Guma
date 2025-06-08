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

footer {
  @include flex.flex-column(center, center, no-wrap, base.$size-sm);
  padding: 1rem;
  background-color: colors.color("dark");
  color: #fff;
  width: base.$size-100-percent;
}
</style>
