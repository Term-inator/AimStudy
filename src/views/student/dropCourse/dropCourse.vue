<template>
  <div class="main">
    <div class="course-list">
      <a-table :columns="columns" 
      :data-source="chose_courses" 
      :pagination="chose_pagination"
      :loading="chose_loading"
      @change="chose_handleTableChange"
      size="small" bordered>
        <template #bodyCell="{ column, record, text, index }">
          <template v-if="column.dataIndex === 'key'">
            {{ (chose_pagination.current - 1) * chose_pagination.pageSize + index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'courseType'">
            {{ getCourseTypeByNumber(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="quit(record.sectionId)">退课</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { quitSection } from '@/api/course-controller'
import { listChoose } from '@/api/takes-controller'
import { 
  year_semester,
  getSemesterByNumber,
  getDayByNumber,
  getCourseTypeByNumber
} from '@/utils/constant'

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 30
  },
  {
    title: '课程序号',
    dataIndex: 'sectionId',
    key: 'sectionId',
    width: 100
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    key: 'courseName',
    width: 120
  },
  {
    title: '课程类型',
    dataIndex: 'courseType',
    key: 'courseType',
    width: 100
  },
  {
    title: '开课院系',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 100
  },
  {
    title: '教师',
    dataIndex: 'realName',
    key: 'realName',
    width: 80
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 80
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 30
  }
]

export default defineComponent({
  name: "DropCourseView",
  setup() {
    const store = useStore()

    const chose_defaultParams = {
      ...year_semester,
      studentId: store.state.user.id,
      departmentName: store.state.user.departmentName,
    }

    // 总页数
    const chose_total = ref(0)
    const {
      data: chose_courses,
      run: chose_run,
      loading: chose_loading,
      current: chose_current,
      pageSize: chose_pageSize,
    } = usePagination(listChoose, {
      defaultParams: [chose_defaultParams],
      formatResult: res => {
        chose_total.value = res.total
        res.data.map(item => {
          item.year_semester = `
            ${item.year}学年
            ${getSemesterByNumber(item.semester)}
          `
          item.arrangement = `
            ${getDayByNumber(item.day)} ${item.startTime}-${item.endTime}
            [${item.startWeek}-${item.endWeek}]
            ${item.roomNumber}
          `
        })
        return res.data
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const chose_pagination = computed(() => ({
      total: chose_total.value,
      current: chose_current.value,
      pageSize: chose_pageSize.value,
      showSizeChanger: true
    }))

    const chose_handleTableChange = (pag) => {
      if(pag) {
        chose_run({
          size: pag.pageSize,
          current: pag.current
        })
      }
    }

    const quit = (sectionId) => {
      quitSection(sectionId, {
        studentId: store.state.user.id
      }).then(() => {
        refresh()
      })
      // TODO message
    }

    const refresh = () => {
      chose_run({
        size: chose_pageSize.value,
        ...chose_defaultParams,
      })
    }

    return {
      columns,
      chose_courses,
      chose_pagination,
      chose_loading,
      chose_handleTableChange,
      quit,
      getCourseTypeByNumber
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
