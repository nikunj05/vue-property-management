<template>
  <div
    @click="$emit('close-property-modal')"
    class="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full modal"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div
      class="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container sm:max-w-lg lg:max-w-4xl"
      style="max-height: 70vh"
    >
      <div class="flex justify-end p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="$emit('close-property-modal')"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="selectedProperty" class="p-4">
        <div class="grid gap-4 lg:grid-cols-2">
          <v-carousel :show-arrows="false">
            <v-carousel-item
              v-for="(item, i) in selectedProperty.gallery"
              :key="i"
              :src="item"
            ></v-carousel-item>
          </v-carousel>
          <div class="p-6">
            <h2
              class="text-2xl font-semibold leading-6 text-gray-900 capitalize"
            >
              {{ selectedProperty.title }}
            </h2>
            <p class="mt-4 text-sm text-gray-500">
              {{ selectedProperty.address }}
            </p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900"
                >${{ selectedProperty.price }}</span
              >
              {{ ' ' }}
              <span class="ml-5 text-base font-medium text-gray-500">
                {{ selectedProperty.sqft }} sqft</span
              >
              <span class="ml-5 text-base font-medium text-gray-500">
                Home for {{ selectedProperty.home_type }}
              </span>
            </p>
            <p class="mt-4 text-sm text-gray-500">
              {{ selectedProperty.facts_features }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectedProperty',

  props: {
    selectedProperty: {
      type: Object,
      default: null,
    },

    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
