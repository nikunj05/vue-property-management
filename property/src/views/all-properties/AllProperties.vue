<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="relative bg-gray-800 pb-80">
      <div class="absolute inset-0">
        <img
          class="object-cover w-full h-full"
          src="../../assets/home.jpg"
          alt=""
        />
        <div
          class="absolute inset-0 bg-gray-100 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div
        class="relative px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8"
      >
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl lg:text-6xl"
        >
          Property Portal
        </h1>
      </div>
    </div>

    <!-- Overlapping cards -->
    <section
      class="relative z-10 max-w-xl px-4 pb-32 mx-auto -mt-32 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div class="p-4 bg-blue-200 shadow-xl rounded-2xl">
        <div id="geocoder"></div>
        <pre id="result"></pre>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: null,
    }
  },

  mounted() {
    this.initAddress()
  },

  methods: {
    initAddress() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaGFzaWkiLCJhIjoiY2wwYWt4cjJ1MDF4YTNjbWptNzZwM2ZhZyJ9.9WUVDkgiL5lsqX95u0VAvA'

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'country,region,place,postcode,locality,neighborhood',
      })

      geocoder.addTo('#geocoder')

      // Get the geocoder results container.
      const results = document.getElementById('result')

      // Add geocoder result to container.
      geocoder.on('result', (e) => {
        results.innerText = JSON.stringify(e.result, null, 2)
      })

      // Clear results container when search is cleared.
      geocoder.on('clear', () => {
        results.innerText = ''
      })
    },
  },
}
</script>
<style>
.mapboxgl-ctrl-geocoder.mapboxgl-ctrl {
  width: 100%;
  max-width: 600px;
}
</style>
