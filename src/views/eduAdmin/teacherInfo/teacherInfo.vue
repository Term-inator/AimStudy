<template>
  teacher info
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "TeacherInfoView",
  setup() {
    onMounted(() => {
      console.log('teacher info')
    })
  },
})
</script>
