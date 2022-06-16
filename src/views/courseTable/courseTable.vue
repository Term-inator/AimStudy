<template>
  <div class="main">
    <div class="search">
      <search-form :items="search_form" :col_num="3" @conditions="getConditions"></search-form>
    </div>
    <div class="course-table">
      <course-table :course_table="course_table" combine></course-table>
    </div>
    <div class="course-list">
      <a-table 
        :columns="columns" 
        :data-source="courses" 
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        size="small" bordered>
        <template #bodyCell="{ column, record, text, index }">
          <template v-if="column.dataIndex === 'key'">
            {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
          </template>
          <template v-else-if="column.dataIndex === 'courseType'">
            {{ getCourseTypeByNumber(text) }}
          </template>
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import CourseTable from '@/components/courseTable/courseTable.vue'
import { queryCourse } from '@/api/course-controller'
import { listChoose } from '@/api/takes-controller'
import { downloadFile } from '@/api/file-controller'
import { 
  year_semester,
  year_select, 
  semester_select, getSemesterByNumber,
  getDayByNumber,
  week_select,
  getCourseTypeByNumber
} from '@/utils/constant'

const search_form = [
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
    title: "教学周",
    key: 'week',
    type: "select",
    options: week_select,
    rules: {
      required: false
    }
  },
]

const columns = [
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
  }
]

export default defineComponent({
  name: "CourseTableView",
  components: {
    SearchForm,
    CourseTable
  },
  setup() {
    const store = useStore()

    const getCourses = 
      store.state.user.roles[0] === 'teacher' ? 
      queryCourse : listChoose

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

    const defaultParams = {
      ...year_semester,
      realName: store.state.user.realName,
      departmentName: store.state.user.departmentName,
    }

    // 总页数
    const total = ref(0)
    const {
      data: courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(getCourses, {
      defaultParams: [defaultParams],
      formatResult: res => {
        total.value = res.total
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
          if(Object.hasOwnProperty.call(filters_buffer, 'week') && typeof filters_buffer['week'] === 'number') {
            if(item.startWeek > filters_buffer['week'] || item.endWeek < filters_buffer['week']) {
              return item
            }
          }
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

    // const course_table = [
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
    //     {},
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span: 2 },
    //     {},
    //     { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ],
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ],
    //   [
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 14 },
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {},
    //     {}
    //   ],
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
    //     {},
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
    //     {},
    //     { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ],
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
    //     {},
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
    //     {},
    //     { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ],
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
    //     {},
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
    //     {},
    //     { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ],
    //   [
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
    //     {},
    //     { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
    //     {},
    //     { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
    //     {},
    //     {},
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 },
    //     { state: 0, span: 1 }
    //   ]
    // ]

    return {
      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      getConditions,

      course_table,

      downloadFile,
      getCourseTypeByNumber
    }
  },
})
</script>
// TODO 修改 padding 设置位置
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

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
