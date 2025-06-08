<script setup>
import Hero from '../../components/Hero.vue'
import Separator from "@/components/Separator.vue";
import SectionWhyDoYouNeed from "@/views/Home/components/SectionWhyDoYouNeed.vue";
import SectionHowDoesItWork from "@/views/Home/components/SectionHowDoesItWork.vue";
import SectionHowToUseIt from "@/views/Home/components/SectionHowToUseIt.vue";
import SectionIsThatForMe from "@/views/Home/components/SectionIsThatForMe.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main>
    <Hero/>

    <Separator/>

    <SectionWhyDoYouNeed/>

    <Separator/>

    <SectionHowDoesItWork/>

    <Separator/>

    <SectionHowToUseIt/>

    <Separator/>

    <SectionIsThatForMe/>

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
