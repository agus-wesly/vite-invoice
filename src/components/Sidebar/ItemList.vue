<template>
  <!-- ITEMS -->
  <div class="flex items-center gap-3">
    <input
      v-model="item.name"
      type="text"
      class="flex-1 bg-secondary/90 p-2 rounded"
    />
    <input
      required
      type="text"
      v-model="item.qty"
      class="flex-[0.25] bg-secondary/90 p-2 rounded"
    />

    <input
      required
      type="text"
      v-model="item.price"
      class="flex-[0.5] bg-secondary/90 p-2 rounded"
    />
    <input
      disabled
      type="text"
      :value="item.total"
      class="flex-[0.5] bg-secondary/90 p-2 rounded"
    />
    <button @click="deleteItem(item.id)" type="button" class="flex-none">
      <img src="@/assets/icon-delete.svg" alt="delete" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  props: ["item"],
  methods: {
    deleteItem(id) {
      this.$emit("item-updated", id);
    },
    countTotal() {
      const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.item.total = USDollar.format(this.item.qty * this.item.price);
    },
  },
  watch: {
    "item.qty": "countTotal",
    "item.price": "countTotal",
  },
};
</script>
