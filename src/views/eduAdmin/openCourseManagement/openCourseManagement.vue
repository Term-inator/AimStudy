<template>
  open course management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "OpenCourseManagementView",
  setup() {
    onMounted(() => {
      console.log('open course management')
    })
  },
})
</script>
