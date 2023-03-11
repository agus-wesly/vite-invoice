<template>
  <div>
    <Teleport to="#modal-container">
      <article
        v-show="type === 'failed'"
        class="bg-red-300 text-red-800 text-sm w-64 rounded p-3 font-bold absolute left-[40%] top-10 flex items-center gap-5 z-[10]shadow-xl"
      >
        <img src="@/assets/error.svg" alt="check" class="w-8 h-8" />
        <p>Error! Please try again</p>
      </article>

      <article
        v-show="type === 'success'"
        class="bg-green-300 text-green-800 text-sm w-64 rounded p-3 font-bold absolute left-[40%] top-10 flex items-center gap-5 z-[10]shadow-xl"
      >
        <img src="@/assets/check.svg" alt="check" class="w-8 h-8" />
        <p>Success !</p>
      </article>
    </Teleport>
  </div>
</template>

<script>
export default {
  props: ["type"],
};
</script>
