<template>
  course table
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "CourseTableView",
  setup() {
    onMounted(() => {
      console.log('course table')
    })
  },
})
</script>
