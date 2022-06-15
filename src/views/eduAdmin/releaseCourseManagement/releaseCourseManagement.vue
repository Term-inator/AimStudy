<template>
  <div class="main">
    <h1>发布课程审核</h1>
    <div v-if="search_form" class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table 
      :columns="columns" 
      :data-source="courses"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      size="small" bordered>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'key'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
        <template v-else-if="column.dataIndex === 'type'">
          {{ getCourseTypeByNumber(record.type) }}
        </template>
        <template v-else-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <span>
            <a-popconfirm title="确认通过?" okText="确认" cancelText="取消" @confirm="pass(record.id)">
              <a-button type="link" size="small">通过</a-button>
            </a-popconfirm>
          </span>

          <span>
            <a-popconfirm title="确认退回?" okText="确认" cancelText="取消" @confirm="fail(record.id)">
              <a-button type="link" size="small">退回</a-button>
            </a-popconfirm>
          </span>
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
import { viewPublishCourse, verifyPublishCourse } from '@/api/course-controller'
import { downloadFile } from '@/api/file-controller'
import { 
  course_type_select, getCourseTypeByNumber,
  PASS, FAIL
} from '@/utils/constant'

// TODO 批量通过和退回
// TODO 不输入筛选条件不反悔数据
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 30,
  },
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
    width: 50
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 30
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
    width: 60
  }
]

export default defineComponent({
  name: "ReleaseCourseManagementView",
  components: {
    SearchForm
  },
  setup() {
    const store = useStore()

    const search_form = [
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
      }
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
    } = usePagination(viewPublishCourse, {
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

    const pass = (key) => {
      verifyPublishCourse({
        courseId: key,
        courseStatus: PASS
      }).then(() => {
        run({
          size: pageSize.value,
          ...defaultParams,
          ...filters_buffer
          })
      })
    }

    const fail = (key) => {
      verifyPublishCourse({
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

    return {
      search_form,
      columns,
      courses,
      pagination,
      loading,
      handleTableChange,

      downloadFile,
      getConditions,
      pass, fail,

      getCourseTypeByNumber
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

  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
