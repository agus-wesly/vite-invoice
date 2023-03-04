<script setup>
const { correctAnswer, totalQuestion } = defineProps([
  "correctAnswer",
  "totalQuestion",
]);
</script>

<template>
  <section class="text-center">
    <p>Your Results...</p>
    <h1 class="text-5xl my-4">{{ correctAnswer }}/{{ totalQuestion }}</h1>
    <RouterLink
      to="/"
      class="px-4 py-2 bg-green-200 text-green-800 rounded font-bold text-sm"
    >
      Go Back
    </RouterLink>
  </section>
</template>
