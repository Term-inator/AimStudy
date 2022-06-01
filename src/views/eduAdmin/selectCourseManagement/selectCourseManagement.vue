<template>
  select course management
</template>
// TODO @deprecated
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
