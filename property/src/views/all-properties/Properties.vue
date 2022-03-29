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
          <div
            v-if="regions.length"
            class="grid h-24 grid-cols-8 my-4 overflow-y-auto"
          >
            <div
              v-for="(prop, index) in regions"
              :key="index"
              class="space-x-2"
            >
              <button
                v-show="prop.region"
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
        <div class="grid w-full gap-2 md:grid-cols-2">
          <div
            v-if="propertyIndex < properties.length"
            v-for="propertyIndex in propertyToShow"
            class="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div class="relative flex-shrink-0">
              <div class="absolute right-2 top-1">
                <svg
                  v-if="isAuthenticated"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-white cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="showLogin = true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-white cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <img
                class="object-cover w-full h-32"
                :src="properties[propertyIndex].main_image"
                alt=""
              />
            </div>
            <div
              class="flex justify-between p-4 text-lg font-medium capitalize bg-slate-200 opacity-70"
            >
              <span>
                {{ properties[propertyIndex].title }}
              </span>

              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="openProperty(properties[propertyIndex])"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="showInquiry = true"
                >
                  <path
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
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

          <SelectedProperty
            v-show="showSelectedProperty"
            :selectedProperty="selectedProperty"
            @close-property-modal="showSelectedProperty = false"
          />

          <InquiryForm
            v-show="showInquiry"
            @close-inquiry-modal="showInquiry = false"
          />

          <LoginForm
            v-show="showLogin"
            @close-login-modal="showLogin = false"
          />
        </div>

        <button
          v-if="properties.length"
          type="button"
          class="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
import SelectedProperty from '@/components/SelectedProperty.vue'
import InquiryForm from '@/components/InquiryForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    SelectedProperty,
    InquiryForm,
    LoginForm,
  },

  data() {
    return {
      isAuthenticated: false,
      showHeader: false,
      showSelectedProperty: false,
      showInquiry: false,
      showLogin: true,
      selectedProperty: null,
      properties: [],
      address: null,
      propertyToShow: 3,
      regions: [],
    }
  },

  created() {
    axios.get('http://localhost:4000/properties').then((res) => {
      if (res) {
        this.properties = res.data
        this.initMap(this.properties, this.showSelectedProperty)

        var resArr = []
        this.properties.filter(function (item) {
          var i = resArr.findIndex((x) => x.region == item.region)
          if (i <= -1) {
            resArr.push(item)
          }
          return null
        })

        this.regions = resArr
      }
    })
  },

  methods: {
    openProperty(property) {
      this.showSelectedProperty = true
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
            this.showSelectedProperty = true
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

    initMap(properties, show) {
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
              if (show) {
                this.showSelectedProperty = show
              } else {
                this.showSelectedProperty = true
              }
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
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right {
  z-index: 0;
}
</style>
