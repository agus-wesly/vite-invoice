<script>
import Header from "./Header.vue";
import Content from "./Content.vue";
import { mapState } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapState(["allInvoices"]),
  },
  components: {
    Header,
    Content,
  },
};
</script>

<template>
  <Header />

  <div class="my-10 space-y-3">
    <Content
      v-for="invoice in allInvoices"
      :key="invoice.id"
      :invoice="invoice"
    />
  </div>
</template>
