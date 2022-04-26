<template>
  student management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "StudentManagementView",
  setup() {
    onMounted(() => {
      console.log('student management')
    })
  },
})
</script>
