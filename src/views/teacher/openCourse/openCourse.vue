<template>
  <div class="main">
    <div class="opened-course">
      <h1>已开设课程</h1>
      <div class="search">
        <search-form :items="opened_search_form" @conditions="getConditions"></search-form>
      </div>
      <a-table :columns="opened_columns" :data-source="opened_courses" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <div class="course-pool">
      <h1>发布课程</h1>
      <div class="search">
        <search-form :items="pool_search_form" @conditions="getConditions"></search-form>
      </div>
      <a-table :columns="pool_columns" :data-source="pool_courses" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="openCourse(record)">开课</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <a-modal v-model:visible="add_visible" title="新建课程" @ok="addOkHandle" centered>
    <template #footer>
      <a-button key="cancel" @click="addCancelHandle">取消</a-button>
      <a-button key="submit" type="primary" :loading="add_loading" @click="addOkHandle">提交</a-button>
    </template>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="学年" name="year">
        <a-select v-model:value="formState.year" size="small"></a-select>
      </a-form-item>
      <a-form-item label="学期" name="semester">
        <a-select v-model:value="formState.semester" size="small">
          <a-select-option value="1">第一学期</a-select-option>
          <a-select-option value="2">第二学期</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="面向年级" name="grade">
        <a-select v-model:value="formState.grade" size="small"></a-select>
      </a-form-item>
      <a-form-item label="人数限制" name="amount">
        <a-input-number v-model:value="formState.amount" :min="10" :max="120" size="small" />
      </a-form-item>
      <a-form-item label="期末占比" name="final_score_ratio">
        <a-slider v-model:value="formState.final_score_ratio" :min="40" :max="70" :step="10" size="small"></a-slider>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { useState } from '@/composable/state'

const opened_search_form = [
  {
    title: "学年学期",
    type: "cascade select",
    options: [
      {
        value: (2021, 2022),
        label: "2021-2022学年",
        children: [
          {
            value: 1,
            label: "第一学期"
          },
          {
            value: 2,
            label: "第二学期"
          }
        ]
      }
    ],
    rules: {
      required: false
    }
  },
  {
    title: "课程序号",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程名称",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程类别",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "开课院系",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "年级",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "周数",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "起止周",
    type: "range input",
    rules: {
      required: false
    }
  },
  {
    title: "星期",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "小节",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "校区",
    type: "select",
    rules: {
      required: false
    }
  }
]

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

const pool_search_form = [
  {
    title: "课程序号",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程名称",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "课程类别",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "开课院系",
    type: "select",
    rules: {
      required: false
    }
  }
]

const pool_columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 30,
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
    SearchForm
  },
  setup() {
    const pool_courses = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        department: '计算机学院',
        credit: '3.0'
        }
      )))

    // Modal openCourse
    const [openCourseData, setOpenCourseData] = useState({})
    const formRef = ref()
    const formState = reactive({
      year: '',
      semester: '',
      grade: '',
      amount: '',
      final_score_ratio: ''
    })

    const add_visible = ref(false)
    const add_loading = ref(false)

    const beforeUpload = file => {
      formState.syllabus = [...formState.syllabus, file];
      return false;
    }

    const addOkHandle = () => {
      console.log(openCourseData)
      add_loading.value = true
      setTimeout(() => {
        formRef.value.validateFields().then(values => {
          console.log('Received values of form: ', values)
          console.log('formState: ', toRaw(formState))

          const formData = new FormData()
          for(const prop in formState) {
            if(prop === 'syllabus') {
              formData.append(prop, formState[prop][0])
            }
            else {
              formData.append(prop, formState[prop])
            }
          }

          // TODO 提交 api

          add_loading.value = false
          add_visible.value = false
          formRef.value.resetFields()
          console.log('reset formState: ', toRaw(formState))
        }).catch(info => {
          console.log('Validate Failed:', info)
        });
      }, 2000)
    }

    const addCancelHandle = () => {
      add_visible.value = false
    }

    const openCourse = (record) => {
      // TODO 开设课程
      add_visible.value = true
      setOpenCourseData(record)
    }

    return {
      opened_search_form,
      opened_columns,

      pool_search_form,
      pool_columns,
      pool_courses,

      openCourse,
      formRef,
      formState,
      beforeUpload,

      add_visible,
      add_loading,
      addOkHandle,
      addCancelHandle
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