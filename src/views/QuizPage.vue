<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import q from "../data/data.json";
import Header from "../components/QuestionHeader.vue";
import Options from "../components/QuestionOption.vue";
import Finish from "./Finish.vue";

const route = useRoute();
const { id } = route.params;
const currentIdx = ref(0);
const question = ref(q.find((quest) => quest.id === Number(id)));
const correctAnswer = ref(0);

const percentage = computed(
  () => `${(currentIdx.value / question.value.questions.length) * 100}%`
);
const currentQuestion = computed(
  () => question.value.questions[currentIdx.value]
);
const handleClick = (isCorrect) => {
  console.log(isCorrect);

  if (isCorrect) correctAnswer.value++;

  currentIdx.value = currentIdx.value + 1;
};
</script>

<template>
  <main class="p-5 max-w-5xl m-auto space-y-10">
    <Header :percentage="percentage" :currentIdx="currentIdx" />
    <Options
      v-if="currentIdx + 1 <= question.questions.length"
      :handleClick="handleClick"
      :currentIdx="currentIdx"
      :question="currentQuestion"
    />
    <Finish
      v-else
      :correctAnswer="correctAnswer"
      :totalQuestion="question.questions.length"
    />
  </main>
</template>
