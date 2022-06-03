<template>
  <div class="main">
    <div v-if="!show_score_info">
      <h1>课程成绩</h1>
      <div class="search">
        <search-form :items="search_form" @conditions="getConditions"></search-form>
      </div>
      <a-table :columns="columns" :data-source="courses" size="small" bordered>
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
import { defineComponent, ref } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { Icon } from "@/components/icon"

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
    title: "教师", // 教师可以为空，表示查询未指定教师的课程
    type: "nullable input",
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

const columns = [
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
    title: '教师',
    dataIndex: 'teacher',
    key: 'teacher',
    width: 80
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
    const courses = ref(
      [...Array(100)].map((_, i) => ({
        key: i,
        semester: '2021-2022学年第2学期',
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        teacher: '张三',
        grade: '2019',
        arrangement: '星期一 1-2[1-16] 一教101',
        credit: '3.0',
        campus: '中山北路校区',
        }
      )))

    const course_chosen = ref(null)
    const scoreInfo = (record) => {
      show_score_info.value = true
      course_chosen.value = record
    }

    return {
      search_form,
      columns,
      courses,

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
