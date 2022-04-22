<template>
  <a-row type="flex" justify="space-around" align="middle" class="top-bar">
    <a-col>本科生教学管理系统</a-col>
    <a-col> {{ date }} </a-col>
    <a-col> {{ name }} {{ id }} </a-col>
    <a-col> {{ department }} </a-col>
    <a-col>
      <a-button type="link">注销</a-button>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: "topBar",
  setup() {
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
      role: "admin",
      name: "张三",
      id: "10195xxxxxx",
      department: "软件工程学院"
    })
    
    return {
      today,
      ...toRefs(state)
    }
  },
})
</script>

<style scoped>
  .top-bar {
    height: 8vh;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
  }
</style>
