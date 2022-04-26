<template>
  release course management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "ReleaseCourseManagementView",
  setup() {
    onMounted(() => {
      console.log('release course management')
    })
  },
})
</script>
