<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list dense nav class="mt-16">
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="flex justify-between w-full">
        <v-toolbar-title v-if="name">{{ name }} Dashboard</v-toolbar-title>
        <v-btn color="primary" @click="logout">logout</v-btn>
      </div>
    </v-app-bar>

    <v-main class="mx-2 my-2">
      <router-view />
    </v-main>

    <div
      v-if="message"
      class="fixed top-0 left-0 flex justify-end w-full h-full modal"
    >
      <div
        class="absolute top-0 w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>
      <div class="w-96">
        <v-alert v-if="alert" :type="alert" dismissible>{{ message }}</v-alert>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      drawer: null,
      name: '',
      alert: '',
      message: '',
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/admin/dashboard',
        },
        { title: 'Property', icon: 'mdi-image', to: '/admin/properties' },
      ],
    }
  },

  mounted() {
    const id = localStorage.getItem('userId')
    axios.get(`http://localhost:4000/me?id=${id}`).then((res) => {
      this.name = res.data.data.name
    })
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.alert = 'success'
      this.message = 'Logout successfully.'
      this.$router.push('/login')
    },
  },
}
</script>
