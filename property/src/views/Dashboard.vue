<template>
  <div>Dashboard</div>
  <!-- <div v-if="userDetail" class="font-weight-bold text-h5">
    <v-card class="" max-width="344">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title> {{ userDetail.name }} </v-card-title>

      <v-card-subtitle> {{ userDetail.email }} </v-card-subtitle>
    </v-card>
  </div> -->
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      userDetail: null,
      show: false,
    }
  },

  mounted() {
    // const id = localStorage.getItem('userId')
    // axios.get(`http://localhost:4000/me?id=${id}`).then((res) => {
    //   this.userDetail = res.data.data
    // })
  },
}
</script>
