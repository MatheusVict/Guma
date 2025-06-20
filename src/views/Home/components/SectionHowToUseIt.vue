<template>
  <section class="how-to-use-it" id="how-to-use-it">
    <header>
      <h2>How to <span class="text-accent">use</span> it?</h2>
    </header>

    <div class="wrapper">
      <div class="stepsNumber-container">
        <div class="step" v-for="step in steps" :key="step.id">
          <button
            class="step-button"
            @click="switchStep(step.id)"
            :class="{ active: currentStep === step.id }"
          >
            <img :src="getIcon(step.id)" alt="Step"/>
            <span>Step {{ step.id }}</span>
          </button>
        </div>
      </div>

      <div class="steps-content">
        <h3>{{ currentStepData.title }}</h3>
        <p>{{ currentStepData.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import FootIcon from "@/assets/icons/interface/FootIcon.svg";
import FinalStepIcon from "@/assets/icons/interface/CelebrationIcon.svg";
import { HOW_TO_USE_IT_STEPS } from "@/store/howToUseIt.js";

const steps = HOW_TO_USE_IT_STEPS;
const currentStep = ref(1);

function switchStep(stepId) {
  currentStep.value = stepId;
}

const currentStepData = computed(() => {
  return steps.find(step => step.id === currentStep.value) || steps[0];
});

// Function to get the appropriate icon
function getIcon(stepId) {
  return stepId === steps.length ? FinalStepIcon : FootIcon;
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/components/how-to-use-it";
</style>
