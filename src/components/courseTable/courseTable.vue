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
          <template v-if="mode === 'course table'">
            <td v-if="sections[sec-1].state === 0" 
              :rowspan="combine ? sections[sec-1].span : 1"
              class="section" 
              >
            </td>
            <td v-else-if="sections[sec-1].state === 1 || (sections[sec-1].state === undefined && !combine)"
              :rowspan="combine ? sections[sec-1].span : 1" 
              class="section" 
              >
              {{ `${sections[course_table_pre[day][sec-1]].teacher} 
              ${sections[course_table_pre[day][sec-1]].course_name} 
              ${sections[course_table_pre[day][sec-1]].room}` }}
            </td>
          </template>
          <a-popover v-else-if="mode === 'select course'" trigger="click" placement="rightTop">
            <template #content>
              <a-table :columns="availableCourseColumn" 
                :data-source="getAvailableCourses()" size="small" bordered>
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'action'">
                    <a-button type="link" size="small" @click="select(record.key)">选课</a-button>
                  </template>
                </template>
              </a-table>
            </template>
            <td v-if="sections[sec-1].state === 0" 
              :rowspan="combine ? sections[sec-1].span : 1"
              class="section" 
              >
            </td>
            <td v-else-if="sections[sec-1].state === 1 || (sections[sec-1].state === undefined && !combine)"
              :rowspan="combine ? sections[sec-1].span : 1" 
              class="section" 
              >
              {{ `${sections[course_table_pre[day][sec-1]].teacher} 
              ${sections[course_table_pre[day][sec-1]].course_name} 
              ${sections[course_table_pre[day][sec-1]].room}` }}
            </td>
          </a-popover>
        </template>
      </tr>
  </table>
</template>

<script>
import { defineComponent, ref } from 'vue'

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
    },
    mode: {
      type: String,
      default: "course table",
      required: false
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

    const course_table_pre = ref(generatePre())

    const availableCourseColumn = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 50
      },
      {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
        width: 120
      },
      {
        title: '课程类型',
        dataIndex: 'type',
        key: 'type',
        width: 100
      },
      {
        title: '教师',
        dataIndex: 'teacher',
        key: 'teacher',
        width: 80
      },
      {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
        width: 80
      },
      {
        title: '人数',
        dataIndex: 'ratio',
        key: 'ratio',
        width: 80
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 30
      }
    ]

    // 选课
    const select = (key) => {
      console.log(key)
    }

    const getAvailableCourses = (day, sec) => {
      console.log(day, sec)
      return [...Array(100)].map((_, i) => ({
        key: i,
        name: `计算机网络${i}`,
        type: '专业必修',
        teacher: '张三',
        actual_num: '20',
        credit: '3.0',
        'ratio': '20/30',
        campus: '中山北路校区',
        }
      ))
    }

    return {
      time_slot,
      course_table_pre,

      availableCourseColumn,
      getAvailableCourses,
      select
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
    min-height: 50px;
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
    background-color: rgba(224, 255, 255, 0.5);
  }

  .section {
    padding: 0 5px 0 5px;
  }

  .section:hover {
    background-color: rgba(144, 238, 144, 0.3);
    transition: background-color 0.5s;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
