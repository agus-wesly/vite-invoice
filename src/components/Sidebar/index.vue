<template>
  <aside
    :class="`fixed top-[56px] left-0 md:left-[48px] md:top-0 w-[480px] pb-20 md:pb-10 p-10 h-screen ${
      loading ? 'overflow-y-none' : 'overflow-y-auto'
    } bg-primary shadow-2xl z-[5]`"
  >
    <!-- MODAL -->
    <Modal v-show="modalVisible">
      <div class="rounded-lg bg-secondary p-5 space-y-3 w-80">
        <h1 class="text-lg text-neutral-100">Discard</h1>
        <p class="text-slate-400 text-sm">
          Are you sure to cancel ? Your work will not be saved
        </p>

        <button
          @click="handleQuit"
          class="p-2 px-4 rounded-full bg-red-100 text-red-800 font-semibold text-sm mr-3"
        >
          Discard
        </button>
        <button
          @click="hideModal"
          class="p-2 px-4 rounded-full ring-[1px] text-neutral-300 ring-neutral-500 font-semibold text-sm"
        >
          Back
        </button>
      </div>
    </Modal>

    <!-- INSET -->
    <div
      v-show="loading"
      class="flex justify-center items-center w-full bg-black/60 absolute inset-0"
    >
      <img
        class="w-6 h-6 animate-spin mr-3"
        alt="loading"
        src="@/assets/loading.svg"
      />
      <p>Loading...</p>
    </div>

    <h1 class="text-2xl text-neutral-50 font-bold">
      {{ isEditing ? "Edit Invoice" : "New Invoice" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col text-sm">
      <!-- Bill From -->
      <Billfrom :billFrom="billFrom" />

      <!-- BillTo -->
      <Billto :billTo="billTo" />

      <!-- Invoice -->
      <Invoice :invoice="invoice" />

      <!-- Item List -->
      <div class="flex flex-col gap-3">
        <h3 class="font-bold text-neutral-400 text-lg my-5">Item List</h3>
        <div class="flex flex-col gap-3 text-sm text-neutral-50">
          <!-- LABEL -->
          <div class="flex gap-3">
            <p class="flex-1">Item Name</p>
            <p class="flex-[0.25] px-2">Qty</p>
            <p class="flex-[0.5]">Price ($)</p>
            <p class="flex-[0.5]">Total</p>
            <p class="flex-[0.25]"></p>
          </div>
        </div>
        <ItemList
          v-for="(item, i) in invoiceItemList"
          :key="i"
          :item="item"
          @item-updated="handleDelete"
        />
      </div>

      <!-- Button -->
      <button
        @click="addItem"
        type="button"
        class="rounded-full p-3 bg-secondary mt-5"
      >
        Add List
      </button>
      <div class="flex justify-between mt-10">
        <button
          @click="showModal"
          type="button"
          class="bg-red-600 rounded-full p-3"
        >
          Discard
        </button>

        <div class="space-x-1">
          <button
            type="submit"
            name="draft"
            class="bg-secondary rounded-full p-3"
          >
            Save Draft
          </button>
          <button
            type="submit"
            name="create"
            class="bg-purple rounded-full p-3"
          >
            {{ isEditing ? "Save Change" : "Create Invoice" }}
          </button>
        </div>
      </div>
    </form>
  </aside>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import Billto from "./Billto.vue";
import Billfrom from "./Billfrom.vue";
import Invoice from "./Invoice.vue";
import ItemList from "./ItemList.vue";
import Alert from "../Alert.vue";
import Modal from "../Modal.vue";

export default {
  name: "Sidebar",
  data() {
    return {
      docId: null,
      loading: null,
      modalVisible: false,
      billFrom: {
        billerStreetAddress: null,
        billerCity: null,
        billerZipCode: null,
        billerCountry: null,
      },

      billTo: {
        clientName: null,
        clientEmail: null,
        clientStreetAddress: null,
        clientCity: null,
        clientZipCode: null,
        clientCountry: null,
      },

      invoice: {
        invoiceDateUnix: null,
        invoiceDate: null,
        paymentTerms: null,
        paymentDueDateUnix: null,
        paymentDueDate: null,
        productDescription: null,
      },

      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  props: ["clearField", "setClearField"],
  methods: {
    ...mapMutations(["hideSidebar", "setIsEditing"]),
    ...mapActions(["editInvoice", "addInvoice"]),

    showModal() {
      this.modalVisible = true;
    },

    hideModal() {
      this.modalVisible = false;
    },

    handleQuit() {
      this.hideSidebar();
      this.hideModal();
      this.setClearField(true);
      this.setIsEditing(false);
    },

    addItem() {
      this.invoiceItemList.push({
        id: crypto.randomUUID().slice(0, 6),
        name: "",
        qty: null,
        price: null,
        total: null,
      });
    },

    handleDelete(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },

    countTotal() {
      return this.invoiceItemList.reduce((acc, curr) => {
        return (acc += Number(curr.qty * curr.price));
      }, 0);
    },

    resetField() {
      this.billFrom.billerStreetAddress = null;
      this.billFrom.billerCity = null;
      this.billFrom.billerZipCode = null;
      this.billFrom.billerCountry = null;
      this.billTo.clientName = null;
      this.billTo.clientEmail = null;
      this.billTo.clientStreetAddress = null;
      this.billTo.clientCity = null;
      this.billTo.clientZipCode = null;
      this.billTo.clientCountry = null;
      this.invoice.invoiceDateUnix = null;
      this.invoice.invoiceDate = null;
      this.invoice.paymentTerms = null;
      this.invoice.paymentDueDateUnix = null;
      this.invoice.paymentDueDate = null;
      this.invoice.productDescription = null;
      this.invoicePending = null;
      this.invoiceDraft = null;
      this.invoiceItemList = [];
    },

    getAllFields() {
      const { paymentTerms, ...rest } = this.invoice;
      const invoiceTotal = this.countTotal();

      return {
        ...this.billTo,
        ...this.billFrom,
        ...rest,
        docId: this.docId,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal,
      };
    },

    async handleSubmit(event) {
      if (event.submitter.name === "draft") {
        console.log("Draft");
        this.invoiceDraft = true;
      }

      this.loading = true;
      const newInvoice = this.getAllFields();

      try {
        if (this.isEditing) {
          await this.editInvoice(newInvoice);
        } else {
          await this.addInvoice(newInvoice);
        }

        this.$emit("setAlert", "success");
      } catch (e) {
        this.$emit("setAlert", "failed");
      } finally {
        this.loading = false;
        this.resetField();
        this.hideSidebar();
        this.$router.push("/");
      }
    },
  },
  watch: {
    clearField() {
      if (this.clearField) {
        this.resetField();
        this.setClearField(false);
      }
    },
    isEditing() {
      if (this.isEditing) {
        const currentInvoice = this.$store.getters.getInvoiceById(
          this.$route.params.id
        );

        this.docId = currentInvoice.id;
        this.billFrom.billerStreetAddress = currentInvoice.billerStreetAddress;
        this.billFrom.billerCity = currentInvoice.billerCity;
        this.billFrom.billerZipCode = currentInvoice.billerZipCode;
        this.billFrom.billerCountry = currentInvoice.billerCountry;
        this.billTo.clientName = currentInvoice.clientName;
        this.billTo.clientEmail = currentInvoice.clientEmail;
        this.billTo.clientStreetAddress = currentInvoice.clientStreetAddress;
        this.billTo.clientCity = currentInvoice.clientCity;
        this.billTo.clientZipCode = currentInvoice.clientZipCode;
        this.billTo.clientCountry = currentInvoice.clientCountry;
        this.invoice.invoiceDateUnix = currentInvoice.invoiceDateUnix;
        this.invoice.invoiceDate = currentInvoice.invoiceDate;
        this.invoice.paymentTerms = currentInvoice.paymentTerms;
        this.invoice.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
        this.invoice.paymentDueDate = currentInvoice.paymentDueDate;
        this.invoice.productDescription = currentInvoice.productDescription;
        this.invoicePending = currentInvoice.invoicePending;
        this.invoiceDraft = currentInvoice.invoiceDraft;
        this.invoiceItemList = currentInvoice.invoiceItemList;
        this.invoiceTotal = currentInvoice.invoiceTotal;
      } else {
        this.resetField();
      }
    },
  },
  computed: {
    ...mapState(["isEditing"]),
  },
  components: {
    Billto,
    Billfrom,
    Invoice,
    ItemList,
    Alert,
    Modal,
  },
};
</script>

<style scoped>
.slideRight-enter-active,
.slideRight-leave-active {
  transition: left 0.5s ease-in-out;
}

.slideRight-enter-from {
  left: -100%;
}

.slideRight-leave-to {
  left: -100%;
}
</style>
