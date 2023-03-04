<script setup>
import q from "../data/data.json";
import { ref, computed } from "vue";
import Quiz from "../components/Quiz.vue";
import Modal from "../components/Modal.vue";

const quizes = ref(q);
const search = ref("");
const isModalOpen = ref(false);

const searchQuiz = computed(() =>
  quizes.value.filter((quiz) =>
    quiz.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <main class="p-5 max-w-5xl m-auto">
    <div class="flex gap-4 items-center mb-8">
      <h1 class="text-2xl font-semibold">Quizes</h1>
      <input
        v-model="search"
        type="text"
        class="bg-neutral-200 w-32 p-3 py-2 placeholder:text-neutral-600 rounded outline-none border-none"
        placeholder="Search"
      />
    </div>

    <!-- CONTAINER -->
    <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Quiz v-for="quiz in searchQuiz" :quiz="quiz" :key="quiz.id" />

      <!-- Modal -->
      <button
        class="p-2 px-4 font-semibold rounded-full bg-orange-200 text-orange-900 text-sm max-w-fit"
        @click="isModalOpen = true"
      >
        Open Modal
      </button>
      <Modal v-model="isModalOpen" v-if="isModalOpen" />
    </section>
  </main>
</template>
