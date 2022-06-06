<template>
  <nav-bar></nav-bar>
</template>
<script>
import { defineComponent } from 'vue'
import navBar from '@/components/navBar/navBar.vue'

export default defineComponent({
  components: {
    navBar
  },
  setup() {
  }
})
</script>

<style>
  @import "assets/css/reset.css";
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
