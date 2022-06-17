<template>
  <div class="main">
    <div style="margin: 20px 0 0 20px;">
      <a-select v-model:value="event_type" style="width: 200px;">
        <a-select-option value="100">开课</a-select-option>
        <a-select-option value="101">退课</a-select-option>
      </a-select>
    </div>
    <div style="margin: 40px 0 0 20px;">
      <a-range-picker
        :show-time="{ format: 'HH:mm:ss' }"
        format="YYYY-MM-DD HH:mm:ss"
        :placeholder="['开始时间', '结束时间']"
        @change="onRangeChange"
        @ok="onRangeOk"
      />
      <a-button type="primary" @click="updateEvents">更新</a-button>
    </div>
  </div>
        
      
</template>

<script>
import { defineComponent, ref } from 'vue'
import { updateEvent } from '@/api/time-limited-event-controller'

export default defineComponent({
  name: 'EventManagementView',
  setup() {
    const event_type = ref('开课')

    const range = ref()
    const onRangeChange = (value, dateString) => {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
      range.value = dateString
    }

    const onRangeOk = value => {
      console.log('onOk: ', value)
    }

    const updateEvents = () => {
      let type = 0
      console.log(type)
      if (event_type.value === '开课') {
        type = 100
      } else {
        type = parseInt(event_type.value)
      }
      updateEvent({
        id: type,
        start_time: range.value[0],
        end_time: range.value[1],
      })
    }

    return {
      event_type,
      onRangeChange,
      onRangeOk,
      updateEvents
    }
  },
})
</script>


<style scoped>
  .main {
    padding: 20px 15px 0 15px;
  }

  h1 {
    font-size: 16px;
    font-weight: 500;
  }
</style>