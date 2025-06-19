<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface SelectOption {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number | null
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option...',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value === '' ? null : target.value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="select-wrapper">
    <select 
      :value="modelValue || ''" 
      @change="handleChange"
      :disabled="disabled"
      class="select-input"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables/colors" as colors;
@use "../assets/styles/variables/base" as base;
@use "../assets/styles/variables/typography" as typography;
@use "../assets/styles/variables/breakpoints" as breakpoints;

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-input {
  width: 100%;
  padding: base.$padding-md base.$padding-lg;
  border: 2px solid colors.color("neutral", "gray-medium");
  border-radius: base.$border-radius-lg;
  background: rgba(colors.color("neutral", "white-off"), 0.1);
  color: colors.color("neutral", "white-off");
  font-family: typography.$font-primary;
  font-weight: map-get(typography.$font-weights, 'regular');
  font-size: map-get(typography.$font-sizes, 'base');
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  appearance: none;
  
  // Custom arrow
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FDF8F3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right base.$padding-md center;
  background-size: 20px;
  padding-right: calc(base.$padding-lg + 30px);

  // Mobile responsive adjustments
  @media (max-width: breakpoints.$breakpoint-md) {
    padding: base.$padding-sm base.$padding-md;
    font-size: map-get(typography.$font-sizes, 'sm');
    padding-right: calc(base.$padding-md + 25px);
    background-size: 18px;
  }

  @media (max-width: breakpoints.$breakpoint-sm) {
    padding: base.$padding-xs base.$padding-sm;
    font-size: map-get(typography.$font-sizes, 'xs');
    padding-right: calc(base.$padding-sm + 25px);
    background-size: 16px;
  }

  &:hover:not(:disabled) {
    border-color: colors.color("orange", "primary");
    background-color: rgba(colors.color("orange", "primary"), 0.05);
    box-shadow: 0 0 8px rgba(colors.color("orange", "primary"), 0.3);
  }

  &:focus {
    outline: none;
    border-color: colors.color("orange", "primary");
    box-shadow: 0 0 0 2px rgba(colors.color("orange", "primary"), 0.3);
    background-color: rgba(colors.color("orange", "primary"), 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: rgba(colors.color("neutral", "gray-dark"), 0.3);
  }

  option {
    background-color: colors.color("dark", "primary");
    color: colors.color("neutral", "white-off");
    padding: base.$padding-sm;
  }
}
</style>