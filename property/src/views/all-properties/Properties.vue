<template>
  <div>
    <!-- Header -->
    <header
      class="sticky top-0 z-30 w-full px-2 py-4 bg-indigo-100 shadow sm:px-4"
    >
      <div class="flex items-center justify-between mx-auto max-w-7xl">
        <a href="#">
          <span class="text-2xl font-extrabold text-blue-600">
            Property Portal
          </span>
        </a>
        <div class="flex items-center space-x-1">
          <ul class="hidden space-x-2 md:inline-flex">
            <li>
              <router-link
                to="/signup"
                class="px-4 py-2 font-bold text-gray-900 rounded"
              >
                Sign up
              </router-link>
            </li>
            <li>
              <router-link
                to="/login"
                class="px-4 py-2 font-bold text-gray-900 rounded"
              >
                Login
              </router-link>
            </li>
          </ul>
          <div class="inline-flex md:hidden">
            <button class="flex-none px-2" @click="showHeader = true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
              <span class="sr-only">Open Menu</span>
            </button>
            <!-- put list item -->
            <transition
              enter-active-class="duration-200 ease-out"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="duration-100 ease-in"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <div
                v-show="showHeader"
                focus
                class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
              >
                <div
                  class="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-indigo-50"
                >
                  <div class="flex items-center justify-between p-2">
                    <span class="text-xl font-semibold text-indigo-500">
                      Propety Portal</span
                    >
                    <button
                      class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      @click="showHeader = false"
                    >
                      <span class="sr-only">Close menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="px-5 py-6">
                    <div class="mt-6">
                      <router-link
                        to="/signup"
                        class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                      >
                        Sign up
                      </router-link>
                      <p
                        class="mt-6 text-base font-medium text-center text-gray-500"
                      >
                        Existing customer?
                        {{ ' ' }}
                        <router-link
                          to="/login"
                          class="text-indigo-600 hover:text-indigo-500"
                        >
                          Sign in
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>
    <div class="grid grid-cols-12">
      <div class="col-span-12 lg:col-span-6">
        <div id="geocoder" class="w-full m-2"></div>
        <div id="map" class="w-full h-96 lg:h-full"></div>
      </div>

      <div
        class="max-h-screen col-span-12 p-5 overflow-y-scroll h-52 lg:h-5/6 bg-gray-50 lg:col-span-6"
      >
        <div class="mb-2 text-lg font-medium text-indigo-500">
          <span v-if="properties.length">
            {{ properties.length }} Properties Available
          </span>
          <span v-else> There are no properties yet. </span>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(prop, index) in properties" :key="index">
              <button
                v-if="prop.region"
                id="state"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style="color: #fff"
                @click="locateAddress(prop.coordinates, properties)"
              >
                {{ prop.region }}
              </button>
            </div>
          </div>
        </div>
        <div class="grid w-full gap-5 md:grid-cols-2">
          <div
            v-if="propertyIndex < properties.length"
            v-for="propertyIndex in propertyToShow"
            class="flex flex-col overflow-hidden rounded-lg shadow-lg"
            @click="openProperty(properties[propertyIndex])"
          >
            <div class="flex-shrink-0">
              <img
                class="object-cover w-full h-32"
                :src="properties[propertyIndex].main_image"
                alt=""
              />
            </div>
            <div
              class="p-4 text-lg font-medium capitalize bg-slate-200 opacity-70"
            >
              {{ properties[propertyIndex].title }}
            </div>
            <div class="flex flex-col justify-between flex-1 p-4 bg-white">
              <div class="flex-1">
                <p class="text-base font-medium text-indigo-600">
                  <a href="#" class="hover:underline">
                    $ {{ properties[propertyIndex].price }}
                  </a>
                </p>
                <a href="#" class="block mt-2">
                  <p class="text-xl font-semibold text-gray-900">
                    {{ properties[propertyIndex].bhk }} BHK
                    {{ properties[propertyIndex].sqft }} SQFT home for
                    {{ properties[propertyIndex].home_type }}
                  </p>
                  <p class="mt-3 text-base text-gray-500">
                    {{ properties[propertyIndex].facts_features }}
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
              class="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container sm:max-w-lg lg:max-w-4xl"
              style="max-height: 90vh"
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
        </div>
        <button
          v-if="properties.length"
          type="button"
          class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="propertyToShow += 3"
          style="color: #fff"
        >
          Show More Properties
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showHeader: false,
      show: false,
      selectedProperty: null,
      properties: [],
      address: null,
      propertyToShow: 3,
      states: [],
    }
  },

  created() {
    axios.get('http://localhost:4000/properties').then((res) => {
      if (res) {
        this.properties = res.data

        console.log(this.properties.map((prop) => prop.region === prop.region))
        this.initMap(this.properties)
      }
    })
  },

  methods: {
    openProperty(property) {
      this.show = true
      this.selectedProperty = property
    },

    locateAddress(coordinates, properties) {
      // Add Markers
      if (coordinates) {
        mapboxgl.accessToken =
          'pk.eyJ1IjoiYW50ZWxvdmUxOSIsImEiOiJja2d1azl4ZmgwY3dvMnJueGljMnp6YnprIn0.aIRE0Ii2AmWYWCW5Z3cEFg'

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: 8,
        })
        const marker = new mapboxgl.Marker({
          color: 'orange',
        })

        map.on('click', marker.setLngLat(coordinates).addTo(map))
        let hoveredStateId = null

        var features = []

        for (let index = 0; index < properties.length; index++) {
          const element = properties[index]
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
            this.selectedProperty = JSON.parse(
              e.features[0].properties.property
            )
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

          map.addControl(new mapboxgl.NavigationControl())
        })
      }
    },

    initMap(properties) {
      var map

      mapboxgl.accessToken =
        'pk.eyJ1IjoiYW50ZWxvdmUxOSIsImEiOiJja2d1azl4ZmgwY3dvMnJueGljMnp6YnprIn0.aIRE0Ii2AmWYWCW5Z3cEFg'

      if (navigator.geolocation) {
        let center

        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude
          var lng = position.coords.longitude
          if (lat && lng) {
            center = [lng, lat]
          }

          //map configure
          map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 8,
            center: center,
          })

          let hoveredStateId = null

          // Add the control to the map.
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          })

          document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

          var features = []

          for (let index = 0; index < properties.length; index++) {
            const element = properties[index]
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
              this.selectedProperty = JSON.parse(
                e.features[0].properties.property
              )
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

            map.addControl(new mapboxgl.NavigationControl())
          })
        })
      }
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
  min-width: 97%;
  max-width: 400px;
}
.mapboxgl-ctrl-geocoder {
}
</style>
