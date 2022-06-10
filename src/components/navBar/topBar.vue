<template>
  <a-row type="flex" justify="space-between" align="middle" class="top-bar">
    <a-col :span="2">
      <slot name="close_menu"></slot>
    </a-col>
    <a-col :span="5">本科生教学管理系统</a-col>
    <a-col :span="5"> {{ date }} </a-col>
    <a-col :span="5"> {{ $store.state.user.name }} {{ $store.state.user.id }} </a-col>
    <a-col :span="5"> {{ $store.state.user.departmentName }} </a-col>
    <a-col :span="2">
      <a-button type="link" @click="logout">注销</a-button>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getDayByNumber } from '@/utils/constant'

export default defineComponent({
  name: "topBar",
  setup() {
    const router = useRouter()
    const store = useStore()

    let today = new Date()
    const state = reactive({
      date: `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日 ${getDayByNumber(today.getDay())}`
    })

    const logout = () => {
      store.dispatch("user/logout").then(() => {
        router.push("/login")
      })
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
    height: inherit;
    overflow: hidden;
  }
</style>
