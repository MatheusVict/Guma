<script setup>
import {defineProps} from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>

  <button class="button-primary" type="button">
    {{ props.text }}
  </button>

</template>

<style scoped lang="scss">
@use "../../assets/styles/components/buttons/buttons";
</style>
