<template>
  <div
    v-if="!appLoading"
    class="flex flex-col md:flex-row min-h-screen text-neutral-50"
  >
    <Navbar />
    <Alert v-show="alert" :type="alert" />
    <main class="w-[min(80%,780px)] mx-auto mt-8 md:mt-16">
      <Transition name="slideRight">
        <Sidebar
          v-show="sidebarVisible"
          :clearField="clearField"
          :setClearField="setClearField"
          @setAlert="setAlert"
        />
      </Transition>
      <Modal v-show="modalVisible" :setClearField="setClearField" />
      <RouterView v-if="isNonMobile" />
      <!-- IF IN MOBILE DEV -->
      <div class="flex items-center justify-center min-h-screen" v-else>
        <h1>Sorry this app isn't available in mobile screen</h1>
      </div>
    </main>
  </div>

  <div
    v-else
    class="flex items-center justify-center w-full h-screen bg-primary"
  >
    <h1 class="text-neutral-100 font-bold text-3xl">Loading App...</h1>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Alert from "./components/Alert.vue";
import Modal from "./components/Modal.vue";
import Sidebar from "@/components/Sidebar/index.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      isNonMobile: true,
      clearField: false,
      appLoading: false,
      alert: "",
    };
  },
  emits: ["setAlert"],
  computed: {
    ...mapState(["sidebarVisible", "modalVisible"]),
  },
  methods: {
    ...mapActions(["loadAllInvoices"]),
    ...mapMutations(["setIsEditing"]),

    setAlert(alert) {
      this.alert = alert;
      setTimeout(() => {
        this.alert = null;
      }, 2000);
    },

    getScreenWidth() {
      const screenWidth = window.innerWidth;
      this.isNonMobile = screenWidth > 600 ? true : false;
    },
    setClearField(value) {
      this.clearField = value;
    },
    async fetchInvoices() {
      this.appLoading = true;
      try {
        await this.loadAllInvoices();
      } catch (error) {
        console.log(error);
      } finally {
        this.appLoading = false;
      }
    },
  },
  created() {
    this.fetchInvoices();
    window.addEventListener("resize", this.getScreenWidth);
  },

  watch: {
    $route() {
      this.setIsEditing(false);
    },
  },

  components: {
    Navbar,
    Sidebar,
    Modal,
    Alert,
  },
};
</script>
