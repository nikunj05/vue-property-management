<template>
  <div
    @click="$emit('close-inquiry-modal')"
    class="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full modal"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div
      @click.stop
      class="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container sm:max-w-lg lg:max-w-4xl"
      style="max-height: 80vh"
    >
      <div class="flex justify-between p-4">
        <div class="text-xl font-bold text-gray-900 captialize">
          Inquiry Form
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="$emit('close-inquiry-modal')"
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
            v-model="formData.name"
            :error-messages="nameErrors"
            label="Name"
            required
            outlined
            @input="$v.formData.name.$touch()"
            @blur="$v.formData.name.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="formData.email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            outlined
            @input="$v.formData.email.$touch()"
            @blur="$v.formData.email.$touch()"
          ></v-text-field>

          <v-textarea
            v-model="formData.message"
            :error-messages="messageErrors"
            label="Message"
            required
            outlined
            @input="$v.formData.message.$touch()"
            @blur="$v.formData.message.$touch()"
          ></v-textarea>

          <!--  <div class="grid grid-cols-12 gap-2">
            <v-text-field id="mainCaptcha" outlined class="col-span-4">
            </v-text-field>

            <div class="col-span-2">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="generateCaptcha()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
      
          <v-text-field
            id="txtInput"
            v-model="formData.captcha"
            :error-messages="captchaErrors"
            label="Captcha"
            required
            outlined
            @input="CheckValidCaptcha()"
            @blur="$v.formData.captcha.$touch()"
          >
          </v-text-field>
          <span v-show="success" id="success" style="color: green"></span>
          <span v-show="!success" id="error" style="color: red"></span>
          <br /> -->

          <VueRecaptcha
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            @verify="verifyMethod"
          ></VueRecaptcha>

          <span v-show="isCaptcha" class="text-red-500">
            Please select recaptcha checkbox.
          </span>

          <div class="flex justify-end">
            <button
              type="submit"
              style="color: #fff"
              class="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
                />
              </svg>
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-show="show" class="absolute top-0 right-0 w-96">
      <span
        :class="[
          type
            ? 'text-green-500 border-green-500'
            : 'text-red-500 border-red-500',
          'p-4 m-2  bg-white border-l-4  rounded-md',
        ]"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import Notification from './Notification.vue'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'InquiryForm',

  components: {
    Notification,
    VueRecaptcha,
  },

  mixins: [validationMixin],

  props: {
    showInquiry: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
      message: '',
      type: '',
      success: false,
      isCaptcha: false,

      formData: {
        name: '',
        email: '',
        message: '',
        captcha: false,
      },
    }
  },

  validations: {
    formData: {
      name: { required },
      email: { required, email },
      message: { required },
      captcha: { required },
    },
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.required && errors.push('Name is required')
      return errors
    },

    emailErrors() {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('E-mail is required')
      return errors
    },

    messageErrors() {
      const errors = []
      if (!this.$v.formData.message.$dirty) return errors
      !this.$v.formData.message.required && errors.push('Message is required')
      return errors
    },

    captchaErrors() {
      const errors = []
      if (!this.$v.formData.captcha.$dirty) return errors
      !this.$v.formData.captcha.required && errors.push('Captcha is required')
      return errors
    },
  },

  created() {
    this.generateCaptcha()
  },

  methods: {
    verifyMethod(response) {
      this.formData.captcha = true
      console.log(response)
    },

    generateCaptcha() {
      var alpha = new Array(
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      )
      var i
      for (i = 0; i < 4; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)]
        var b = alpha[Math.floor(Math.random() * alpha.length)]
        var c = alpha[Math.floor(Math.random() * alpha.length)]
        var d = alpha[Math.floor(Math.random() * alpha.length)]
      }
      var code = a + '' + b + '' + '' + c + '' + d
      if (document.getElementById('mainCaptcha')) {
        document.getElementById('mainCaptcha').value = code
      }
    },

    CheckValidCaptcha() {
      this.$v.formData.captcha.$touch()

      var string1 = this.removeSpaces(
        document.getElementById('mainCaptcha').value
      )

      var string2 = this.removeSpaces(document.getElementById('txtInput').value)

      if (string1 == string2) {
        this.success = true
        document.getElementById('success').innerHTML =
          'Captcha code was matched successfully.'
        return true
      } else {
        document.getElementById('error').innerHTML =
          'Please enter a valid captcha.'
        return false
      }
    },

    removeSpaces(string) {
      return string.split(' ').join('')
    },

    submit() {
      this.$v.$touch()
      if (this.formData.captcha === true) {
        axios
          .post('http://localhost:4000/inquiry', this.formData)
          .then((res) => {
            if (res) {
              alert('Your inquiry has been submited successfully.')
              this.show = true
              this.message = this.type = 'success'
              this.$emit('close-inquiry-modal')
            }
          })
          .catch((err) => {
            alert('There are some error.')

            this.show = true
            this.message = 'There are some error.'
            this.type = 'error'
            this.$emit('close-inquiry-modal')
            console.log(err)
          })
      } else {
        this.isCaptcha = true
      }
    },
  },
}
</script>
