<template>
  <nav-bar></nav-bar>
</template>
<script>
import { defineComponent } from 'vue'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import navBar from '@/components/navBar/navBar.vue'
import { getToken } from './utils/auth'

export default defineComponent({
  components: {
    navBar
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      if(getToken) {
        store.dispatch('constant/queryConstant')
      }
    })
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
