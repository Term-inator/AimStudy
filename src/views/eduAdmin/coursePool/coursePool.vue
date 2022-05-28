<template>
  <div class="main">
    <h1>学院课程</h1>
    <div class="search">
      <search-form :items="pool_search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table :columns="pool_columns" :data-source="pool_courses" size="small" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              size="small"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'type'">
          <div>
            <a-select
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              size="small"
            >
              <a-select-option value="compulsory">专业必修</a-select-option>
              <a-select-option value="optional">专业选修</a-select-option>
              <a-select-option value="general">通识</a-select-option>
            </a-select>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'credit'">
          <div>
            <a-input-number
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              :min="0.5" :step="0.5" size="small" string-mode
              @change="(val) => {
                editableData[record.key][column.dataIndex] = Math.floor(val * 2) / 2
              }"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-popconfirm title="确认保存?" okText="确认" cancelText="取消" @confirm="save(record.key)">
                <a-button type="link" size="small">保存</a-button>
              </a-popconfirm>
              <a-button type="link" @click="cancel(record.key)" size="small">取消</a-button>
            </span>
            <span v-else>
              <a-button type="link" @click="edit(record.key)" size="small">修改</a-button>
            </span>

            <span>
              <a-popconfirm title="确认删除?" okText="确认" cancelText="取消" @confirm="remove(record.key)">
                <a-button type="link" size="small">删除</a-button>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { cloneDeep } from 'lodash-es';

const pool_search_form = [
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
  }
]

const pool_columns = [
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
  name: "CoursePoolView",
  components: {
    SearchForm
  },
  setup() {
    const pool_courses = ref(
      [...Array(50)].map((_, i) => ({
        key: i,
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        credit: '3.0',
        }
      )))

    const editableData = reactive({})

    const edit = key => {
      editableData[key] = cloneDeep(pool_courses.value.filter(item => key === item.key)[0])
    }

    const save = key => {
      Object.assign(pool_courses.value.filter(item => key === item.key)[0], editableData[key])
      delete editableData[key]
    }

    const cancel = key => {
      delete editableData[key]
    }

    const remove = key => {
      // TODO
      console.log(key)
    }

    return {
      pool_search_form,
      pool_columns,
      pool_courses,

      editing_key: '',
      editableData,
      edit,
      save,
      cancel,
      remove
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
