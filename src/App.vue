<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
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
    
  },
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

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
