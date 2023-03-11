<template>
  <div
    class="bg-black/60 fixed top-0 right-0 inset-0 z-[10] flex items-center justify-center"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "modal",
};
</script>
