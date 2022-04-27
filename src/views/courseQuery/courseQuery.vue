<template>
  <div>
    全校开课查询
    <div>
      search
    </div>
    <a-table :columns="columns" :data-source="dataSource" size="small" bordered>
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'outline'">
          <a-button type="link" size="small" class="table-cell-button-font" @click="download(record.key)">下载</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
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
        dataIndex: 'outline',
        key: 'outline',
        width: 30
      }
    ]
    const dataSource = ref(
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

    return {
      columns,
      dataSource,
      download
    }
  },
})
</script>

<style scoped>
::v-deep .ant-table-cell ,.table-cell-button-font{
  font-size: 5px;
  text-align: center;
}
</style>
