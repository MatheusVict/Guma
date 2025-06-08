<template>
  <section class="how-to-use-it">
    <header>
      <h2>How to use it?</h2>
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
.how-to-use-it {
  padding: 2rem 0;

  .wrapper {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
  }

  .stepsNumber-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .step-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      font-weight: bold;
      transform: scale(1.05);
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  .steps-content {
    flex: 1;
    padding: 1rem;

    h3 {
      margin-bottom: 1rem;
    }
  }
}
</style>
