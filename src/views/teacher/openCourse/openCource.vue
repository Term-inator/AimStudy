<template>
  open course
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "OpenCourseView",
  setup() {
    onMounted(() => {
      console.log('open course')
    })
  },
})
</script>
