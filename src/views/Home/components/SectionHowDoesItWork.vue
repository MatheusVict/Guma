<script setup>
import Image1 from "@/assets/img/homeSections/two-serious-business-cats-in-suits.svg";
</script>


<template>
  <section class="how-does-it-work">
    <header>
      <h2>How <strong class="text-accent">does</strong> it work?</h2>
    </header>

    <article>
      <img :src="Image1" alt="two serious business cats in suits">
      <video poster="../../../assets/img/homeSections/poster-video.svg">
        <source src="">
      </video>
    </article>
  </section>
</template>


<style lang="scss" scoped>
@import "../../../assets/styles/components/how-does-it-works/index";
</style>
