<template>
  <router-link :to="{ name: 'Invoice', params: { id: invoice.id } }">
    <article
      class="bg-secondary rounded-lg flex flex-row justify-between items-center text-slate-200 text-sm p-6 shadow-lg cursor-pointer gap-10"
    >
      <p class="uppercase w-[7ch]">#{{ invoice.id.slice(0, 6) }}</p>
      <p>{{ invoice.invoiceDate }}</p>
      <p class="capitalize flex-1 text-center max-w-[237px] truncate">
        {{ invoice.clientName }}
      </p>
      <p class="font-bold text-base min-w-[6ch]">{{ formatedTotal }}</p>

      <button
        type="button"
        class="w-20 h-8 flex items-center justify-center gap-1 text-xs rounded-xl font-medium capitalize"
        :class="getStatus"
      >
        <span class="text-5xl -mt-7">.</span>

        <p>
          {{ getStatus }}
        </p>
      </button>

      <span>
        <img
          src="@/assets/icon-arrow-right.svg"
          alt="arrow-right"
          class="w-2"
        />
      </span>
    </article>
  </router-link>
</template>

<script>
import invoice from "@/data/data.json";
export default {
  name: "content",
  props: ["invoice"],
  computed: {
    formatedTotal() {
      const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return USDollar.format(this.invoice.invoiceTotal);
    },
    getStatus() {
      return this.invoice.invoiceDraft
        ? "draft"
        : this.invoice.invoicePending
        ? "pending"
        : "paid";
    },
  },
};
</script>

<style scoped>
.draft {
  background: #334155a1;
  color: #f1f5f9;
}
.pending {
  background: #92410e5e;
  color: #fcd34d;
}
.paid {
  background: #065f4662;
  color: #6ee7b7;
}
</style>
