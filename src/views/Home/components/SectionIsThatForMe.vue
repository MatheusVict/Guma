<template>
  <section class="main-content">
    <header>
      <h2>Is that for <span class="text-accent">me</span>?</h2>
    </header>

    <div class="content">
      <aside>
        <img :src="StudentCatWithBook" alt="Student cat with book"/>
      </aside>

      <article>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt in officiis possimus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque odit quae repudiandae!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque odit quae repudiandae!</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import StudentCatWithBook from "@/assets/img/homeSections/student-cat-with-book.svg";
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/components/is-that-for-me/index";
</style>
