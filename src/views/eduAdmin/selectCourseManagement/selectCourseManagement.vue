<template>
  select course management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "SelectCourseManagementView",
  setup() {
    onMounted(() => {
      console.log('select course management')
    })
  },
})
</script>
