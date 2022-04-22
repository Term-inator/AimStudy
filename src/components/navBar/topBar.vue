<template>
  <a-row type="flex" justify="space-around" align="middle" class="top-bar">
    <a-col>
      <slot name="close_menu"></slot>
    </a-col>
    <a-col>本科生教学管理系统</a-col>
    <a-col> {{ date }} </a-col>
    <a-col> {{ user.name }} {{ user.id }} </a-col>
    <a-col> {{ user.department }} </a-col>
    <a-col>
      <a-button type="link" @click="logout">注销</a-button>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: "topBar",
  setup() {
    const router = useRouter()
    const store = useStore()

    let today = new Date()
    const dayMap = {
      "1": "一",
      "2": "二",
      "3": "三",
      "4": "四",
      "5": "五",
      "6": "六",
      "7": "日"
    }
    const state = reactive({
      date: `${today.getFullYear()}年${today.getMonth()}月${today.getDate()}日 星期${dayMap[today.getDay()]}`,
      user: store.state.user
    })

    const logout = () => {
      // this.$store.dispatch("logout")
      router.push("login")
    }
    
    return {
      today,
      ...toRefs(state),
      logout
    }
  },
})
</script>

<style scoped>
  .top-bar {
    height: 8vh;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  }
</style>
