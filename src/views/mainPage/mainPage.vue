<template>
  main
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "MainView",
  setup() {
    onMounted(() => {
      console.log('main')
    })
  },
})
</script>
