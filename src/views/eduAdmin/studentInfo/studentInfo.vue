<template>
  <div class="main">
    <h1>{{ $store.state.user.department }}学生信息</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table :columns="columns" :data-source="students" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'

const search_form = [
  {
    title: '学号',
    type: 'input',
    rules: {
      required: false
    }
  },
  {
    title: '姓名',
    type: 'input',
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
    width: 40
  },
  {
    title: '学号',
    dataIndex: 'student_id',
    key: 'student_id',
    width: 120
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 120
  },
  
]

export default defineComponent({
  name: "StudentInfoView",
  components: {
    SearchForm
  },
  setup() {
    const students = ref(
      [...Array(100)].map((_, i) => ({
        key: i,
        name: `学生${i}`,
        student_id: `学号${i}`,
        phone: `电话${i}`
        }
      )))

    return {
      search_form,
      columns,

      students
    }
  },
})
</script>
  
<style scoped>
  .main {
    padding: 35px 50px 0 50px;
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
