<template>
  login
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "LoginView",
  setup() {
    onMounted(() => {
      console.log('login')
    })
  },
})
</script>
