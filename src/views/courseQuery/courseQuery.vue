<template>
  <div class="main">
    <h1>全校开课查询</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table 
      :columns="columns" 
      :data-source="courses"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      size="small" bordered>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.dataIndex === 'courseType'">
          {{ getCourseTypeByNumber(text) }}
        </template>
        <template v-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { queryCourse } from '@/api/course-controller'
import { year_select, 
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber,
  section_select,
  course_type_select, getCourseTypeByNumber,
} from '@/utils/constant'

const columns = [
  {
    title: '学年学期',
    dataIndex: 'year_semester',
    key: 'year_semester',
    width: 100
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
    title: '实际上课人数',
    dataIndex: 'currentStudentAmount',
    key: 'currentStudentAmount',
    width: 80
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

export default defineComponent({
  components: {
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
        key: 'courseName',
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
        title: "教师", // 教师可以为空，表示查询未指定教师的课程
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
        type: "select",
        key: 'time',
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

    // 总页数
    const total = ref(0)
    const {
      data: courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryCourse, {
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
          ...filters_buffer,
        })
      }
    }

    const search = (formState) => {
      console.log(formState)
      run({
        size: pageSize.value,
        ...formState
      })
    }

    const getConditions = (formState) => {

      filters_buffer = formState
      search(formState)
    }

    const download = (key) => {
      // TODO 下载大纲
      console.log(key)
    }

    return {
      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      getConditions,
      download,

      getCourseTypeByNumber,
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

  .search {
    padding: 0 0 10px 0;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
