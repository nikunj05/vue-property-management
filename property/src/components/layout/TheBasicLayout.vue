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

      <div class="flex justify-end w-full">
        <v-btn color="primary" @click="logout">logout</v-btn>
      </div>
    </v-app-bar>

    <v-main class="mx-2 my-2">
      <router-view />
    </v-main>

    <Notification :show="show" :message="message" :type="type" />
  </v-app>
</template>

<script>
// import axios from 'axios'
import Notification from '../Notification.vue'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      show: false,
      drawer: null,
      name: '',
      type: '',
      message: '',
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/admin/dashboard',
        },
        { title: 'Properties', icon: 'mdi-image', to: '/admin/properties' },
      ],
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      alert()
      this.show = true
      this.type = 'success'
      this.message = 'Logout successfully.'
      this.$router.push('/login')
    },
  },
}
</script>
