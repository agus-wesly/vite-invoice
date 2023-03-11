<template>
  <div class="flex flex-col mt-10">
    <div class="flex mt-3 space-x-3 w-full">
      <div class="w-1/2">
        <label for="invoice-start">Invoice Date</label>
        <input
          required
          disabled
          id="invoice-start"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="invoice.invoiceDate"
        />
      </div>

      <div class="w-1/2">
        <label for="invoice-due">Invoice Due</label>
        <input
          disabled
          required
          id="invoice-due"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="invoice.paymentDueDate"
        />
      </div>
    </div>
    <label class="mt-3" for="terms">Payment Terms</label>
    <select
      v-model="invoice.paymentTerms"
      required
      class="bg-secondary/90 p-2 rounded w-full"
      id="terms"
    >
      <option value="30">30 days</option>
      <option value="60">60 days</option>
    </select>
    <label class="mt-3" for="description">Product Description</label>
    <input
      v-model="invoice.productDescription"
      required
      class="bg-secondary/90 p-2 rounded"
      id="description"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Invoice",
  props: ["invoice"],
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
    };
  },

  watch: {
    sidebarVisible() {
      if (!this.invoice.invoiceDateUnix) {
        this.invoice.invoiceDateUnix = Date.now();
        this.invoice.invoiceDate = new Date(
          this.invoice.invoiceDateUnix
        ).toLocaleString("en-us", this.dateOptions);
      }
    },
  },
  created() {
    this.$watch("invoice.paymentTerms", () => {
      if (!this.invoice.paymentTerms) return;
      const invoiceDate = new Date(this.invoice.invoiceDate);

      const nextDate = invoiceDate.setDate(
        invoiceDate.getDate() + parseInt(this.invoice.paymentTerms)
      );

      this.invoice.paymentDueDateUnix = nextDate;
      this.invoice.paymentDueDate = new Date(nextDate).toLocaleString(
        "en-us",
        this.dateOptions
      );
    });
  },
  computed: {
    ...mapState(["sidebarVisible"]),
  },
};
</script>
