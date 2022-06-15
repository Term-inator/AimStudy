<template>
  <div class="main">
    <h1>发布课程</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <div class="tool-bar">
      <a-button type="primary" @click="add" size="small" style="width: 100px;">新建</a-button>
    </div>
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
        <template v-else-if="column.dataIndex === 'type'">
          {{ getCourseTypeByNumber(text) }}
        </template>
        <template v-else-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="downloadFile(record.syllabusPath)">下载</a-button>
        </template>
      </template>
    </a-table>
    <!--新建-->
    <cu-modal
      ref="add_modal_ref"
      :title="'发布课程'"
      :modal="add_modal"
      @ok="add_okHandler"
    >
    </cu-modal>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import CuModal from '@/components/cuModal/cuModal.vue'
import { viewCoursePool, publishCourse } from '@/api/course-controller'
import { downloadFile } from '@/api/file-controller'
import {
  course_type_select, getCourseTypeByNumber
} from '@/utils/constant'

const search_form = [
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
  }
]

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
  }
]

export default defineComponent({
  name: "ReleaseCourseView",
  components: {
    SearchForm,
    CuModal
  },
  setup() {
    const store = useStore()

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
    } = usePagination(viewCoursePool, {
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

    // Modal add
    const add_modal = [
      {
        title: '课程名称',
        key: 'name',
        type: 'input',
        rules: {
          required: true
        }
      },
      {
        title: '课程类型',
        key: 'type',
        type: 'select',
        options: course_type_select,
        rules: {
          required: true
        }
      },
      {
        title: '课程描述',
        key: 'description',
        type: 'textarea',
        rules: {
          required: false
        }
      },
      {
        title: '学分',
        key: 'credit',
        type: 'input number',
        min: 0.5,
        step: 0.5,
        change: (val) => {
          return Math.floor(val * 2) / 2
        },
        rules: {
          required: true
        }
      },
      {
        title: '课程大纲',
        key: 'syllabus',
        type: 'upload dragger',
        rules: {
          required: false
        }
      }
    ]
    const add_modal_ref = ref()
    const add = () => {
      add_modal_ref.value.show()
    }

    const add_okHandler = formData => {
      publishCourse({
        departmentId: store.state.user.departmentId,
        ...formData, 
      }).then(() => {
        run({
          size: pageSize.value,
          ...defaultParams,
          ...filters_buffer
        })
        add_modal_ref.value.hide()
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
      downloadFile,
      add,

      add_modal_ref,
      add_modal,
      add_okHandler,

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

  .tool-bar {
    margin: 0 0 15px 0;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
