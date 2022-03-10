<template>
  <div>
    <div
      class="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
    >
      <div class="absolute inset-0">
        <div class="h-1/3 sm:h-2/3" />
      </div>
      <div class="relative">
        <div class="text-center">
          <h2
            class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Property Search
          </h2>
          <p class="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
            You can search property on map
          </p>
        </div>
        <div class="mt-5 lg:grid xl:grid-cols-12 lg:gap-x-5">
          <aside class="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-6">
            <div class="space-y-1">
              <div id="geocoder" class="mb-5"></div>

              <div id="map" style="width: 600px; height: 500px"></div>
            </div>
          </aside>
          <div class="mt-10 space-y-6 xl:mt-0 sm:px-6 lg:px-0 lg:col-span-6">
            <div class="grid w-full gap-5 lg:grid-cols-2">
              <div
                v-for="(property, i) in properties"
                :key="i"
                class="flex flex-col overflow-hidden rounded-lg shadow-lg"
                @click="openProperty(property)"
              >
                <div class="flex-shrink-0">
                  <img
                    class="object-cover w-full h-48"
                    :src="property.main_image"
                    alt=""
                  />
                </div>
                <div
                  class="p-4 text-lg font-medium capitalize bg-slate-200 opacity-70"
                >
                  {{ property.title }}
                </div>
                <div class="flex flex-col justify-between flex-1 p-6 bg-white">
                  <div class="flex-1">
                    <p class="text-base font-medium text-indigo-600">
                      <a href="#" class="hover:underline">
                        $ {{ property.price }}
                      </a>
                    </p>
                    <a href="#" class="block mt-2">
                      <p class="text-xl font-semibold text-gray-900">
                        {{ property.bhk }} BHK {{ property.sqft }} SQFT home for
                        {{ property.home_type }}
                      </p>
                      <p class="mt-3 text-base text-gray-500">
                        {{ property.facts_features }}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div
                v-if="show"
                class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal"
              >
                <div
                  class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
                ></div>

                <div
                  class="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container sm:max-w-lg lg:max-w-4xl md:max-w-7xl"
                >
                  <div class="flex justify-end p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      @click="show = false"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div v-if="selectedProperty" class="p-4">
                    <div class="grid grid-cols-12 gap-4 lg:grid-cols-2">
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
                          <span
                            class="ml-5 text-base font-medium text-gray-500"
                          >
                            {{ selectedProperty.sqft }} sqft</span
                          >
                          <span
                            class="ml-5 text-base font-medium text-gray-500"
                          >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      show: false,
      selectedProperty: null,
      properties: [],
      address: null,
      lat: -77.04,
      lng: 38.907,
    }
  },

  created() {
    axios.get('http://localhost:4000/properties').then((res) => {
      this.properties = res.data
      if (this.properties) {
        this.initMap()
      }
    })
  },

  methods: {
    openProperty(property) {
      this.show = true
      this.selectedProperty = property
    },

    initMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaGFzaWkiLCJhIjoiY2wwYWt4cjJ1MDF4YTNjbWptNzZwM2ZhZyJ9.9WUVDkgiL5lsqX95u0VAvA'

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-120.094292506456, 48.0250054263],
        zoom: 4,
      })
      let hoveredStateId = null

      // Add the control to the map.
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })

      document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

      var features = []

      for (let index = 0; index < this.properties.length; index++) {
        const element = this.properties[index]
        features.push({
          type: 'Feature',
          properties: {
            description: `
              <div class="flex justify-between space-x-4">
                <img src="${element.main_image}" class="w-10 h-10" />
                <div>
                  <strong> ${element.title} <span class="ml-2 text-indigo-500"> $${element.price} </span>  </strong>
                  <p> ${element.address} </p>
                </div>
              </div>
            `,
            property: element,
          },
          geometry: {
            type: 'Point',
            coordinates: element.coordinates,
          },
        })
      }

      map.on('load', () => {
        map.addSource('places', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features,
          },
        })

        // Add a layer showing the places.
        map.addLayer({
          id: 'places',
          type: 'circle',
          source: 'places',
          paint: {
            'circle-color': 'red',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
          },
        })

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        })

        map.on('mouseenter', 'places', (e) => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer'

          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice()
          const description = e.features[0].properties.description

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })

        map.on('mouseleave', 'places', () => {
          map.getCanvas().style.cursor = ''
          popup.remove()
        })

        map.on('click', 'places', (e) => {
          this.show = true
          this.selectedProperty = JSON.parse(e.features[0].properties.property)
        })

        map.addSource('states', {
          type: 'geojson',
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
        })

        // The feature-state dependent fill-opacity expression will render the hover effect
        // when a feature's hover state is set to true.

        map.addLayer({
          id: 'state-fills',
          type: 'fill',
          source: 'states',
          layout: {},

          paint: {
            'fill-color': 'rgba(0, 0, 0, 0.1)',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.5,
            ],
          },
        })

        map.addLayer({
          id: 'state-borders',
          type: 'line',
          source: 'states',
          layout: {},
          paint: {
            'line-color': 'rgba(0, 0, 0, 0)',
            'line-width': 2,
          },
        })

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'state-fills', (e) => {
          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.setFeatureState(
                { source: 'states', id: hoveredStateId },
                { hover: false }
              )
            }
            hoveredStateId = e.features[0].id
            map.setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: true }
            )
          }
        })

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'state-fills', () => {
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: false }
            )
          }
          hoveredStateId = null
        })

        map.on('click', 'state-fills', (e) => {
          // console.log(e.features[0].properties)
        })
      })
    },
  },
}
</script>

<style>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.mapboxgl-ctrl-geocoder.mapboxgl-ctrl {
  z-index: 0;
  min-width: 85%;
  max-width: 400px;
}
.mapboxgl-ctrl-geocoder {
}
</style>
