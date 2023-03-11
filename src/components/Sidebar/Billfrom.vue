<template>
  <div class="flex flex-col mt-10">
    <p class="text-purple text-xs">Bill From</p>
    <label class="mt-3" for="street">Street Address</label>
    <input
      required
      class="bg-secondary/90 p-2 rounded"
      id="street"
      v-model="billFrom.billerStreetAddress"
    />

    <div class="flex mt-3 space-x-3 w-full">
      <div class="w-1/3">
        <label for="city">City</label>
        <input
          required
          id="city"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="billFrom.billerCity"
        />
      </div>

      <div class="w-1/3">
        <label for="zip">Zip Code</label>
        <input
          required
          id="zip"
          class="bg-secondary/90 p-2 rounded w-full"
          v-model="billFrom.billerZipCode"
        />
      </div>

      <div class="w-1/3">
        <label for="country">Country</label>
        <input
          required
          id="country"
          v-model="billFrom.billerCountry"
          class="bg-secondary/90 p-2 rounded w-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Billfrom",
  props: ["billFrom"],
};
</script>
