<template>
  student info
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "StudentInfoView",
  setup() {
    onMounted(() => {
      console.log('student info')
    })
  },
})
</script>
