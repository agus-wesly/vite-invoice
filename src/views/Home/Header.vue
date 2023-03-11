<template>
  <section class="flex justify-between items-center">
    <!-- LEFT -->
    <div class="space-y-2">
      <h1 class="font-bold text-lg">Invoices</h1>
      <span v-if="allInvoices" class="text-sm text-neutral-100"
        >There are {{ invoiceLength() }} total invoices</span
      >
    </div>

    <!-- RIGHT -->
    <div class="flex justify-end gap-4 items-center">
      <button
        @click="showFilter = !showFilter"
        class="text-left relative flex cursor-pointer"
      >
        <!-- STATUS-LIST -->
        <ul
          v-show="showFilter"
          class="absolute top-6 rounded flex flex-col bg-secondary"
        >
          <li
            class="hover:bg-neutral-50 w-28 hover:text-secondary text-sm px-4 py-2"
          >
            Draft
          </li>
          <li
            class="hover:bg-neutral-50 w-28 hover:text-secondary text-sm px-4 py-2"
          >
            Pending
          </li>
          <li
            class="hover:bg-neutral-50 w-28 hover:text-secondary text-sm px-4 py-2"
          >
            Paid
          </li>
          <li
            class="hover:bg-neutral-50 w-28 hover:text-secondary text-sm px-4 py-2"
          >
            Clear Filter
          </li>
        </ul>
        <p class="text-xs mr-6 text-neutral-100">Filter By status</p>
        <img
          src="../../assets/icon-arrow-down.svg"
          class="w-3 h-2"
          alt="arrow-down"
        />
      </button>

      <button
        @click="showSidebar"
        class="flex gap-2 items-center rounded-full p-2 bg-purple"
      >
        <span class="w-5 h-5 p-[6px] rounded-full bg-neutral-50">
          <img
            src="../../assets/icon-plus.svg"
            alt="plus-icon"
            class="w-full"
          />
        </span>
        <p class="font-bold text-xs">New Invoice</p>
      </button>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      showFilter: false,
    };
  },
  computed: {
    ...mapState(["allInvoices"]),
  },
  methods: {
    ...mapMutations(["showSidebar", "setIsEditing"]),
    invoiceLength() {
      return this.allInvoices && this.allInvoices.length;
    },
  },
};
</script>
