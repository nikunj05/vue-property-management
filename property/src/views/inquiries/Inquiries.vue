<template>
  <div>
    <div class="d-flex justify-space-between">
      <label for="" class="text-h5"> Inquiries </label>
    </div>
    <v-data-table :headers="headers" :items="inquiries"></v-data-table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      inquiries: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Message', value: 'message' },
      ],
    }
  },

  mounted() {
    axios.get('http://localhost:4000/inquiries').then((res) => {
      if (res) {
        this.inquiries = res.data
      }
    })
  },
}
</script>
