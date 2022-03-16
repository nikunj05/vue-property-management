<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          :class="success || info ? 'bg-white' : 'bg-red-50'"
          class="max-w-sm mb-3 rounded-lg shadow-lg cursor-pointer pointer-events-auto w-96"
        >
          <div class="p-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  v-if="success"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-if="info"
                  class="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  v-if="error"
                  class="w-6 h-6 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="flex-1 w-0 pt-0.5 ml-3">
                <p
                  :class="`text-sm leading-5 font-medium mb-0 ${
                    success || info ? 'text-gray-900' : 'text-red-800'
                  }`"
                >
                  {{ message }}
                </p>
              </div>
              <div class="flex-shrink-0 ml-4">
                <button
                  @click="show = false"
                  :class="
                    success || info
                      ? ' text-gray-400 focus:text-gray-500'
                      : 'text-red-400 focus:text-red-500'
                  "
                  class="inline-flex w-5 h-5 transition duration-150 ease-in-out focus:outline-none"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },

    message: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'success',
    },
  },

  computed: {
    success() {
      return this.type === 'success'
    },
    error() {
      return this.type === 'error'
    },
    info() {
      return this.type === 'info'
    },
  },
}
</script>
