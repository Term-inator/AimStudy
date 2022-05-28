<template>
  course pool
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "CoursePoolView",
  setup() {
    onMounted(() => {
      console.log('course pool')
    })
  },
})
</script>
