<template>
  course score
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "CourseScoreView",
  setup() {
    onMounted(() => {
      console.log('course score')
    })
  },
})
</script>
