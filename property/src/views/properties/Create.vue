<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card class="px-4 py-2 mx-4" max-width="800">
      <form action="" @submit.prevent="submit">
        <label for="cover-photo" class="block text-sm font-medium">
          Cover Image
        </label>

        <div
          class="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md mb-7"
        >
          <div class="space-y-1 text-center">
            <svg
              v-if="!previewImage"
              class="w-12 h-12 mx-auto text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span v-if="!previewImage">Upload a file</span>
                <input
                  id="file-upload"
                  name="image"
                  type="file"
                  class="sr-only"
                  @change="uploadImage"
                />
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt=""
                  class="w-20 h-20"
                />
                <span v-if="previewImage" @click="remove">remove</span>
              </label>
              <p v-if="!previewImage" class="pl-1">or drag and drop</p>
            </div>
            <p v-if="!previewImage" class="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>

        <label for="cover-photo" class="block mb-2 text-sm font-medium">
          Upload Gallery
        </label>

        <v-file-input
          v-model="gallery"
          placeholder="Upload your documents"
          label="File input"
          multiple
          outlined
          prepend-icon="mdi-paperclip"
          @change="uploadGallery"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>

        <v-text-field
          v-model="formData.title"
          :error-messages="titleErrors"
          label="Title"
          required
          outlined
          @input="$v.formData.title.$touch()"
          @blur="$v.formData.title.$touch()"
        />

        <div id="geocoder" class="mb-8"></div>
        <pre id="result" ref="result" class="hidden"></pre>

        <v-radio-group
          v-model="formData.home_type"
          :error-messages="homeTypeErrors"
          @input="$v.formData.home_type.$touch()"
          @blur="$v.formData.home_type.$touch()"
        >
          <template v-slot:label>
            <div class="text-subtitle">Home Type</div>
          </template>
          <v-radio label="Rent" value="rent"></v-radio>
          <v-radio label="Sale" value="sale"></v-radio>
        </v-radio-group>

        <v-text-field
          v-model="formData.sqft"
          :error-messages="sqftErrors"
          label="Square Feet"
          required
          outlined
          @input="$v.formData.sqft.$touch()"
          @blur="$v.formData.sqft.$touch()"
        />

        <v-text-field
          v-model="formData.bhk"
          :error-messages="bhkErrors"
          label="BHK"
          required
          outlined
          @input="$v.formData.bhk.$touch()"
          @blur="$v.formData.bhk.$touch()"
        />

        <v-textarea
          v-model="formData.facts_features"
          :error-messages="factFeaturesErrors"
          label="Facts Features"
          required
          outlined
          @input="$v.formData.facts_features.$touch()"
          @blur="$v.formData.facts_features.$touch()"
        />

        <v-text-field
          v-model="formData.price"
          :error-messages="priceErrors"
          label="Price"
          type="number"
          outlined
          required
          @input="$v.formData.price.$touch()"
          @blur="$v.formData.price.$touch()"
        />

        <div class="justify-end d-flex">
          <v-btn type="submit" color="primary"> Submit </v-btn>
        </div>
      </form>
    </v-card>

    <Notification :show="show" :message="message" :type="type" />
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapActions } from 'vuex'
import Notification from '@/components/Notification.vue'

export default {
  mixins: [validationMixin],

  components: {
    Notification,
  },

  data: () => ({
    show: false,
    message: '',
    type: '',

    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/admin/dashboard',
      },
      {
        text: 'Properties',
        disabled: false,
        to: '/admin/properties',
      },
      {
        text: 'Property Create',
        disabled: true,
      },
    ],

    previewImage: '',
    previewGallery: '',
    gallery: [],

    formData: {
      title: '',
      address: null,
      home_type: '',
      sqft: '',
      bhk: '',
      facts_features: '',
      price: null,
      main_image: null,
      gallery: [],
      coordinates: [],
      region: '',
      userId: '',
    },
  }),

  validations: {
    formData: {
      title: { required },
      address: { required },
      home_type: { required },
      sqft: { required },
      bhk: { required },
      facts_features: { required },
      price: { required },
    },
  },

  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.formData.title.$dirty) return errors
      !this.$v.formData.title.required && errors.push('Title is required.')
      return errors
    },

    addressErrors() {
      const errors = []
      if (!this.$v.formData.address.$dirty) return errors
      !this.$v.formData.address.required && errors.push('Address is required.')
      return errors
    },

    homeTypeErrors() {
      const errors = []
      if (!this.$v.formData.home_type.$dirty) return errors
      !this.$v.formData.home_type.required &&
        errors.push('Home Type is required.')
      return errors
    },

    sqftErrors() {
      const errors = []
      if (!this.$v.formData.sqft.$dirty) return errors
      !this.$v.formData.sqft.required && errors.push('Sqft is required.')
      return errors
    },

    factFeaturesErrors() {
      const errors = []
      if (!this.$v.formData.facts_features.$dirty) return errors
      !this.$v.formData.facts_features.required &&
        errors.push('Facts features field is required.')
      return errors
    },

    priceErrors() {
      const errors = []
      if (!this.$v.formData.price.$dirty) return errors
      !this.$v.formData.price.required &&
        errors.push('Price field is required.')
      return errors
    },

    bhkErrors() {
      const errors = []
      if (!this.$v.formData.bhk.$dirty) return errors
      !this.$v.formData.bhk.required && errors.push('Bhk field is required.')
      return errors
    },
  },

  watch: {
    $refs: {
      handler: 'initAddress',
      deep: true,
    },
  },

  mounted() {
    this.initAddress()
  },

  methods: {
    ...mapActions(['addProperty']),

    submit() {
      this.$v.$touch()
      if (this.formData) {
        const id = localStorage.getItem('userId')
        this.formData.userId = id

        this.addProperty(this.formData)
          .then((res) => {
            if (res) {
              this.show = true
              this.message = 'Property created successfully.'
              this.type = 'success'
            }
          })
          .catch((err) => {
            if (err) {
              this.show = true
              this.type = 'error'
              this.message = 'There are some error.'
            }
          })
        this.$router.push('/admin/properties')
      }
    },

    uploadImage(event) {
      const input = event.target
      if (input.files) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(input.files[0])

        var fd = new FormData()

        fd.append('dataFile', input.files[0])

        axios.post('http://localhost:4000/uploadfile', fd).then((res) => {
          this.formData.main_image = res.data.filePath
        })
      }
    },

    uploadGallery() {
      const formData = new FormData()
      if (!this.gallery.length) return
      for (var i = 0; i < this.gallery.length; i++) {
        let file = this.gallery[i]
        formData.append('dataFiles', file)
      }
      axios
        .post('http://localhost:4000/uploadmultifile', formData)
        .then((res) => {
          this.formData.gallery = res.data.filesArray
        })
    },

    remove() {
      this.previewImage = ''
    },

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
        this.formData.coordinates = e.result.geometry.coordinates
        this.formData.address = e.result.place_name
        this.formData.region = e.result.context[1].text
          ? e.result.context[1].text
          : e.result.text

        console.log(e.result.context)
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
  max-width: 800px;
  border: 1px solid gray;
}
</style>
