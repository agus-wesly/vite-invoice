<script setup>
const { currentIdx, percentage } = defineProps(["currentIdx", "percentage"]);
</script>

<template>
  <header>
    <p>Question Answered {{ currentIdx }}/3</p>
    <div class="w-64 border-neutral-300 border rounded">
      <div :style="{ width: percentage }" :class="`bg-neutral-700 py-4`" />
    </div>
  </header>
</template>
