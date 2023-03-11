<template>
  <div class="flex justify-between">
    <h5 class="">{{ item.name }}</h5>

    <div class="flex gap-10">
      <p>{{ item.qty }}</p>
      <p>${{ item.price }}</p>
      <p>{{ item.total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Itemlist",
  props: ["item"],
};
</script>
