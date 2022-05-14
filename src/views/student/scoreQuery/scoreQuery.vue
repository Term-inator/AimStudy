<template>
  course query
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "CourseQueryView",
  setup() {
    onMounted(() => {
      console.log('score query')
    })
  },
})
</script>
