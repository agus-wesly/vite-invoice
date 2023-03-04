<script setup>
const { quiz } = defineProps(["quiz"]);
</script>

<template>
  <RouterLink :to="`/question/${quiz.id}`">
    <article class="cursor-pointer">
      <img :src="quiz.img" />

      <p class="font-bold text-sm mt-2">{{ quiz.name }}</p>
      <p class="text-sm text-neutral-600">
        {{ quiz.questions.length }} questions
      </p>
    </article>
  </RouterLink>
</template>
