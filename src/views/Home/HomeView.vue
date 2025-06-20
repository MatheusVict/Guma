<script setup>
import {useRouter} from 'vue-router'
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
    <div class="wrapper">
      <HamburgerMenu/>

      <FixedButton/>

      <Hero/>

      <Separator/>

      <SectionWhyDoYouNeed/>

      <Separator/>

      <SectionHowDoesItWork/>

      <Separator/>

      <SectionHowToUseIt/>

      <Separator/>

      <SectionIsThatForMe/>

    </div>
    <Footer/>
  </main>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/pages/home/index";
</style>
