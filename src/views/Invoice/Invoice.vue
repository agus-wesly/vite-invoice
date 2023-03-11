<template>
  <div class="space-y-6">
    <!-- MODAL -->
    <Modal v-show="modalVisible">
      <div class="rounded-lg bg-secondary p-5 space-y-3 w-80">
        <h1 class="text-lg text-neutral-100">Discard</h1>
        <p class="text-slate-400 text-sm">
          Are you sure to delete this Invoice ?
        </p>

        <button
          @click="handleDelete"
          class="p-2 px-4 rounded-full bg-red-100 text-red-800 font-semibold text-sm mr-3"
        >
          Delete
        </button>
        <button
          @click="hideModal"
          class="p-2 px-4 rounded-full ring-[1px] text-neutral-300 ring-neutral-500 font-semibold text-sm"
        >
          Back
        </button>
      </div>
    </Modal>
    <button
      @click="$router.go(-1)"
      class="flex items-center gap-3 text-sm text-neutral-200"
    >
      <img src="@/assets/icon-arrow-left.svg" alt="arrow-left" class="w-3" />
      <p>Go Back</p>
    </button>

    <div
      class="flex rounded-xl bg-secondary p-6 justify-between text-neutral-200"
    >
      <div class="flex items-center gap-3">
        <p class="text-sm text-neutral-200">Status</p>
        <button
          type="button"
          class="w-20 h-8 flex items-center justify-center gap-1 text-xs rounded-xl font-medium capitalize"
          :class="getStatus()"
        >
          <span class="text-5xl -mt-7">.</span>

          <p>
            {{ getStatus() }}
          </p>
        </button>
      </div>

      <div class="flex gap-1 text-sm">
        <button @click="handleEdit" class="rounded-full px-4 bg-primary">
          Edit
        </button>
        <button @click="showModal" class="rounded-full px-4 bg-red-500/80">
          Delete
        </button>
        <button
          v-show="getStatus() !== 'paid'"
          class="rounded-full px-4 bg-emerald-600 /90"
        >
          Mark as Paid
        </button>
      </div>
    </div>

    <Info :invoice="invoice" />
  </div>
</template>

<script>
import Info from "./Info.vue";
import Modal from "../../components/Modal.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "InvoicePage",
  data() {
    return {
      modalVisible: false,
    };
  },
  computed: {
    ...mapGetters(["getInvoiceById"]),
    invoice() {
      return this.getInvoiceById(this.$route.params.id);
    },
  },

  methods: {
    ...mapMutations(["setIsEditing", "showSidebar"]),
    ...mapActions(["deleteInvoice"]),
    showModal() {
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
    },
    getStatus() {
      return this.invoice.invoiceDraft
        ? "draft"
        : this.invoice.invoicePending
        ? "pending"
        : "paid";
    },
    handleEdit() {
      this.setIsEditing(true);
      this.showSidebar();
    },
    async handleDelete() {
      try {
        await this.deleteInvoice(this.$route.params.id);
        this.$emit("setAlert", "success");
      } catch (error) {
        this.$emit("setAlert", "failed");
      } finally {
        this.$router.push("/");
      }
    },
  },

  components: {
    Info,
    Modal,
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
