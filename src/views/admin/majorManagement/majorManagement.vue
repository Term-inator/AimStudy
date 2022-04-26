<template>
  major management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "MajorManagementView",
  setup() {
    onMounted(() => {
      console.log('major management')
    })
  },
})
</script>