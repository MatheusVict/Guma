<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SelectInput from './SelectInput.vue'
import ButtonPrimary from './buttons/ButtonPrimary.vue'

interface SelectOption {
  value: string | number
  label: string
}

interface StepData {
  step: number
  firstSelect: {
    value: string | number | null
    label: string
    options: SelectOption[]
  }
  secondSelect: {
    value: string | number | null
    label: string
    options: SelectOption[]
  }
}


const disciplines: SelectOption[] = [
  { value: 'math', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'computer-science', label: 'Computer Science' }
]

const professors: Record<string, SelectOption[]> = {
  'math': [
    { value: 'prof-smith', label: 'Prof. Smith' },
    { value: 'prof-johnson', label: 'Prof. Johnson' },
    { value: 'prof-williams', label: 'Prof. Williams' }
  ],
  'physics': [
    { value: 'prof-brown', label: 'Prof. Brown' },
    { value: 'prof-davis', label: 'Prof. Davis' }
  ],
  'chemistry': [
    { value: 'prof-miller', label: 'Prof. Miller' },
    { value: 'prof-wilson', label: 'Prof. Wilson' }
  ],
  'biology': [
    { value: 'prof-moore', label: 'Prof. Moore' },
    { value: 'prof-taylor', label: 'Prof. Taylor' }
  ],
  'computer-science': [
    { value: 'prof-anderson', label: 'Prof. Anderson' },
    { value: 'prof-thomas', label: 'Prof. Thomas' }
  ]
}

const assignments: SelectOption[] = [
  { value: 'assignment-1', label: 'Assignment 1: Basic Concepts' },
  { value: 'assignment-2', label: 'Assignment 2: Advanced Topics' },
  { value: 'assignment-3', label: 'Assignment 3: Research Project' },
  { value: 'assignment-4', label: 'Assignment 4: Case Study' },
  { value: 'assignment-5', label: 'Assignment 5: Final Project' }
]

const rubrics: SelectOption[] = [
  { value: 'rubric-basic', label: 'Basic Evaluation Rubric' },
  { value: 'rubric-detailed', label: 'Detailed Assessment Rubric' },
  { value: 'rubric-research', label: 'Research Project Rubric' },
  { value: 'rubric-presentation', label: 'Presentation Rubric' },
  { value: 'rubric-comprehensive', label: 'Comprehensive Evaluation Rubric' }
]

const currentStep = ref<number>(1)
const completedSteps = ref<StepData[]>([])

const firstSelectValue = ref<string | number | null>(null)
const secondSelectValue = ref<string | number | null>(null)
const currentStepConfig = computed(() => {
  switch (currentStep.value) {
    case 1:
      return {
        title: 'Step 1: Select Discipline and Professor',
        firstSelect: {
          label: 'Discipline',
          options: disciplines,
          placeholder: 'Choose a discipline...'
        },
        secondSelect: {
          label: 'Professor',
          options: firstSelectValue.value ? professors[firstSelectValue.value as string] || [] : [],
          placeholder: 'Choose a professor...'
        }
      }
    case 2:
      return {
        title: 'Step 2: Select Assignment and Rubric',
        firstSelect: {
          label: 'Assignment',
          options: assignments,
          placeholder: 'Choose an assignment...'
        },
        secondSelect: {
          label: 'Rubric',
          options: rubrics,
          placeholder: 'Choose a rubric...'
        }
      }
    case 3:
      return {
        title: 'Step 3: Select Final Assignment and Rubric',
        firstSelect: {
          label: 'Final Assignment',
          options: assignments.filter(a => a.value !== completedSteps.value[1]?.firstSelect.value),
          placeholder: 'Choose final assignment...'
        },
        secondSelect: {
          label: 'Final Rubric',
          options: rubrics.filter(r => r.value !== completedSteps.value[1]?.secondSelect.value),
          placeholder: 'Choose final rubric...'
        }
      }
    default:
      return {
        title: 'Completed!',
        firstSelect: { label: '', options: [], placeholder: '' },
        secondSelect: { label: '', options: [], placeholder: '' }
      }
  }
})

const canProceed = computed(() => {
  return firstSelectValue.value !== null && secondSelectValue.value !== null
})

const isCompleted = computed(() => {
  return currentStep.value > 3
})

watch(firstSelectValue, () => {
  secondSelectValue.value = null
})

const handleNext = () => {
  if (!canProceed.value) return
  const stepData: StepData = {
    step: currentStep.value,
    firstSelect: {
      value: firstSelectValue.value!,
      label: getOptionLabel(currentStepConfig.value.firstSelect.options, firstSelectValue.value!),
      options: currentStepConfig.value.firstSelect.options
    },
    secondSelect: {
      value: secondSelectValue.value!,
      label: getOptionLabel(currentStepConfig.value.secondSelect.options, secondSelectValue.value!),
      options: currentStepConfig.value.secondSelect.options
    }
  }

  completedSteps.value.push(stepData)

  currentStep.value++

  firstSelectValue.value = null
  secondSelectValue.value = null
}

const getOptionLabel = (options: SelectOption[], value: string | number): string => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : String(value)
}

const resetProcess = () => {
  currentStep.value = 1
  completedSteps.value = []
  firstSelectValue.value = null
  secondSelectValue.value = null
}
</script>

<template>
  <div class="multi-step-selector">
    <!-- Progress indicator -->
    <div class="progress-indicator">
      <div 
        v-for="step in 3" 
        :key="step"
        class="progress-step"
        :class="{ 
          'active': step === currentStep, 
          'completed': step < currentStep 
        }"
      >
        {{ step }}
      </div>
    </div>

    <!-- Current step or completion -->
    <div v-if="!isCompleted" class="step-container">
      <h2 class="step-title">{{ currentStepConfig.title }}</h2>
      
      <div class="selects-container">
        <div class="select-group">
          <label class="select-label">{{ currentStepConfig.firstSelect.label }}</label>
          <SelectInput
            v-model="firstSelectValue"
            :options="currentStepConfig.firstSelect.options"
            :placeholder="currentStepConfig.firstSelect.placeholder"
          />
        </div>

        <div class="select-group">
          <label class="select-label">{{ currentStepConfig.secondSelect.label }}</label>
          <SelectInput
            v-model="secondSelectValue"
            :options="currentStepConfig.secondSelect.options"
            :placeholder="currentStepConfig.secondSelect.placeholder"
            :disabled="!firstSelectValue"
          />
        </div>
      </div>

      <div class="button-container">
        <ButtonPrimary 
          :text="currentStep === 3 ? 'Complete' : 'Next'"
          @click="handleNext"
          :class="{ 'disabled': !canProceed }"
        />
      </div>
    </div>

    <!-- Completion summary -->
    <div v-else class="completion-container">
      <h2 class="completion-title">Process Completed!</h2>
      
      <div class="summary">
        <div v-for="step in completedSteps" :key="step.step" class="summary-step">
          <h3>Step {{ step.step }}</h3>
          <p><strong>{{ step.firstSelect.options.find(o => o.value === step.firstSelect.value)?.label || 'First Selection' }}:</strong> {{ step.firstSelect.label }}</p>
          <p><strong>{{ step.secondSelect.options.find(o => o.value === step.secondSelect.value)?.label || 'Second Selection' }}:</strong> {{ step.secondSelect.label }}</p>
        </div>
      </div>

      <div class="button-container">
        <ButtonPrimary 
          text="Start Over"
          @click="resetProcess"
        />
      </div>
    </div>

    <!-- Previous selections display -->
    <div v-if="completedSteps.length > 0 && !isCompleted" class="previous-selections">
      <h3>Previous Selections:</h3>
      <div v-for="step in completedSteps" :key="step.step" class="previous-step">
        <span class="step-number">Step {{ step.step }}:</span>
        <span class="selection">{{ step.firstSelect.label }} → {{ step.secondSelect.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables/colors" as colors;
@use "../assets/styles/variables/base" as base;
@use "../assets/styles/variables/typography" as typography;
@use "../assets/styles/variables/breakpoints" as breakpoints;

.multi-step-selector {
  max-width: 600px;
  margin: 0 auto;
  padding: base.$padding-xl;
  background: rgba(colors.color("neutral", "white-off"), 0.05);
  border-radius: base.$border-radius-lg;
  border: 1px solid rgba(colors.color("orange", "primary"), 0.3);

  @media (max-width: breakpoints.$breakpoint-md) {
    padding: base.$padding-lg;
    margin: 0 base.$margin-md;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: base.$padding-md;
    margin: 0 base.$margin-sm;
  }
}

.progress-indicator {
  display: flex;
  justify-content: center;
  gap: base.$margin-lg;
  margin-bottom: base.$margin-xl;

  @media (max-width: breakpoints.$breakpoint-sm) {
    gap: base.$margin-md;
    margin-bottom: base.$margin-lg;
  }
}

.progress-step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: map-get(typography.$font-weights, 'bold');
  font-size: map-get(typography.$font-sizes, 'sm');
  border: 2px solid colors.color("neutral", "gray-medium");
  background: transparent;
  color: colors.color("neutral", "gray-medium");
  transition: all 0.3s ease-in-out;

  @media (max-width: breakpoints.$breakpoint-sm) {
    width: 35px;
    height: 35px;
    font-size: map-get(typography.$font-sizes, 'xs');
  }

  &.active {
    border-color: colors.color("orange", "primary");
    background: colors.color("orange", "primary");
    color: colors.color("neutral", "white-off");
    box-shadow: 0 0 8px rgba(colors.color("orange", "primary"), 0.5);
  }

  &.completed {
    border-color: colors.color("green", "medium-2");
    background: colors.color("green", "medium-2");
    color: colors.color("neutral", "white-off");
  }
}

.step-container {
  text-align: center;
}

.step-title {
  font-family: typography.$font-secondary;
  font-size: map-get(typography.$font-sizes, 'xl');
  font-weight: map-get(typography.$font-weights, 'bold');
  color: colors.color("neutral", "white-off");
  margin-bottom: base.$margin-xl;

  @media (max-width: breakpoints.$breakpoint-md) {
    font-size: map-get(typography.$font-sizes, 'lg');
    margin-bottom: base.$margin-lg;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    font-size: map-get(typography.$font-sizes, 'md');
    margin-bottom: base.$margin-md;
  }
}

.selects-container {
  display: flex;
  flex-direction: column;
  gap: base.$margin-lg;
  margin-bottom: base.$margin-xl;

  @media (max-width: breakpoints.$breakpoint-sm) {
    gap: base.$margin-md;
    margin-bottom: base.$margin-lg;
  }
}

.select-group {
  text-align: left;
}

.select-label {
  display: block;
  font-family: typography.$font-primary;
  font-weight: map-get(typography.$font-weights, 'semi-bold');
  font-size: map-get(typography.$font-sizes, 'base');
  color: colors.color("neutral", "white-off");
  margin-bottom: base.$margin-sm;

  @media (max-width: breakpoints.$breakpoint-sm) {
    font-size: map-get(typography.$font-sizes, 'sm');
  }
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: base.$margin-xl;

  @media (max-width: breakpoints.$breakpoint-sm) {
    margin-top: base.$margin-lg;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.completion-container {
  text-align: center;
}

.completion-title {
  font-family: typography.$font-primary;
  font-size: map-get(typography.$font-sizes, '3xl');
  font-weight: map-get(typography.$font-weights, 'bold');
  color: colors.color("green", "medium-2");
  margin-bottom: base.$margin-xl;

  @media (max-width: breakpoints.$breakpoint-md) {
    font-size: map-get(typography.$font-sizes, 'xl');
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    font-size: map-get(typography.$font-sizes, 'lg');
  }
}

.summary {
  text-align: left;
  margin-bottom: base.$margin-xl;
}

.summary-step {
  background: rgba(colors.color("neutral", "white-off"), 0.1);
  padding: base.$padding-lg;
  border-radius: base.$border-radius-md;
  margin-bottom: base.$margin-md;
  border-left: 4px solid colors.color("orange", "primary");

  h3 {
    font-family: typography.$font-secondary;
    font-size: map-get(typography.$font-sizes, 'lg');
    font-weight: map-get(typography.$font-weights, 'bold');
    color: colors.color("orange", "primary");
    margin-bottom: base.$margin-sm;
  }

  p {
    font-family: typography.$font-secondary;
    font-size: map-get(typography.$font-sizes, 'base');
    color: colors.color("neutral", "white-off");
    margin-bottom: base.$margin-xs;

    strong {
      color: colors.color("neutral", "cream");
    }
  }
}

.previous-selections {
  margin-top: base.$margin-xl;
  padding-top: base.$padding-lg;
  border-top: 1px solid rgba(colors.color("orange", "primary"), 0.3);

  h3 {
    font-family: typography.$font-secondary;
    font-size: map-get(typography.$font-sizes, 'lg');
    font-weight: map-get(typography.$font-weights, 'semi-bold');
    color: colors.color("neutral", "white-off");
    margin-bottom: base.$margin-md;
  }
}

.previous-step {
  display: flex;
  align-items: center;
  gap: base.$margin-sm;
  margin-bottom: base.$margin-sm;
  font-family: typography.$font-secondary;
  font-size: map-get(typography.$font-sizes, 'sm');

  @media (max-width: breakpoints.$breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: base.$margin-xs;
  }

  .step-number {
    color: colors.color("orange", "primary");
    font-weight: map-get(typography.$font-weights, 'semi-bold');
  }

  .selection {
    color: colors.color("neutral", "white-off");
  }
}
</style>