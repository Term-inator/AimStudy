<template>
  campus management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "CampusManagementView",
  setup() {
    onMounted(() => {
      console.log('campus management')
    })
  },
})
</script>