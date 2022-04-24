<template>
  <nav-bar></nav-bar>
</template>
<script>
import { defineComponent, onBeforeMount } from 'vue'
import navBar from '@/components/navBar/navBar.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    navBar
  },
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.commit('user/setUser', {
        name: '张三',
        id: '123456789',
        department: '计算机科学与技术学院',
        roles: ['admin']
        // admin edu_admin teacher student
      })
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
    text-align: center;
    color: #2c3e50;
  }
</style>
