<template>
  <div class="absolute bg-black/50 inset-0">
    <section class="p-4 rounded bg-green-300 text-neutral-900">
      <h1 class="text-lg">Modal Title</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nam
        temporibus molestiae nihil cum laborum quaerat ratione soluta, facilis
        neque doloribus consequuntur perferendis cumque ex. Adipisci repellat
        dolorum perferendis animi.
      </p>

      <button @click="$emit('update:modelValue', false)">Close Modal</button>
    </section>
  </div>
</template>

<script setup></script>
