<template>
  select course
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "SelectCourseView",
  setup() {
    onMounted(() => {
      console.log('select course')
    })
  },
})
</script>
