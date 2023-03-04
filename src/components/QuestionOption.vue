<script setup>
const { question, currentIdx, handleClick } = defineProps([
  "question",
  "currentIdx",
  "handleClick",
]);
</script>

<template>
  <section class="flex flex-col gap-2">
    <h1 class="text-xl mb-2">{{ question.text }}</h1>

    <div
      v-for="option in question.options"
      :id="option.id"
      class="flex cursor-pointer"
      @click="handleClick(option.isCorrect)"
    >
      <div class="text-center bg-yellow-300 p-2">{{ option.label }}</div>
      <p class="flex-1 bg-neutral-100 p-2">{{ option.text }}</p>
    </div>
  </section>
</template>
