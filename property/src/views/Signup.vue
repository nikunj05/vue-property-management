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
                  alt="Sign up"
                  contain
                  height="200"
                ></v-img>
              </router-link>
              <v-card-text>
                <form action="" @submit.prevent="registerData">
                  <v-text-field
                    v-model="formData.name"
                    :error-messages="nameErrors"
                    label="Enter your name"
                    name="name"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-0"
                    outlined
                    @input="$v.formData.name.$touch()"
                    @blur="$v.formData.name.$touch()"
                  />
                  <v-text-field
                    v-model="formData.email"
                    :error-messages="emailErrors"
                    label="Enter your email"
                    name="email"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    class="rounded-0"
                    outlined
                    @input="$v.formData.email.$touch()"
                    @blur="$v.formData.email.$touch()"
                  />
                  <v-text-field
                    v-model="formData.password"
                    :error-messages="passwordErrors"
                    label="Enter your password"
                    name="password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                    outlined
                    @input="$v.formData.password.$touch()"
                    @blur="$v.formData.password.$touch()"
                  />
                  <v-text-field
                    v-model="formData.confirmPassword"
                    :error-messages="confirmPasswordErrors"
                    label="Re-enter password"
                    name="password"
                    prepend-inner-icon="mdi-lock-outline"
                    type="password"
                    class="rounded-0"
                    outlined
                    @input="$v.formData.confirmPassword.$touch()"
                    @blur="$v.formData.confirmPassword.$touch()"
                  />
                  <v-btn color="primary" x-large block dark type="submit">
                    Register
                  </v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Already have an account?
                    <router-link to="/login" class="ml-2 font-weight-black"
                      >Sign In</router-link
                    >
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Notification :show="show" :message="message" :type="type" />
  </v-app>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import Notification from '@/components/Notification.vue'

export default {
  name: 'Signup',
  mixins: [validationMixin],
  components: {
    Notification,
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      type: '',
      message: '',
      show: false,
    }
  },

  validations: {
    formData: {
      name: { required },
      email: { required },
      password: { required, minLength: minLength(7) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.required && errors.push('Email is required.')
      return errors
    },

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
      !this.$v.formData.password.minLength &&
        errors.push('Password must be minimum 6 characters')
      return errors
    },

    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.formData.confirmPassword.$dirty) return errors
      !this.$v.formData.confirmPassword.required &&
        errors.push('ConfirmPassword is required.')
      !this.$v.formData.confirmPassword.sameAsPassword &&
        errors.push('Password and Confirm Password should match')
      return errors
    },
  },

  methods: {
    registerData() {
      this.$v.$touch()
      if (this.formData) {
        axios
          .post('http://localhost:4000/registration', this.formData)
          .then((res) => {
            if (res) {
              this.show = true
              this.type = 'success'
              this.message = 'Register successfully.'
              this.$router.push('/login')
            }
          })
          .catch((err) => {
            if (err) {
              this.show = true
              this.type = 'error'
              this.message = 'There are some error.'
            }
            console.log(err)
          })
      }
    },
  },
}
</script>
