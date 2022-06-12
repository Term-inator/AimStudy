<template>
  <div class="main">
    <div v-if="!show_score_info">
      <h1>课程成绩</h1>
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="scoreInfo(record)">查看</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <course-score v-else :course="course_chosen"></course-score>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { Icon } from "@/components/icon"
import { viewVerifyScoreSection } from '@/api/score-controller'
import {
  year_select,
  semester_select
} from '@/utils/constant'

// TODO 尚未有数据
const show_score_info = ref(false)

const CourseScore = {
  name: 'CourseScore',
  components: {
    Icon
  },
  props: {
    course: {
      type: Object,
      default: () => ({}),
    },
  },
  // TODO sort
  template: `
    <a-row type="flex" align="top">
      <a-col span="1">
        <a-button type="link" @click="back()">
          <template #icon>
            <Icon :icon="'LeftOutlined'"></Icon>
          </template>
        </a-button>
      </a-col>
      <a-col span="10" style="padding: 4px 0 0 0;">
        <h1 style="font-size: 16px; font-weight: 500;"> {{ course.name }} 成绩</h1>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="scores" size="small" :pagination="false" bordered></a-table>
    <a-row justify="end" style="margin: 15px 0 0 0;">
      <a-col offset="20" span="2">
        <a-button type="primary">通过</a-button>
      </a-col>
      <a-col span="2">
        <a-button>退回</a-button>
      </a-col>
    </a-row>
  `,
  setup() {
    const back = () => {
      show_score_info.value = false
    }

    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 30,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 60,
      },
      {
        title: '学号',
        dataIndex: 'index',
        key: 'index',
        width: 100
      },
      {
        title: '平时成绩',
        dataIndex: 'usual',
        key: 'usual',
        width: 60
      },
      {
        title: '期末成绩',
        dataIndex: 'final',
        key: 'final',
        width: 60
      }
    ]
    const scores = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        name: `李${i}`,
        index: 'xxxxxxxxxxx',
        usual: '90',
        final: '90'
        }
      )))

    
    return {
      back,

      columns,
      scores
    }
  }
}

const search_form = [
  {
    title: "学年",
    key: "year",
    type: "select",
    options: year_select,
    rules: {
      required: false
    }
  },
  {
    title: "学期",
    key: "semester",
    type: "select",
    options: semester_select,
    rules: {
      required: false
    }
  },
  {
    title: "课程序号",
    key: "courseId",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程名称",
    key: "courseName",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程类别",
    key: "courseType",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "教师",
    key: "realName",
    type: "input",
    rules: {
      required: false
    }
  }
]

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
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 80,
  }
]

export default defineComponent({
  name: "ScoreManagementView",
  components: {
    SearchForm,
    "course-score": CourseScore
  },
  setup() {
    const store = useStore()
    const defaultParams = {
      role: 4,
      departmentId: store.state.user.departmentId
    }

    // 总页数
    const total = ref(0)
    const {
      data: courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(viewVerifyScoreSection, {
      defaultParams: [defaultParams],
      formatResult: res => {
        total.value = res.total
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
          total: pag.total,
          ...defaultParams,
          ...filters_buffer,
        })
      }
    }

    const search = (formState) => {
      run({
        size: pageSize.value,
        total: total.value,
        ...defaultParams,
        ...formState
      })
    }

    const getConditions = (formState) => {
      filters_buffer = formState
      search(formState)
    }

    const course_chosen = ref(null)
    const scoreInfo = (record) => {
      show_score_info.value = true
      course_chosen.value = record
    }

    return {
      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      getConditions,

      show_score_info,
      scoreInfo,
      course_chosen
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
