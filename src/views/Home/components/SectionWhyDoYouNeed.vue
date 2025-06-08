<script setup>
import {WHY_DO_YOU_NEED} from "@/store/whyDoYouNeed.js";


</script>

<template>

  <section class="why-do-you-need">
    <header>
      <h2>Why do you need to use Guma Agent?</h2>
    </header>

    <div class="boxes">
      <div v-for="(reason) in WHY_DO_YOU_NEED" :key="reason.id" class="box">
        <div class="box__icon">
          <img :src="reason.img" alt="">
        </div>
        <div class="box__content">
          <h3>{{ reason.title }}</h3>
          <p>
            {{ reason.description }}
          </p>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">

</style>
