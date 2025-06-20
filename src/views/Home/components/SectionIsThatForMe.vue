<template>
  <section class="is-that-for-me">
    <header>
      <h2>Is that for <span class="text-accent">me</span>?</h2>
    </header>

    <div class="content">
      <aside>
        <img :src="StudentCatWithBook" alt="Student cat with book"/>
      </aside>

      <article>
        <p>
          Sim! O <strong>Guma Agent</strong> foi desenvolvido para qualquer <em>estudante universitário</em> que busca
          aprimorar suas entregas e alcançar <strong>melhores resultados</strong>.
        </p>
        <p>
          É para você que fica <strong>perdido nas rubricas e critérios de avaliação do Canvas</strong>, para quem
          deseja um <em>feedback detalhado e personalizado</em> antes de entregar suas tarefas, e para quem quer, de
          fato, <strong>melhorar suas notas</strong>, <strong>otimizar o tempo de estudo</strong> e ter a certeza de que
          está sempre entregando o <strong>seu melhor trabalho</strong> em todas as disciplinas.
        </p>
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
