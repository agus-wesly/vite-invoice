<template>
  <div class="rounded-xl text-xs bg-secondary p-8 text-neutral-200 space-y-8">
    <div class="flex justify-between items-center text-neutral-100">
      <div class="space-y-1">
        <h1 class="text-lg font-semibold uppercase">
          <span class="text-neutral-500 -mr-1">#</span>
          {{ invoice.id.slice(0, 6) }}
        </h1>
        <p class="text-sm text-neutral-300">{{ invoice.productDescription }}</p>
      </div>

      <div class="text-right space-y-1 text-neutral-300">
        <p>{{ invoice.billerStreetAddress }}</p>
        <p>{{ invoice.billerCity }}</p>
        <p>{{ invoice.billerZipCode }}</p>
        <p>{{ invoice.billerCountry }}</p>
      </div>
    </div>

    <div class="flex gap-10">
      <div class="space-y-5">
        <div class="space-y-3">
          <p class="text-neutral-400">Invoice Date</p>
          <p class="text-sm text-neutral-100 font-semibold">Jun 2, 2021</p>
        </div>

        <div class="space-y-3">
          <p class="text-neutral-400">Invoice Date</p>
          <p class="text-sm text-neutral-100 font-semibold">Jun 2, 2021</p>
        </div>
      </div>

      <div class="space-y-3">
        <div class="space-y-3">
          <p class="text-neutral-400">{{ invoice.clientName }}</p>
          <p class="text-sm text-neutral-100 font-semibold">
            {{ invoice.clientEmail }}
          </p>
        </div>

        <div class="text-neutral-200">
          <p>{{ invoice.clientStreetAddress }}</p>
          <p>{{ invoice.clientZipCode }}</p>
          <p>{{ invoice.clientCity }}</p>
          <p>{{ invoice.clientCountry }}</p>
        </div>
      </div>

      <div>
        <div class="space-y-3">
          <p class="text-neutral-400">Sent To</p>
          <p class="text-sm text-neutral-100 font-semibold">
            johnjohn@john.com
          </p>
        </div>
      </div>
    </div>

    <div class="shadow-xl flex flex-col">
      <div class="bg-[#2B2F4E] p-5 rounded-tl-xl space-y-3">
        <div class="flex justify-between mb-6">
          <h5 class="">Item Name</h5>

          <div class="flex gap-10">
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
        </div>

        <!-- ITEMS -->
        <ItemList
          v-for="item in invoice.invoiceItemList"
          :key="item.id"
          :item="item"
        />
      </div>

      <div
        class="bg-black/90 p-5 flex justify-between items-center rounded-bl-xl rounded-br-xl"
      >
        <p>Amount Due</p>
        <p class="text-lg">{{ formattedAmount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ItemList from "./ItemList.vue";
export default {
  name: "info",
  props: ["invoice"],
  components: {
    ItemList,
  },
  computed: {
    formattedAmount() {
      const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return USDollar.format(this.invoice.invoiceTotal);
    },
  },
};
</script>
