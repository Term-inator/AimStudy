<template>
  <div class="main">
    <h1>发布课程审核</h1>
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
</template>

<script>
import { defineComponent, ref } from 'vue'

// TODO 批量通过和退回
const columns = [
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
    width: 60
  }
]

export default defineComponent({
  name: "ReleaseCourseManagementView",
  setup() {
    const courses = ref(
      [...Array(50)].map((_, i) => ({
        key: i,
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        credit: '3.0',
        }
      )))

    return {
      columns,
      courses
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

  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
