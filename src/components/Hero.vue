<script setup>
import ButtonPrimary from "../components/buttons/ButtonPrimary.vue";
</script>

<template>
  <div class="hero">
    <div class="hero-image">
      <img src="../assets/img/guma.svg" alt="Guma Agent"/>
    </div>

    <div class="hero-divider"></div>

    <div class="hero-content">
      <div class="hero-text">
        <h1>Guma Agent: Pare de Adivinhar, Comece a Acertar.</h1>

        <p>
          Cansado de rubricas confusas e feedbacks que não ajudam? O <strong>Guma Agent</strong> é seu assistente de IA
          que analisa suas tarefas acadêmicas, alinha com os critérios do Canvas e te dá o <em>feedback exato</em> para
          você <strong>melhorar cada entrega e gabaritar suas disciplinas</strong>. <strong>Não perca mais tempo com a
          dúvida. Comece a dominar suas entregas hoje.</strong>
        </p>
      </div>

      <div class="hero-button">
        <ButtonPrimary text="Experimente Agora!"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/components/hero/hero";
</style>
