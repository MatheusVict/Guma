<script setup>
import { useRouter } from 'vue-router'
import Hero from '../../components/Hero.vue'
import Separator from "@/components/Separator.vue";
import SectionWhyDoYouNeed from "@/views/Home/components/SectionWhyDoYouNeed.vue";
import SectionHowDoesItWork from "@/views/Home/components/SectionHowDoesItWork.vue";
import SectionHowToUseIt from "@/views/Home/components/SectionHowToUseIt.vue";
import SectionIsThatForMe from "@/views/Home/components/SectionIsThatForMe.vue";
import Footer from "@/components/Footer.vue";
import HamburgerMenu from "@/components/HamburgerMenu.vue";
import FixedButton from "@/components/buttons/FixedButton.vue";
</script>

<template>
  <main>
    <HamburgerMenu />

    <FixedButton/>

    <section id="hero">
      <Hero/>
    </section>

    <Separator/>

    <section id="why-do-you-need">
      <SectionWhyDoYouNeed/>
    </section>

    <Separator/>

    <section id="how-does-it-work">
      <SectionHowDoesItWork/>
    </section>

    <Separator/>

    <section id="how-to-use-it">
      <SectionHowToUseIt/>
    </section>

    <Separator/>

    <section id="is-that-for-me">
      <SectionIsThatForMe/>
    </section>

    <Footer/>
  </main>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/components/home/index";
</style>
