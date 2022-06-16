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
              [${sections[course_table_pre[day][sec-1]].start_week}-${sections[course_table_pre[day][sec-1]].end_week}]
              ${sections[course_table_pre[day][sec-1]].room}` }}
            </td>
          </template>
          <a-popover v-else-if="mode === 'select course'" 
            v-model:visible="visible[day][sec-1]"
            trigger="click" 
            placement="rightTop"
            >
            <template #content>
              <a-table 
                :columns="availableCourseColumn" 
                :data-source="courses"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
                size="small" bordered>
                <template #bodyCell="{ column, record, index }">
                  <template v-if="column.dataIndex === 'key'">
                    {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
                  </template>
                  <template v-else-if="column.dataIndex === 'action'">
                    <a-button type="link" size="small" @click="select(record)">选课</a-button>
                  </template>
                </template>
              </a-table>
            </template>
            <td v-if="sections[sec-1].state === 0" 
              :rowspan="combine ? sections[sec-1].span : 1"
              class="section" 
              @click="getAvailableCourses(day, sec-1)"
              >
            </td>
            <td v-else-if="sections[sec-1].state === 1 || (sections[sec-1].state === undefined && !combine)"
              :rowspan="combine ? sections[sec-1].span : 1" 
              class="section" 
              @click="hidePopover(day, sec-1)"
              >
              {{ `${sections[course_table_pre[day][sec-1]].teacher} 
              ${sections[course_table_pre[day][sec-1]].course_name} 
              ${sections[course_table_pre[day][sec-1]].room}` }}
            </td>
          </a-popover>
        </template>
      </tr>
  </table>
  <!--设置意愿值-->
  <cu-modal
    ref="bean_modal_ref"
    :title="'设置意愿值'"
    :modal="bean_modal"
    @ok="bean_okHandler"
  >
  </cu-modal>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import CuModal from '@/components/cuModal/cuModal.vue'
import { queryCourse, chooseSection } from '@/api/course-controller'
import { getBean } from '@/api/bean-controller'
import { 
  year_semester,
  getSemesterByNumber,
  getDayByNumber
} from '@/utils/constant'

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
  components: {
    CuModal
  },
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
  setup(props, { emit }) {
    const store = useStore()

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
    
    watch(() => props.course_table, () => {
      course_table_pre.value = generatePre()
    })

    const availableCourseColumn = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 50
      },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'courseName',
        width: 120
      },
      {
        title: '课程类型',
        dataIndex: 'courseType',
        key: 'courseType',
        width: 100
      },
      {
        title: '教师',
        dataIndex: 'realName',
        key: 'realName',
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

    const defaultParams = {
      year: year_semester.year, // year_semester.semester === 1 ? year_semester.year : year_semester.year + 1,
      semester: year_semester.semester // year_semester.semester % 2 + 1
    }

    // 总页数
    const total = ref(0)
    const {
      data: courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryCourse, {
      defaultParams: [defaultParams],
      formatResult: res => {
        total.value = res.total
        res.data.map(item => {
          item.year_semester = `
            ${item.year}学年
            ${getSemesterByNumber(item.semester)}
          `
          item.arrangement = `
            ${getDayByNumber(item.day)} ${item.startTime}-${item.endTime}
            [${item.startWeek}-${item.endWeek}]
            ${item.roomNumber}
          `

          item.ratio = `${item.currentStudentAmount}/${item.studentLimit}`
        })
        return res.data
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true
    }))

    const handleTableChange = (pag) => {
      if(pag) {
        run({
          size: pag.pageSize,
          current: pag.current,
          ...defaultParams
        })
      }
    }

    const day = ref(-1)
    const sec = ref(-1)
    const getAvailableCourses = (_day, _sec) => {
      console.log(0)
      day.value = _day
      sec.value = _sec
      run({
        size: pageSize.value,
        ...defaultParams,
        day: _day + 1,
        time: _sec + 1
        })
    }

    const hidePopover = (_day, _sec) => {
      day.value = _day
      sec.value = _sec
    }

    // ------ bean ------
    const bean_modal_ref = ref()
    const bean_modal = ref([
      {
        title: '意愿值',
        key: 'bean',
        type: 'input number',
        min: 0,
        max: (() => {
          getBean().then(res => {
            // TODO 检查意愿值是否正确
            console.log(res)
            return res
          })
        })(),
        rules: {
          required: true
        }
      }
    ])

    // 选课
    const visible = ref([]) // popover
    for(let i = 0; i < 7; ++i) {
      const tmp = []
      for(let j = 0; j < 14; ++ j) {
        tmp.push(ref(false))
      }
      visible.value.push(tmp)
    }
    let select_form = reactive({})
    const select = (record) => {
      console.log(day.value, sec.value,visible.value)
      visible.value[day.value][sec.value] = false
      select_form = reactive(record)
      bean_modal_ref.value.show()
    }

    const bean_okHandler = formData => {
      console.log(select_form, formData)
      chooseSection(select_form.sectionId, {
        studentId: store.state.user.id,
        departmentId: store.state.user.departmentId,
        courseId: select_form.courseId,
        semester: select_form.semester,
        year: select_form.year,
        ...formData
      }).then(() => {
        emit('refresh')
      }).finally(() => {
        bean_modal_ref.value.hide()
      })
    }

    return {
      time_slot,
      course_table_pre,

      availableCourseColumn,
      getAvailableCourses, hidePopover,
      courses,
      pagination,
      loading,
      handleTableChange,

      select,
      visible,
      bean_modal_ref,
      bean_modal,
      bean_okHandler
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
    max-width: 200px;
    width: 200px;
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
