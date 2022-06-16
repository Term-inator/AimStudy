<template>
  <div class="main">
    <div>
      <h1>开设课程审核</h1>
      <div v-if="search_form" class="search">
        <search-form :items="search_form" @conditions="getConditions"></search-form>
      </div>
      <a-table 
        :columns="columns" 
        :data-source="courses" 
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
            <span>
              <a-button type="link" size="small" @click="pass(record.sectionId)">通过</a-button>
            </span>

            <span>
              <a-popconfirm title="确认退回?" okText="确认" cancelText="取消" @confirm="fail(record.sectionId)">
                <a-button type="link" size="small">退回</a-button>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <div class="passed-course">
      <h1>过审课程</h1>
      <div class="search">
        <search-form :items="passed_search_form" @conditions="passed_getConditions"></search-form>
      </div>
      <a-table 
        :columns="passed_columns" 
        :data-source="passed_courses" 
        :scroll="{ x: 1000 }" 
        :pagination="passed_pagination"
        :loading="passed_loading"
        @change="passed_handleTableChange"
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
            <span>
              <a-button type="link" size="small" @click="passed_edit(record.sectionId)">修改</a-button>
            </span>

            <span>
              <a-popconfirm title="确认删除?" okText="确认" cancelText="取消" @confirm="passed_cancel(record.sectionId)">
                <a-button type="link" size="small">删除</a-button>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
      <!--通过-->
      <cu-modal
        ref="pass_modal_ref"
        :title="'通过'"
        :modal="pass_modal"
        @ok="pass_okHandler"
      >
      </cu-modal>
      <!--修改-->
      <cu-modal
        ref="edit_modal"
        :title="'修改课程'"
        :modal="passed_edit_modal"
        @ok="passed_edit_okHandler"
      >
      </cu-modal>
    </div>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash-es'
import SearchForm from '@/components/searchForm/searchForm.vue'
import CuModal from '@/components/cuModal/cuModal.vue'
import { 
  viewStartCourse, verifyStartCourse, 
  queryCourse,
  modifyPublishSection, deletePublishSection,
} from '@/api/course-controller'
import { downloadFile } from '@/api/file-controller'
import {
  year_select, open_year_select,
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber, getNumberByDay,
  section_select,
  course_type_select, getCourseTypeByNumber,
  building_classroom_select,
  PASS, FAIL
} from '@/utils/constant'

// TODO 批量通过和退回
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
    width: 100
  },
  {
    title: '课程类型',
    dataIndex: 'courseType',
    key: 'courseType',
    width: 100
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 100
  },
  {
    title: '大纲',
    dataIndex: 'syllabus',
    key: 'syllabus',
    width: 100
  },
  {
    title: '学年学期',
    dataIndex: 'year_semester',
    key: 'year_semester',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'realName',
    key: 'realName',
    width: 100
  },
  {
    title: '年级',
    dataIndex: 'openFor',
    key: 'openFor',
    width: 100
  },
  {
    title: '人数',
    dataIndex: 'studentLimit',
    key: 'studentLimit',
    width: 100
  },
  {
    title: '期末占比',
    dataIndex: 'finalScoreRatio',
    key: 'finalScoreRatio',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
]

const passed_columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 40
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
    width: 100
  },
  {
    title: '课程类型',
    dataIndex: 'courseType',
    key: 'courseType',
    width: 80
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 50
  },
  {
    title: '大纲',
    dataIndex: 'syllabus',
    key: 'syllabus',
    width: 60
  },
  {
    title: '学年学期',
    dataIndex: 'year_semester',
    key: 'year_semester',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'realName',
    key: 'realName',
    width: 50
  },
  {
    title: '年级',
    dataIndex: 'openFor',
    key: 'openFor',
    width: 50
  },
  {
    title: '人数',
    dataIndex: 'studentLimit',
    key: 'studentLimit',
    width: 50
  },
  {
    title: '期末占比',
    dataIndex: 'finalScoreRatio',
    key: 'finalScoreRatio',
    width: 50
  },
  {
    title: '排课安排(周几 节次[周次] 教室)',
    dataIndex: 'arrangement',
    key: 'arrangement',
    width: 200
  },
  {
    title: '校区',
    dataIndex: 'campusLocationName',
    key: 'campusLocationName',
    width: 50
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right'
  }
]

export default defineComponent({
  name: "OpenCourseManagementView",
  components: {
    SearchForm,
    CuModal
  },
  setup() {
    const store = useStore()
    // 未通过课程的列表
    const search_form = [
      {
        title: '学年',
        key: 'year',
        type: 'select',
        options: year_select,
        rules: {
          required: false
        }
      },
      {
        title: '学期',
        key: 'semester',
        type: 'select',
        options: semester_select,
        rules: {
          required: false
        }
      },
      {
        title: '课程序号',
        key: 'courseId',
        type: 'input',
        rules: {
          required: false
        }
      },
      {
        title: '课程名称',
        key: 'name',
        type: 'input',
        rules: {
          required: false
        }
      },
      {
        title: '课程类型',
        key: 'type',
        type: 'select',
        options: course_type_select,
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
    ]

    const defaultParams = {
      departmentId: store.state.user.departmentId,
    }

    // 总页数
    const total = ref(0)
    const {
      data: courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(viewStartCourse, {
      defaultParams: [defaultParams],
      formatResult: res => {
        total.value = res.total
        res.data.map(item => {
          item.year_semester = `
            ${item.year}学年
            ${getSemesterByNumber(item.semester)}
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
      console.log(formState)
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

    // ----------通过课程的 modal----------
    const pass_modal_ref = ref()
    const pass_modal = [
      {
        title: '起止周',
        key: ['startWeek', 'endWeek'],
        type: 'range input',
        rules: {
          required: true
        }
      },
      {
        title: '星期',
        key: 'day',
        type: 'select',
        options: day_select,
        rules: {
          required: true
        }
      },
      {
        title: '小节',
        key: ['startTime', 'endTime'],
        type: 'range input',
        rules: {
          required: true
        }
      },
      {
        title: '校区',
        key: 'campusLocationId',
        type: 'select',
        options: store.state.constant.campus_locations_select,
        rules: {
          required: true
        }
      },
      {
        title: '教室',
        key: 'roomNumber',
        type: 'search select',
        options: building_classroom_select,
        rules: {
          required: true
        }
      }
    ]

    let pass_form = reactive({})
    const pass = key => {
      console.log(key)
      pass_form = cloneDeep(courses.value.filter(item => item.sectionId === key)[0])  
      pass_modal_ref.value.assignValue(pass_form)
      pass_modal_ref.value.show()
    }

    // TODO instructorId
    const pass_okHandler = formData => {
      pass_form = Object.assign(pass_form, formData)
      console.log(pass_form)
      verifyStartCourse({
        // ...formData,
        sectionStatus: PASS,
        teachesStatus: PASS
      }).then(() => {
        run({
          size: pageSize.value,
          current: current.value,
          ...defaultParams,
          ...filters_buffer
          })
      }).finally(() => {
        pass_modal_ref.value.hide()
      })
    }

    const fail = (key) => {
      verifyStartCourse({
        courseId: key,
        courseStatus: FAIL
      }).then(() => {
        run({
          size: pageSize.value,
          ...defaultParams,
          ...filters_buffer
        })
      })
    }

    // ----------已通过课程的列表----------
    const passed_search_form = [
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
        title: "课程类型",
        key: 'type',
        type: "select",
        options: course_type_select,
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
        key: 'openForm',
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "起止周",
        key: ['start_week', 'end_week'],
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
    ]

    const passed_defaultParams = {
      departmentName: store.state.user.departmentName,
    }

    // 总页数
    const passed_total = ref(0)
    const {
      data: passed_courses,
      run: passed_run,
      loading: passed_loading,
      current: passed_current,
      pageSize: passed_pageSize,
    } = usePagination(queryCourse, {
      defaultParams: [passed_defaultParams],
      formatResult: res => {
        passed_total.value = res.total
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
    
    const passed_pagination = computed(() => ({
      total: passed_total.value,
      current: passed_current.value,
      pageSize: passed_pageSize.value,
      showSizeChanger: true
    }))

    // SearchForm 筛选条件
    let passed_filters_buffer = {}
    const passed_handleTableChange = (pag) => {
      if(pag) {
        passed_run({
          size: pag.pageSize,
          current: pag.current,
          ...passed_defaultParams,
          ...passed_filters_buffer,
        })
      }
    }

    const passed_search = (formState) => {
      passed_run({
        size: passed_pageSize.value,
        ...passed_defaultParams,
        ...formState
      })
    }

    const passed_getConditions = (formState) => {
      passed_filters_buffer = formState
      passed_search(formState)
    }

    const passed_state = reactive({
      selectedRowKeys: []
    })

    const passed_remove = () => {
      new Promise(resolve => {
        passed_state.selectedRowKeys.forEach(key => {
          deletePublishSection(key)
        })
        resolve()
      }).then(() => {
        passed_run({
          size: passed_pageSize.value,
          current: passed_current.value,
          ...passed_filters_buffer
        })
      })
    }

    // edit modal
    const passed_edit_modal = [
      {
        title: '面向年级',
        key: 'openFor',
        type: 'input',
        rules: {
          required: false
        }
      },
      {
        title: '人数上限',
        key: 'studentLimit',
        type: 'input',
        rules: {
          required: false
        }
      },
      {
        title: '期末占比',
        key: 'finalScoreRatio',
        type: 'slider',
        min: 0.4,
        max: 0.7,
        step: 0.1,
        rules: {
          required: false
        }
      },
      {
        title: '学年',
        key: 'year',
        type: 'select',
        options: open_year_select,
        rules: {
          required: false
        }
      },
      {
        title: '学期',
        key: 'semester',
        type: 'select',
        options: semester_select,
        rules: {
          required: false
        }
      },
      {
        title: '起止周',
        key: ['startWeek', 'endWeek'],
        type: 'range input',
        rules: {
          required: true
        }
      },
      {
        title: '星期',
        key: 'day',
        type: 'select',
        options: day_select,
        rules: {
          required: true
        }
      },
      {
        title: '小节',
        key: ['startTime', 'endTime'],
        type: 'range input',
        rules: {
          required: true
        }
      },
      {
        title: '校区',
        key: 'campusLocationName',
        type: 'select',
        options: store.state.constant.campus_locations_select,
        rules: {
          required: true
        }
      },
      {
        title: '教室',
        key: 'roomNumber',
        type: 'search select',
        options: building_classroom_select,
        rules: {
          required: true
        }
      }
    ]

    const edit_modal = ref()
    let edit_form = reactive({})
    const passed_edit = key => {
      console.log(key)
      edit_form = cloneDeep(passed_courses.value.filter(item => item.sectionId === key)[0])  
      console.log(edit_form)
      if(Object.hasOwnProperty.call(edit_form, 'day')) {
        edit_form['day'] = getDayByNumber(edit_form['day'])
      }
      edit_modal.value.assignValue(edit_form)
      edit_modal.value.show()
    }

    const passed_edit_okHandler = formData => {
      console.log(formData)
      edit_form = Object.assign(edit_form, formData)
      if(typeof edit_form['day'] === 'string') {
        edit_form['day'] = getNumberByDay(edit_form['day'])
      }
      if(typeof edit_form['campusLocationName'] === 'string') {
        edit_form['campusLocationId'] = store.getters.getCampusLocationIdByName(edit_form['campusLocationName'])
      }
      else {
        edit_form['campusLocationId'] = edit_form['campusLocationName']
      }
      console.log(edit_form)
      modifyPublishSection(edit_form).then(() => {
        passed_run({
          size: passed_pageSize.value,
          current: passed_current.value,
          ...passed_filters_buffer
        })
      }).finally(() => {
        edit_modal.value.hide()
      })
    }

    return {
      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      getConditions,
      pass_modal_ref,
      pass_modal,
      pass_form,
      pass,
      pass_okHandler,
      fail,

      passed_search_form,
      passed_columns,
      passed_courses,
      passed_pagination,
      passed_loading,
      passed_handleTableChange,

      passed_getConditions,

      passed_edit_modal,
      edit_modal,
      passed_edit, 
      passed_edit_okHandler,

      passed_remove,

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
    z-index: 1;
  }

  .search {
    margin: 0 0 4px 0;
  }

  .passed-course {
    width: 100%;
    margin: 15px 0 0 0;
    overflow: hidden;
  }
</style>
