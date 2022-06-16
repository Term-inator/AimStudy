<template>
  <div class="main">
    <div class="search">
      <search-form :items="search_form" :col_num="3" @conditions="getConditions"></search-form>
    </div>
    <div class="course-list">
      <a-table :columns="columns" 
        :data-source="scores" 
        :loading="loading"
        size="small" :pagination="false" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" size="small" @click="downloadFile(record.key)">下载</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { listChoose } from '@/api/takes-controller'
import { queryScore } from '@/api/score-controller'
import { 
  year_semester,
  year_select, 
  semester_select
} from '@/utils/constant'

// TODO 所有学期成绩
const search_form = [
  {
    title: "学年",
    key: 'year',
    type: "select",
    options: year_select,
    rules: {
      required: false
    }
  },
  {
    title: "学期",
    key: 'semester',
    type: "select",
    options: semester_select,
    rules: {
      required: false
    }
  }
]

const columns = [
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
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: 80
  },
  {
    title: '平时成绩',
    dataIndex: 'midtermScore',
    key: 'midtermScore',
    width: 80
  },
  {
    title: '期末成绩',
    dataIndex: 'finalScore',
    key: 'finalScore',
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
    const store = useStore()

    const scores = ref([])
    const loading = ref(false)
    let filters_buffer = {}
    const getScores = () => {
      loading.value = true
      listChoose({
        ...year_semester,
        realName: store.state.user.realName,
      departmentName: store.state.user.departmentName
      }).then(res => {
        scores.value = res.data
        scores.value.forEach(item => {
          queryScore({
            studentId: store.state.user.id,
            sectionId: item.sectionId,
            ...filters_buffer
          }).then(res => {
            item.midtermScore = res.data[0].midtermScore
            item.finalScore = res.data[0].finalScore
            item.totalScore = res.data[0].totalScore
            item.gpa = res.data[0].gpa
          })
        })
        loading.value = false
      })
    }
    getScores()

    const getConditions = (formState) => {
      filters_buffer = formState
      getScores()
    }

    return {
      search_form,
       
      columns,
      loading,
      scores,

      getConditions
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
