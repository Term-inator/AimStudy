<template>
  release course
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "ReleaseCourseView",
  setup() {
    onMounted(() => {
      console.log('release course')
    })
  },
})
</script>
