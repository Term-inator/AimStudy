<template>
  <div class="main">
    <h1>发布成绩</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <div class="tool-bar">
      <a-button type="primary" @click="save" size="small" style="width: 100px;">保存</a-button>
      <a-button @click="submit" size="small" style="width: 100px">提交</a-button>
    </div>
    <a-table :columns="columns" :data-source="scores" size="small" :pagination="false" bordered>
      <template #bodyCell="{ column, record, text, index }">
        <template v-if="column.dataIndex === 'key'">
          {{ index }}
        </template>
        <template v-else-if="column.dataIndex === 'midtermScore' || column.dataIndex === 'finalScore'">
          <div>
            <a-input
              v-if="editableData[record.studentId]"
              v-model:value="editableData[record.studentId][column.dataIndex]"
              size="small"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <span v-if="editableData[record.studentId]">
            <a-popconfirm title="确认保存?" okText="确认" cancelText="取消" @confirm="saveToLocal(record.studentId)">
              <a-button type="link" size="small">保存</a-button>
            </a-popconfirm>
            <a-button type="link" @click="cancel(record.studentId)" size="small">取消</a-button>
          </span>
          <span v-else>
            <a-button type="link" @click="edit(record.studentId)" size="small">修改</a-button>
          </span>        
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { cloneDeep } from 'lodash-es'
import { queryCourse } from '@/api/course-controller'
import { listStudents } from '@/api/takes-controller'
import { publishScore } from '@/api/score-controller'
import { year_semester } from '@/utils/constant'

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
    dataIndex: 'studentId',
    key: 'studentId',
    width: 100
  },
  {
    title: '平时成绩',
    dataIndex: 'midtermScore',
    key: 'midtermScore',
    width: 60
  },
  {
    title: '期末成绩',
    dataIndex: 'finalScore',
    key: 'finalScore',
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
    const store = useStore()

    const courses_select = ref([])
    const resData = ref([])
    queryCourse({
      ...year_semester,
      realName: store.state.user.name,
    }).then(res => {
      res.data.map(item => {
        courses_select.value.push({
          value: item.sectionId,
          label: item.courseName
        })
      })
      resData.value = res.data
    })

    const search_form = ref([
      {
        title: "课程名称",
        key: 'sectionId',
        type: "select",
        options: courses_select,
        rules: {
          required: true
        }
      }
    ])

    const sectionId = ref(-1)
    const scores = ref([])
    const getConditions = (formState) => {
      sectionId.value = formState.sectionId
      if(formState.sectionId) {
        if(localStorage.getItem(formState.sectionId)) {
          scores.value = JSON.parse(localStorage.getItem(formState.sectionId))
        }
        else {
          listStudents(formState.sectionId).then(res => {
            res.data.map(item => {
              scores.value.push({
                name: item.realName,
                studentId: item.studentId,
                midtermScore: '',
                finalScore: '',
              })
            })
            localStorage.setItem(formState.sectionId, JSON.stringify(scores.value))
          })
        }
      }
    }

    const editableData = reactive({})

    const edit = key => {
      editableData[key] = cloneDeep(scores.value.filter(item => key === item.studentId)[0])
    }

    const saveToLocal = (key) => {
      new Promise((resolve) => {
        console.log(editableData)
        for(let i = 0; i < scores.value.length; ++i) {
          if(scores.value[i].studentId === key) {
            Object.assign(scores.value[i], editableData[key])
          }
        }
        console.log(scores.value)
        resolve()
      }).then(() => {
        save()
        delete editableData[key]
      })
    }

    const save = () => {
      if(sectionId.value) {
        localStorage.setItem(sectionId.value, JSON.stringify(scores.value))
      }
    }

    const cancel = key => {
      delete editableData[key]
    }

    const remove = () => {
      if(sectionId.value) {
        localStorage.removeItem(sectionId.value)
      }
    }

    const submit = () => {
      if(sectionId.value) {
        const section = resData.value.filter(item => sectionId.value === item.sectionId)[0]
        console.log(section)
        publishScore(sectionId.value, scores.value).then(() => {
          remove()
        })
      }
    }

    return {
      search_form,
      columns,

      getConditions,
      scores,
      save, submit, 
      edit, saveToLocal, cancel,
      editableData
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
