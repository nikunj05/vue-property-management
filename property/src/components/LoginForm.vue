<template>
  <div
    @click="$emit('close-login-modal')"
    class="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full modal"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div
      @click.stop
      class="z-50 w-full max-w-xs mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container"
      style="max-height: 80vh"
    >
      <div class="flex justify-between p-4">
        <div class="text-xl font-bold text-gray-900 captialize">Login Form</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="$emit('close-login-modal')"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="p-4">
        <form action="" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            outlined
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

          <button
            type="submit"
            style="color: #fff"
            class="items-center w-full px-4 py-2 mt-5 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',

  mixins: [validationMixin],

  data() {
    return {
      email: '',
    }
  },

  validations: {
    email: { required, email },
  },

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
    },
  },
}
</script>
