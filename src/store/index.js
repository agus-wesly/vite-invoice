import { createStore } from "vuex";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/app.js";

export const store = createStore({
  state() {
    return {
      allInvoices: [],
      sidebarVisible: false,
      isEditing: false,
    };
  },
  getters: {
    getInvoiceById: (state) => (id) => {
      const foundInvoice = state.allInvoices.find(
        (invoice) => invoice.id === id
      );
      return {
        ...foundInvoice,
        invoiceItemList: [
          ...foundInvoice.invoiceItemList.map((item) => ({ ...item })),
        ],
      };
    },
  },
  mutations: {
    showSidebar(state) {
      state.sidebarVisible = true;
    },
    hideSidebar(state) {
      state.sidebarVisible = false;
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
    setIsEditing(state, payload) {
      state.isEditing = payload;
    },
    UPDATE_ALL_INVOICES(state, payload) {
      state.allInvoices = payload;
    },
    UPDATE_LOADING(state, payload) {
      state.appLoading = payload;
    },
  },
  actions: {
    async loadAllInvoices({ commit }) {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const allInvoices = [];
      querySnapshot.forEach((doc) => {
        allInvoices.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      commit("UPDATE_ALL_INVOICES", allInvoices);
    },

    async addInvoice({ dispatch }, payload) {
      await addDoc(collection(db, "invoices"), payload);
      dispatch("loadAllInvoices");
    },

    async deleteInvoice({ dispatch }, id) {
      await deleteDoc(doc(db, "invoices", id));
      dispatch("loadAllInvoices");
    },

    async editInvoice({ dispatch }, payload) {
      await setDoc(doc(db, "invoices", payload.docId), payload);
      dispatch("loadAllInvoices");
    },
  },
});
