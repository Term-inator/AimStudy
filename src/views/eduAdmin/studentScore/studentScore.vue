<template>
  student score
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "StudentScoreView",
  setup() {
    onMounted(() => {
      console.log('student score')
    })
  },
})
</script>
