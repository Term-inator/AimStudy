<template>
  <div class="main">
    <div>
      <h1>开设课程审核</h1>
      <a-table :columns="columns" :data-source="courses" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <span>
              <a-popconfirm title="确认通过?" okText="确认" cancelText="取消" @confirm="pass(record.key)">
                <a-button type="link" size="small">通过</a-button>
              </a-popconfirm>
            </span>

            <span>
              <a-popconfirm title="确认退回?" okText="确认" cancelText="取消" @confirm="fail(record.key)">
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
        <search-form :items="passed_search_form" @conditions="getConditions"></search-form>
      </div>
      <a-table :columns="passed_columns" :data-source="passed_courses" :scroll="{ x: 1000 }" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <span>
              <a-button type="link" size="small">修改</a-button>
            </span>

            <span>
              <a-popconfirm title="确认删除?" okText="确认" cancelText="取消" @confirm="fail(record.key)">
                <a-button type="link" size="small">删除</a-button>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
// TODO id name type year semester teacher
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
    dataIndex: 'index',
    key: 'index',
    width: 100
  },
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
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
    dataIndex: 'semester',
    key: 'semester',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'teacher',
    key: 'teacher',
    width: 100
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    width: 100
  },
  {
    title: '人数',
    dataIndex: 'amount',
    key: 'amount',
    width: 100
  },
  {
    title: '期末占比',
    dataIndex: 'final_score_ratio',
    key: 'final_score_ratio',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
]

const passed_search_form = [
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
    title: "课程类型",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "教师",
    type: "input",
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
    title: "起止周",
    key: ['start_week', 'end_week'],
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

const passed_columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 40
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
    width: 100
  },
  {
    title: '课程类型',
    dataIndex: 'type',
    key: 'type',
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
    dataIndex: 'semester',
    key: 'semester',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'teacher',
    key: 'teacher',
    width: 50
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    width: 50
  },
  {
    title: '人数',
    dataIndex: 'amount',
    key: 'amount',
    width: 50
  },
  {
    title: '期末占比',
    dataIndex: 'final_score_ratio',
    key: 'final_score_ratio',
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
    dataIndex: 'campus',
    key: 'campus',
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
    SearchForm
  },
  setup() {
    const courses = ref(
      [...Array(50)].map((_, i) => ({
        key: i,
        semester: '2019-2020-1',
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        teacher: '张三',
        grade: '2019',
        credit: '3.0',
        amount: '60',
        final_score_ratio: '60%'
        }
      )))

    const passed_courses = ref(
      [...Array(50)].map((_, i) => ({
        key: i,
        semester: '2019-2020-1',
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        teacher: '张三',
        grade: '2019',
        credit: '3.0',
        amount: '60',
        final_score_ratio: '60%',
        arrangement: '周一 1-2[1-18] 一教306',
        campus: '闵行'
        }
      )))

    return {
      columns,
      courses,

      passed_search_form,
      passed_columns,
      passed_courses
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
    overflow: hidden;
  }
</style>
