<template>
  <div class="main">
    <div class="opened-course">
      <h1>已开设课程</h1>
      <div class="search">
        <search-form :items="opened_search_form" @conditions="opened_getConditions"></search-form>
      </div>
      <a-table 
        :columns="opened_columns" 
        :data-source="opened_courses"
        :pagination="opened_pagination"
        :loading="opened_loading"
        @change="opened_handleTableChange"
        size="small" bordered>
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.dataIndex === 'type'">
            {{ getCourseTypeByNumber(text) }}
          </template>
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <div class="course-pool">
      <h1>开设课程</h1>
      <div class="search">
        <search-form :items="pool_search_form" @conditions="pool_getConditions"></search-form>
      </div>
      <a-table 
        :columns="pool_columns" 
        :data-source="pool_courses" 
        :pagination="pool_pagination"
        :loading="pool_loading"
        @change="pool_handleTableChange"
        size="small" bordered>
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.dataIndex === 'type'">
            {{ getCourseTypeByNumber(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="openCourse(record.id)">开课</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <cu-modal
    ref="add_modal_ref"
    :title="'开设课程'"
    :modal="add_modal"
    @ok="add_okHandler"
  >
  </cu-modal>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import CuModal from '@/components/cuModal/cuModal.vue'
import { queryCourse, viewCoursePool, startCourse } from '@/api/course-controller'
import { downloadFile } from '@/api/file-controller'
import { 
  year_select, open_year_select, open_for_select,
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber,
  section_select,
  course_type_select, getCourseTypeByNumber,
} from '@/utils/constant'

const opened_columns = [
  {
    title: '学年学期',
    dataIndex: 'semester',
    key: 'semester',
    width: 100
  },
  {
    title: '课程序号',
    dataIndex: 'index',
    key: 'index',
    width: 100
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
    title: '开课院系',
    dataIndex: 'department',
    key: 'department',
    width: 100
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
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
    dataIndex: 'actual_num',
    key: 'actual_num',
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
    dataIndex: 'campus',
    key: 'campus',
    width: 80
  },
  {
    title: '大纲',
    dataIndex: 'syllabus',
    key: 'syllabus',
    width: 60
  }
]

const pool_columns = [
  {
    title: '课程序号',
    dataIndex: 'id',
    key: 'id',
    width: 100
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
  name: "OpenCourseView",
  components: {
    SearchForm,
    CuModal
  },
  setup() {
    const store = useStore()

    const opened_search_form = ref([
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

    const opened_defaultParams = {
      realName: store.state.user.realName,
      departmentName: store.state.user.departmentName
    }

    // 总页数
    const opened_total = ref(0)
    const {
      data: opened_courses,
      run: opened_run,
      loading: opened_loading,
      current: opened_current,
      pageSize: opened_pageSize,
    } = usePagination(queryCourse, {
      defaultParams: [opened_defaultParams],
      formatResult: res => {
        opened_total.value = res.total
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
    
    const opened_pagination = computed(() => ({
      total: opened_total.value,
      current: opened_current.value,
      pageSize: opened_pageSize.value,
      showSizeChanger: true
    }))

    // SearchForm 筛选条件
    let opened_filters_buffer = {}
    const opened_handleTableChange = (pag) => {
      if(pag) {
        opened_run({
          size: pag.pageSize,
          current: pag.current,
          ...opened_defaultParams,
          ...opened_filters_buffer,
        })
      }
    }

    const opened_search = (formState) => {
      opened_run({
        size: opened_pageSize.value,
        ...opened_defaultParams,
        ...formState
      })
    }

    const opened_getConditions = (formState) => {
      opened_filters_buffer = formState
      opened_search(formState)
    }

    // 课程池
    const pool_search_form = [
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
        rules: {
          required: false
        }
      }
    ]

    const pool_defaultParams = {
      departmentId: store.state.user.departmentId,
    }

    // 总页数
    const pool_total = ref(0)
    const {
      data: pool_courses,
      run: pool_run,
      loading: pool_loading,
      current: pool_current,
      pageSize: pool_pageSize,
    } = usePagination(viewCoursePool, {
      defaultParams: [pool_defaultParams],
      formatResult: res => {
        pool_total.value = res.total
        return res.data
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const pool_pagination = computed(() => ({
      total: pool_total.value,
      current: pool_current.value,
      pageSize: pool_pageSize.value,
      showSizeChanger: true
    }))

    // SearchForm 筛选条件
    let pool_filters_buffer = {}
    const pool_handleTableChange = (pag) => {
      if(pag) {
        pool_run({
          size: pag.pageSize,
          current: pag.current,
          ...pool_defaultParams,
          ...pool_filters_buffer,
        })
      }
    }

    const pool_search = (formState) => {
      pool_run({
        size: pool_pageSize.value,
        ...pool_defaultParams,
        ...formState
      })
    }

    const pool_getConditions = (formState) => {
      pool_filters_buffer = formState
      pool_search(formState)
    }

    // Modal openCourse
    const add_modal_ref = ref()
    const add_modal = [
      {
        title: '学年',
        key: 'year',
        type: 'select',
        options: open_year_select,
        rules: {
          required: true
        }
      },
      {
        title: '学期',
        key: 'semester',
        type: 'select',
        options: semester_select,
        rules: {
          required: true
        }
      },
      {
        title: '面向年级',
        key: 'openFor',
        type: 'select',
        options: open_for_select,
        rules: {
          required: true
        }
      },
      {
        title: '人数限制',
        key: 'studentLimit',
        type: 'input number',
        min: 10,
        max: 120,
        rules: {
          required: true
        }
      },
      {
        title: '期末占比',
        key: 'finalScoreRatio',
        type: 'slider',
        min: 40,
        max: 70,
        step: 10,
        rules: {
          required: true
        }
      }
    ]

    const courseId = ref()
    const openCourse = id => {
      courseId.value = id
      add_modal_ref.value.show()
    }

    const add_okHandler = formData => {
      startCourse({
        courseId: courseId.value,
        instructorId: store.state.user.id,
        ...formData, 
      }).then(() => {
        pool_run({
          size: pool_pageSize.value,
          ...pool_defaultParams,
          ...pool_filters_buffer
        })
        opened_run({
          size: opened_pageSize.value,
          ...opened_defaultParams,
          ...opened_filters_buffer
      })
        add_modal_ref.value.hide()
      })
    }

    return {
      opened_search_form,
      opened_columns,
      opened_courses,
      opened_pagination,
      opened_loading,
      opened_handleTableChange,
      opened_getConditions,

      pool_search_form,
      pool_columns,
      pool_courses,
      pool_pagination,
      pool_loading,
      pool_handleTableChange,
      pool_getConditions,

      add_modal_ref,
      add_modal,
      openCourse,
      add_okHandler,

      getCourseTypeByNumber,
      downloadFile
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

  .course-pool {
    padding: 10px 0 0 0;
  }
</style>