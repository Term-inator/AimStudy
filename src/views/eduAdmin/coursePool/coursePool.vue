<template>
  <div class="main">
    <h1>学院课程</h1>
    <div class="search">
      <search-form :items="pool_search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table :columns="pool_columns" 
      :data-source="pool_courses" 
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      size="small" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              size="small"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'type'">
          <div>
            <a-select
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              :options="course_type_select"
              size="small" style="width: 90%;"
            ></a-select>
            <template v-else>
              {{ getCourseTypeByNumber(text) }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'credit'">
          <div>
            <a-input-number
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              :min="0.5" :step="0.5" size="small" string-mode
              @change="(val) => {
                editableData[record.key][column.dataIndex] = Math.floor(val * 2) / 2
              }"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <span v-if="editableData[record.key]">
            <a-popconfirm title="确认保存?" okText="确认" cancelText="取消" @confirm="save(record.courseId)">
              <a-button type="link" size="small">保存</a-button>
            </a-popconfirm>
            <a-button type="link" @click="cancel(record.courseId)" size="small">取消</a-button>
          </span>
          <span v-else>
            <a-button type="link" @click="edit(record.courseId)" size="small">修改</a-button>
          </span>

          <span>
            <a-popconfirm title="确认删除?" okText="确认" cancelText="取消" @confirm="remove(record.courseId)">
              <a-button type="link" size="small">删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { cloneDeep } from 'lodash-es'
import { viewCoursePool, modifyPublishCourse } from '@/api/course-controller'
import { downloadFile } from '@/api/file-controller'
import { course_type_select, getCourseTypeByNumber, getNumberByCourseType } from '@/utils/constant'

// TODO course description
// TODO 修改大纲
const pool_search_form = [
  {
    title: "课程序号",
    type: "input",
    key: 'courseId',
    rules: {
      required: false
    }
  },
  {
    title: "课程名称",
    type: "input",
    key: 'name',
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
    width: 60
  }
]

export default defineComponent({
  name: "CoursePoolView",
  components: {
    SearchForm
  },
  setup() {
    const store = useStore()
    const defaultParams = {
      departmentId: store.state.user.departmentId
    }

    // 总页数
    const total = ref(0)
    const {
      data: pool_courses,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(viewCoursePool, {
      defaultParams: [defaultParams],
      formatResult: res => {
        console.log(res)
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

    const editableData = reactive({})

    const edit = key => {
      editableData[key] = cloneDeep(pool_courses.value.filter(item => key === item.key)[0])
      editableData[key]['type'] = getCourseTypeByNumber(editableData[key]['type'])
    }

    const save = key => {
      if(typeof editableData[key]['type'] === 'string') {
        editableData[key]['type'] = getNumberByCourseType(editableData[key]['type'])
      }
      editableData[key]['courseId'] = editableData[key]['id']
      Object.assign(pool_courses.value.filter(item => key === item.key)[0], editableData[key])
      modifyPublishCourse(editableData[key]).then(() => {
        delete editableData[key]
      })
    }

    const cancel = key => {
      delete editableData[key]
    }

    const remove = key => {
      // TODO
      console.log(key)
    }

    return {
      pool_search_form,
      pool_columns,
      pool_courses,
      pagination,
      loading,
      handleTableChange,

      editableData,
      edit,
      save,
      cancel,
      remove,

      downloadFile,
      getConditions,

      course_type_select,
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
</style>
