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
      <tr v-for="sec in 14" :key="sec">
        <td class="time-column" :ref="time_slot[sec-1].ref">
          <div> {{ time_slot[sec-1].title }} </div>
          <div> {{ time_slot[sec-1].time }} </div>
        </td>
        <template v-for="(sections, day) in course_table" :key="day">
          <td v-if="sections[sec-1].state === 0" 
            :rowspan="combine ? sections[sec-1].span : 1"
            @click="clickCell($event, sec-1, day)"
            >
          </td>
          <td v-else-if="sections[sec-1].state === 1" 
            :rowspan="combine ? sections[sec-1].span : 1" 
            class="section" 
            @click="clickCell($event, sec-1, day)"
            >
            {{ `${sections[course_table_pre[day][sec-1]].teacher} 
            ${sections[course_table_pre[day][sec-1]].course_name} 
            ${sections[course_table_pre[day][sec-1]].room}` }}
          </td>
          <template v-else>
            <td v-if="!combine"
              class="section" 
              @click="clickCell($event, sec-1, day)"
              >
              {{ `${sections[course_table_pre[day][sec-1]].teacher} 
              ${sections[course_table_pre[day][sec-1]].course_name} 
              ${sections[course_table_pre[day][sec-1]].room}` }}
            </td>
          </template>
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
    combine: {
      type: Boolean,
      default: false,
      required: false
    },
    course_table: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup(props) {
    const generatePre = () => {
      const res = new Array(7).fill(0).map(() => new Array(14).fill(0))
      for(let day = 0; day < 7; ++day) {
        let tmp
        for(let sec = 0; sec < 14; ++sec) {
          if(props.course_table[day][sec].state === 1) {
            tmp = sec
            res[day][sec] = sec
          }
          else if(props.course_table[day][sec].state === 0) {
            res[day][sec] = sec
          }
          else {
            res[day][sec] = tmp
          }
        }
      }
      return res
    }

    const course_table_pre = generatePre()
    console.log(course_table_pre)

    // table cell 点击事件 sec in [0, 14), day in [0, 7)
    const clickCell = (event, sec, day) => {
      // for(let item in time_slot) {

      // }
      console.log(time_slot[sec].ref.value[0].offsetTop)
      console.log(event.x)
      console.log(sec, day)
    }

    return {
      time_slot,
      course_table_pre,
      clickCell
    }
  },
})
</script>

<style scoped>
  table {
    border: 2px solid rgba(64, 104, 224, 0.8);
  }

  th, td {
    min-width: 100px;
    max-width: 150px;
    background-color: white;
    border: 1px solid rgba(64, 104, 224, 0.7);
    text-align: center;
    /* word-break: break-all; */
    word-wrap: break-word;
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
