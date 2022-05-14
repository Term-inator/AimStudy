<template>
  <table>
    <tr>
      <th>节次/周次</th>
      <th>星期一</th>
      <th>星期二</th>
      <th>星期三</th>
      <th>星期四</th>
      <th>星期五</th>
      <th>星期六</th>
      <th>星期日</th>
    </tr>
      <tr v-for="i in 14" :key="i">
        <td class="time-column">
          <div> {{ time_slot[i-1].title }} </div>
          <div> {{ time_slot[i-1].time }} </div>
        </td>
        <template v-for="(sections, j) in course_table" :key="j">
          <td v-if="sections[i-1].state === 1" :rowspan="sections[i-1].span" class="section">
            {{ `${sections[i-1].teacher} ${sections[i-1].course_name} ${sections[i-1].room}` }}
          </td>
          <td v-else-if="sections[i-1].state === 0" :rowspan="sections[i-1].span"></td>
        </template>
      </tr>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

const time_slot = [
      { title: "第一节", time: "8:00 - 8:45" },
      { title: "第二节", time: "8:50 - 9:35" },
      { title: "第三节", time: "9:50 - 10:35" },
      { title: "第四节", time: "10:40 - 11:25" },
      { title: "第五节", time: "11:30 - 12:15" },
      { title: "第六节", time: "13:00 - 13:45" },
      { title: "第七节", time: "13:50 - 14:35" },
      { title: "第八节", time: "14:50 - 15:35" },
      { title: "第九节", time: "15:40 - 16:25" },
      { title: "第十节", time: "16:30 - 17:15" },
      { title: "第十一节", time: "18:00 - 18:45" },
      { title: "第十二节", time: "18:50 - 19:35" },
      { title: "第十三节", time: "19:40 - 20:25" },
      { title: "第十四节", time: "20:30 - 21:15" },
    ]

export default defineComponent({
  name: 'CourseTable',
  props: {
    course_table: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup() {
    return {
      time_slot
    }
  },
})
</script>

<style scoped>
  table {
    border: 2px solid royalblue;
  }

  th, td {
    min-width: 100px;
    background-color: white;
    border: 1px solid royalblue;
    text-align: center;
  }

  th {
    background-color: rgba(64, 104, 224, 0.3);
  }

  .time-column {
    background-color: rgba(224, 255, 255, 0.3);
  }

  .section {
    padding: 0 5px 0 5px;
  }
</style>
