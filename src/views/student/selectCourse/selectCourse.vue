<template>
  <div class="main">
    <div class="course-table">
      <course-table :mode="'select course'" 
        :course_table="course_table" 
        @refresh="refresh"
      >
      </course-table>
    </div>
    <div class="course-list">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全校开课">
          <div class="search">
            <search-form :items="search_form" @conditions="getConditions"></search-form>
          </div>
          <a-table 
            :columns="columns" 
            :data-source="courses" 
            size="small" :pagination="false" bordered>
            <template #bodyCell="{ column, record, text }">
              <template v-if="column.dataIndex === 'courseType'">
                {{ getCourseTypeByNumber(text) }}
              </template>
              <template v-else-if="column.dataIndex === 'syllabus'">
                <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="已选课程">
          <a-table 
            :columns="chose_columns" 
            :data-source="chose_courses" 
            :pagination="chose_pagination"
            :loading="chose_loading"
            @change="chose_handleTableChange"
            size="small" bordered>
            <template #bodyCell="{ column, record, text, index }">
              <template v-if="column.dataIndex === 'key'">
                {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
              </template>
              <template v-else-if="column.dataIndex === 'courseType'">
                {{ getCourseTypeByNumber(text) }}
              </template>
              <template v-else-if="column.dataIndex === 'syllabus'">
                <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button type="link" size="small" @click="quit(record.sectionId)">退课</a-button>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import CourseTable from '@/components/courseTable/courseTable.vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { queryCourse, quitSection } from '@/api/course-controller'
import { listChoose } from '@/api/takes-controller'
import { downloadFile } from '@/api/file-controller'
import { 
  year_semester,
  year_select, 
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber,
  section_select,
  course_type_select, getCourseTypeByNumber,
} from '@/utils/constant'

const columns = [
  {
    title: '课程序号',
    dataIndex: 'courseId',
    key: 'courseId',
    width: 100
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
    title: '开课院系',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'realName',
    key: 'realName',
    width: 80
  },
  {
    title: '年级',
    dataIndex: 'openFor',
    key: 'openFor',
    width: 65
  },
  {
    title: '排课安排(周几 节次[周次] 教室)',
    dataIndex: 'arrangement',
    key: 'arrangement',
    width: 200
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 80
  },
  {
    title: '校区',
    dataIndex: 'campusLocationName',
    key: 'campusLocationName',
    width: 80
  },
  {
    title: '大纲',
    dataIndex: 'syllabus',
    key: 'syllabus',
    width: 30
  }
]

const chose_columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 30
  },
  {
    title: '课程序号',
    dataIndex: 'courseId',
    key: 'courseId',
    width: 100
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
    title: '开课院系',
    dataIndex: 'departmentName',
    key: 'departmentName',
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
    title: '大纲',
    dataIndex: 'syllabus',
    key: 'syllabus',
    width: 30
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 30
  }
]

export default defineComponent({
  name: "SelectCourseView",
  components: {
    CourseTable,
    SearchForm
  },
  setup() {
    const store = useStore()

    const search_form = ref([
      {
        title: "学年",
        key: 'year',
        type: "select",
        options: year_select,
        rules: {
          required: false
        }
      },
      {
        title: "学期",
        key: 'semester',
        type: "select",
        options: semester_select,
        rules: {
          required: false
        }
      },
      {
        title: "课程序号",
        key: 'courseId',
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "课程名称",
        key: 'name',
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "课程类别",
        key: 'type',
        type: "select",
        options: course_type_select,
        rules: {
          required: false
        }
      },
      {
        title: "开课院系",
        key: 'departmentName',
        type: "select",
        options: store.state.constant.departments_name_select,
        rules: {
          required: false
        }
      },
      {
        title: "教师",
        key: 'realName',
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "年级",
        key: 'openFor',
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "起止周",
        key: ['startWeek', 'endWeek'],
        type: "range input",
        rules: {
          required: false
        }
      },
      {
        title: "星期",
        key: 'day',
        type: "select",
        options: day_select,
        rules: {
          required: false
        }
      },
      {
        title: "小节",
        key: 'time',
        type: "select",
        options: section_select,
        rules: {
          required: false
        }
      },
      {
        title: "校区",
        key: 'campusLocationName',
        type: "select",
        options: store.state.constant.campus_locations_name_select,
        rules: {
          required: false
        }
      }
    ])

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

    // SearchForm 筛选条件
    let filters_buffer = {}
    const handleTableChange = (pag) => {
      if(pag) {
        run({
          size: pag.pageSize,
          current: pag.current,
          ...defaultParams,
          ...filters_buffer,
        })
      }
    }

    const search = (formState) => {
      run({
        size: pageSize.value,
        ...defaultParams,
        ...formState
      })
    }

    const getConditions = (formState) => {
      filters_buffer = formState
      search(formState)
    }

    // ----------- 已选课程 -------------
    const course_table = ref([])
    const initCourseTable = () => {
      course_table.value = []
      for(let day = 1; day <= 7; ++day) {
        let tmp = []
        for(let section = 1; section <= 14; ++section) {
          tmp.push({ state: 0, span: 1 })
        }
        course_table.value.push(tmp)
      }
    }
    initCourseTable()

    const chose_defaultParams = {
      year: year_semester.semester === 1 ? year_semester.year : year_semester.year + 1,
      semester: year_semester.semester % 2 + 1,
      studentId: store.state.user.id,
      departmentName: store.state.user.departmentName,
    }

    // 总页数
    const chose_total = ref(0)
    const {
      data: chose_courses,
      run: chose_run,
      loading: chose_loading,
      current: chose_current,
      pageSize: chose_pageSize,
    } = usePagination(listChoose, {
      defaultParams: [chose_defaultParams],
      formatResult: res => {
        chose_total.value = res.total
        initCourseTable()
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

          course_table.value[item.day - 1][item.startTime - 1] = { 
            state: 1, 
            teacher: item.realName, 
            course_name: item.courseName, 
            start_week: item.startWeek,
            end_week: item.endWeek,
            room: item.roomNumber, 
            span: item.endTime - item.startTime + 1
          }
          for(let i = 1; i < course_table.value[item.day - 1][item.startTime - 1].span; ++i) {
            course_table.value[item.day - 1][item.startTime - 1 + i] = {}
          }
        })
        return res.data
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const chose_pagination = computed(() => ({
      total: chose_total.value,
      current: chose_current.value,
      pageSize: chose_pageSize.value,
      showSizeChanger: true
    }))

    const chose_handleTableChange = (pag) => {
      if(pag) {
        chose_run({
          size: pag.pageSize,
          current: pag.current
        })
      }
    }

    const quit = (sectionId) => {
      quitSection(sectionId, {
        studentId: store.state.user.id
      }).then(() => {
        refresh()
      })
      // TODO message
    }

    const refresh = () => {
      chose_run({
        size: chose_pageSize.value,
        ...chose_defaultParams,
      })
    }

    return {
      course_table,

      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      getConditions,

      chose_columns,
      chose_courses,
      chose_pagination,
      chose_loading,
      chose_handleTableChange,

      quit, refresh,
      downloadFile,

      getCourseTypeByNumber
    }
  },
})
</script>

<style scoped>
  .main {
    padding: 35px 50px 0 50px;
  }

  .search {
    padding: 0 0 10px 0;
  }

  .course-list {
    padding: 30px 0 0 0;
  }

  .search {
    padding: 0 0 10px 0;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
