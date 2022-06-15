<template>
  <div class="main">
    <div class="course-table">
      <course-table :mode="'select course'" 
        :course_table="course_table" >
      </course-table>
    </div>
    <div class="course-list">
      <a-table :columns="columns" :data-source="courses" size="small" :pagination="false" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'syllabus'">
            <a-button type="link" size="small" @click="downloadFile(record.key)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CourseTable from '@/components/courseTable/courseTable.vue'
import { downloadFile } from '@/api/file-controller'

// TODO 已选 未选
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
    title: '教师',
    dataIndex: 'teacher',
    key: 'teacher',
    width: 80
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
  name: "SelectCourseView",
  components: {
    CourseTable
  },
  setup() {
    const course_table = [
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
        {},
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span: 2 },
        {},
        { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ],
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ],
      [
        { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 14 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
        {},
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
        {},
        { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ],
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
        {},
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
        {},
        { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ],
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "张三", course_name: "计算机网络11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", room: "A101", span: 2 },
        {},
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
        {},
        { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ],
      [
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 1, teacher: "张三", course_name: "计算机网络", room: "A101", span: 2 },
        {},
        { state: 1, teacher: "李四", course_name: "计算机系统", room: "A102", span:2 },
        {},
        { state: 1, teacher: "王五", course_name: "高等数学", room: "A103", span: 3 },
        {},
        {},
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 },
        { state: 0, span: 1 }
      ]
    ]

    const courses = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        department: '计算机学院',
        teacher: '张三',
        credit: '3.0',
        }
      )))

    return {
      course_table,

      columns,
      courses,
      downloadFile
    }
  },
})
</script>

<style scoped>
  .main {
    padding: 35px 50px 0 50px;
  }

  .search {
    padding: 0 0 10px 0;
  }

  .course-list {
    padding: 30px 0 0 0;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
