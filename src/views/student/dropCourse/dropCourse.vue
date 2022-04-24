<template>
  drop course
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "DropCourseView",
  setup() {
    onMounted(() => {
      console.log('drop course')
    })
  },
})
</script>
