<template>
  <div class="main">
    <div class="search">
      <search-form :items="search_form"></search-form>
    </div>
    <div class="course-table">
      <course-table :course_table="course_table"></course-table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import CourseTable from '@/components/courseTable/courseTable.vue'

const search_form = [
  {
    title: "教学周",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "学年学期",
    type: "select", // TODO cascade select
    rules: {
      required: false
    }
  }
]

export default defineComponent({
  name: "CourseTableView",
  components: {
    SearchForm,
    CourseTable
  },
  setup() {
    

    const course_table = [
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
      ]
    ]
    return {
      search_form,
      course_table
    }
  },
})
</script>
// TODO 修改 padding 设置位置
<style scoped>
  .main {
    padding: 20px 15px 0 15px;
  }

  .search {
    padding: 0 0 10px 0;
  }
</style>
