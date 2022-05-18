<template>
  <div class="main">
    <div class="search">
      <search-form :items="search_form" :col_num="3"></search-form>
    </div>
    <div class="course-list">
      <!--TODO 所有学期成绩?-->
      <a-table :columns="columns" :data-source="courses" size="small" :pagination="false" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'

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
  }
]

const columns = [
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
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 80
  },
  {
    title: '平时成绩',
    dataIndex: 'classScore',
    key: 'classScore',
    width: 80
  },
  {
    title: '期末成绩',
    dataIndex: 'finalScore',
    key: 'finalScore',
    width: 80
  },
  {
    title: '总评成绩',
    dataIndex: 'totalScore',
    key: 'totalScore',
    width: 80
  },
  {
    title: '绩点',
    dataIndex: 'gpa',
    key: 'gpa',
    width: 80
  }
]

export default defineComponent({
  name: "CourseQueryView",
  components: {
    SearchForm
  },
  setup() {
    return {
      search_form,
       
      columns
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
