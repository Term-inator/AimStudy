<template>
  <div class="main">
    <h1>发布成绩</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table :columns="columns" :data-source="scores" size="small" :pagination="false" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link" size="small" @click="modify(record)">修改</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'

// TODO 本地保存 一键提交 保存，提交按钮
// 学号 平时 期末 的列表
// TODO 今年代表学年 7-1 3-6
const search_form = [
  {
    title: "课程名称",
    type: "select",
    rules: {
      required: true
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
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 60
  }
]

export default defineComponent({
  name: "PublishScoreView",
  components: {
    SearchForm
  },
  setup() {
    // TODO sort edit
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
      search_form,
      columns,

      scores
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
