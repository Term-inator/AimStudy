<template>
  <div class="main">
    <h1>全校开课查询</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table :columns="columns" :data-source="courses" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'

const search_form = [
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

export default defineComponent({
  components: {
    SearchForm
  },
  setup() {
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
        dataIndex: 'action',
        key: 'outline',
        width: 30
      }
    ]
    const courses = ref(
      [...Array(100)].map((_, i) => ({
        key: i,
        semester: '2021-2022学年第2学期',
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        department: '计算机学院',
        teacher: '张三',
        grade: '2019',
        arrangement: '星期一 1-2[1-16] 一教101',
        actual_num: '20',
        credit: '3.0',
        campus: '中山北路校区',
        }
      )))

    const download = (key) => {
      // TODO 下载大纲
      console.log(key)
    }

    const getConditions = (data) => {
      for(let key in toRefs(data)) {
        console.log(key, toRefs(data)[key].value)
      }
      // TODO 查询
    }    

    return {
      search_form,
      getConditions,

      columns,
      courses,
      download
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
