<template>
  publish score
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: "PublishScoreView",
  setup() {
    onMounted(() => {
      console.log('publish score')
    })
  },
})
</script>
