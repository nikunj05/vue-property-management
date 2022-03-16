import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    properties: [],
  },

  getters: {
    getProperties: (state) => state.properties,
  },

  actions: {
    async addProperty({ commit }, data) {
      await axios
        .post('http://localhost:4000/properties', data)
        .then((response) => {
          commit('add_property', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async fetchProperties({ commit }) {
      await axios
        .get('http://localhost:4000/properties')
        .then((response) => {
          commit('fetch_properties', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  mutations: {
    add_property(state, data) {
      state.properties.push(data)
    },

    fetch_properties(state, data) {
      const id = localStorage.getItem('userId')
      if (id) {
        state.properties = data.filter((property) => property.userId == id)
      }
    },
  },
})
