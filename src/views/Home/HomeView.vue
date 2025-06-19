<script setup>
import Hero from '../../components/Hero.vue'
import Separator from "@/components/Separator.vue";
import SectionWhyDoYouNeed from "@/views/Home/components/SectionWhyDoYouNeed.vue";
import SectionHowDoesItWork from "@/views/Home/components/SectionHowDoesItWork.vue";
import SectionHowToUseIt from "@/views/Home/components/SectionHowToUseIt.vue";
import SectionIsThatForMe from "@/views/Home/components/SectionIsThatForMe.vue";
import Footer from "@/components/Footer.vue";
import HamburgerMenu from "@/components/HamburgerMenu.vue";
</script>

<template>
  <main>
    <!-- Hamburger Menu -->
    <HamburgerMenu />
    
    <!-- Hero Section -->
    <section id="hero">
      <Hero/>
    </section>

    <Separator/>

    <!-- Why Do You Need Section -->
    <section id="why-do-you-need">
      <SectionWhyDoYouNeed/>
    </section>

    <Separator/>

    <!-- How Does It Work Section -->
    <section id="how-does-it-work">
      <SectionHowDoesItWork/>
    </section>

    <Separator/>

    <!-- How To Use It Section -->
    <section id="how-to-use-it">
      <SectionHowToUseIt/>
    </section>

    <Separator/>

    <!-- Is That For Me Section -->
    <section id="is-that-for-me">
      <SectionIsThatForMe/>
    </section>

    <Footer/>
  </main>
</template>

<style lang="scss" scoped>
@use "../../assets/styles/variables/colors" as colors;
@use "../../assets/styles/variables/base" as base;
@use "../../assets/styles/mixins/flex" as flex;

main {
  background-color: colors.color("dark", "dark-2");
  @include flex.flex-column(flex-start, center, no-wrap, base.$size-xxxxl);
  color: colors.color("neutral", "white-off");
}

</style>
