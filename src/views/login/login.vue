<template>
  <div class="main">
    <a-card title="Card title" :bordered="false" style="width: 300px">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "LoginView",
  setup() {
    
  },
})
</script>

<style scoped>
 .main {
   height: 100vh;
 }
</style>
