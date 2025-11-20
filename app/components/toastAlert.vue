<template>
  <div v-if="visible" :class="['toast', typeClass]" class="fixed top-20 right-5 px-4 py-2 rounded shadow-lg text-white z-50 transition">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ToastAlert',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success' // success, error, warning
    }
  },
  data() {
    return {
      visible: false,
      internalMessage: '',
      internalType: 'success',
      timeoutId: null
    }
  },
  computed: {
    typeClass() {
      switch (this.internalType) {
        case 'success': return 'bg-green-500'
        case 'error': return 'bg-red-500'
        case 'warning': return 'bg-yellow-400 text-black'
        default: return 'bg-gray-800'
      }
    },
    message() {
      return this.internalMessage
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.internalMessage = message
      this.internalType = type
      this.visible = true
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.visible = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.toast {
  min-width: 200px;
  max-width: 400px;
  font-weight: bold;
}
</style>
