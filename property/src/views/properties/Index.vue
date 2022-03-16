<template>
  <div>
    <div class="d-flex justify-space-between">
      <label for="" class="text-h5">Properties </label>
      <v-btn depressed color="cyan" to="/admin/properties/create">
        Create
      </v-btn>
    </div>
    <v-row v-if="getProperties.length" class="mt-10">
      <v-col v-for="(property, i) in getProperties" :key="i" cols="4">
        <v-card max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="property.main_image"
          >
            <v-card-title>{{ property.title }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0 d-flex justify-space-between text-h5">
            <strong>Price</strong> ${{ property.price }}
          </v-card-subtitle>
          <v-card-text class="pb-0 d-flex justify-space-between">
            <strong>Home Type</strong> {{ property.home_type }}
          </v-card-text>

          <v-card-text class="pb-0 d-flex justify-space-between">
            <strong>SQFT</strong> {{ property.sqft }}
          </v-card-text>
          <v-card-text class="pb-0"> {{ property.bhk }} BHK </v-card-text>

          <v-card-text class="text--primary">
            <div>{{ property.address }}</div>

            <div>{{ property.facts_features }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="flex justify-center my-10 font-bold text-gray-900">
        There are no properties.
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      properties: [],
    }
  },

  // created() {
  //   axios.get('http://localhost:4000/properties').then((res) => {
  //     const id = localStorage.getItem('userId')
  //     if (id) {
  //       this.properties = res.data.filter((property) => property.userId == id)
  //     }
  //   })
  // },

  computed: {
    ...mapGetters(['getProperties']),
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    ...mapActions(['fetchProperties']),

    async fetchData() {
      await this.fetchProperties()
    },
  },
}
</script>
