<template>
  <!-- Bill To -->
  <div class="flex flex-col mt-10">
    <p class="text-purple text-xs">Bill To</p>
    <label class="mt-3" for="client-name">Client's Name</label>
    <input
      required
      v-model="billTo.clientName"
      class="bg-secondary/90 p-2 rounded"
      id="client-name"
    />

    <label class="mt-3" for="client-email">Client's Email</label>
    <input
      required
      v-model="billTo.clientEmail"
      class="bg-secondary/90 p-2 rounded"
      id="client-email"
    />

    <label class="mt-3" for="street-address">Street Address</label>
    <input
      required
      class="bg-secondary/90 p-2 rounded"
      v-model="billTo.clientStreetAddress"
      id="street-address"
    />

    <div class="flex mt-3 space-x-3 w-full">
      <div class="w-1/3">
        <label for="to-city">City</label>
        <input
          required
          id="to-city"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="billTo.clientCity"
        />
      </div>

      <div class="w-1/3">
        <label for="to-zip">Zip Code</label>
        <input
          required
          id="to-zip"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="billTo.clientZipCode"
        />
      </div>

      <div class="w-1/3">
        <label for="to-country">Country</label>
        <input
          required
          id="to-country"
          v-model="billTo.clientCountry"
          class="bg-secondary/90 p-2 rounded w-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Billto",
  props: ["billTo"],
};
</script>
