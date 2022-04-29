<template>
  <div class="main">
    <h1>全校开课查询</h1>
    <div class="search">
      <a-row :gutter="18">
        <template v-for="(item, index) in search_form" :key="index">
          <a-col v-show="expand || index < 4" :span="6">
            <a-row style="padding: 5px 0">
              <a-col :span="8"> {{ item.title }} </a-col>
              <a-col :span="16">
                <a-input v-if="item.type === 'input'" v-model:value="formState[`${item.title}`]" size="small"></a-input>
                <a-select v-else-if="item.type === 'select'" size="small" style="width: 100%"></a-select>
                <NullableInput v-else-if="item.type === 'nullable input'" v-model:value="formState[`${item.title}`]"></NullableInput>
                <RangeInput v-else-if="item.type === 'range input'" v-model:value="formState[`${item.title}`]"></RangeInput>
              </a-col>
            </a-row>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" size="small" style="font-size: 5px" @click="onFinish">查询</a-button>
          <a-button size="small" style="margin: 0 8px; font-size: 5px" @click="formReset">重置</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <Icon :icon="'UpOutlined'"></Icon>
              收起
            </template>
            <template v-else>
              <Icon :icon="'DownOutlined'"></Icon>
              展开
            </template>
          </a>
        </a-col>
      </a-row>
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
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Icon } from '@/components/icon'
import NullableInput from '@/components/nullableInput/nullableInput.vue'
import RangeInput from '@/components/rangeInput/rangeInput.vue'

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
    Icon,
    NullableInput,
    RangeInput
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

    const expand = ref(false);
    const formRef = ref();
    const formState = reactive({});

    const onFinish = () => {
      for(let key in toRefs(formState)) {
        console.log(key, toRefs(formState)[key].value)
      }
    }

    const formReset = () => {
      for(let key in toRefs(formState)) {
        toRefs(formState)[key].value = ''
      }
    }

    return {
      search_form,

      formRef,
      formState,
      formReset,
      expand,
      onFinish,

      columns,
      dataSource,
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
