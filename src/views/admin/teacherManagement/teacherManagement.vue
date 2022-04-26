<template>
  teacher management
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "TeacherManagementView",
  setup() {
    onMounted(() => {
      console.log('teacher management')
    })
  },
})
</script>