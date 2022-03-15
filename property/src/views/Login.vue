<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <router-link to="/">
                <v-img
                  src="@/assets/login.png"
                  alt="login"
                  contain
                  height="200"
                ></v-img>
              </router-link>
              <v-card-text>
                <form action="" @submit.prevent="loginData">
                  <v-text-field
                    v-model="formData.email"
                    :error-messages="emailErrors"
                    label="Email"
                    type="email"
                    outlined
                    prepend-inner-icon="mdi-email"
                    @input="$v.formData.email.$touch()"
                    @blur="$v.formData.email.$touch()"
                  />
                  <v-text-field
                    v-model="formData.password"
                    :error-messages="passwordErrors"
                    label="Password"
                    type="password"
                    outlined
                    prepend-inner-icon="mdi-lock"
                    @input="$v.formData.password.$touch()"
                    @blur="$v.formData.password.$touch()"
                  />

                  <v-btn
                    type="submit"
                    class="rounded-0"
                    color="primary"
                    x-large
                    block
                    dark
                  >
                    Login
                  </v-btn>
                  <v-card-actions class="text--secondary">
                    <v-checkbox
                      color="#000000"
                      label="Remember me"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    No account?
                    <router-link to="/signup" class="pl-2 font-weight-black">
                      Sign Up
                    </router-link>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div
      v-if="isAlert"
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
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],

  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      alert: '',
      message: '',
      isAlert: false,
    }
  },

  validations: {
    formData: {
      email: { required },
      password: { required, minLength: minLength(7) },
    },
  },

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.required && errors.push('Email is required.')
      return errors
    },

    passwordErrors() {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.required &&
        errors.push('Password is required.')
      return errors
    },
  },

  methods: {
    loginData() {
      this.$v.$touch()
      if (this.formData) {
        axios
          .post('http://localhost:4000/signin', this.formData)
          .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userId', res.data.data.userData._id)
            this.alert = 'success'
            this.message = 'Login Successfully.'
            this.$router.push('/admin')
          })
          .catch((err) => {
            if (err) {
              this.isAlert = true
              this.alert = 'error'
              this.message = 'Invalid Credentials.'
              setTimeout((this.isAlert = false), 2000)
            }
            console.log(err)
          })
      }
    },
  },
}
</script>
