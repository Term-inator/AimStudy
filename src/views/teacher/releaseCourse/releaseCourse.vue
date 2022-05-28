<template>
  <div class="main">
    <h1>发布课程</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <div class="tool-bar">
      <a-button type="primary" @click="add" size="small" style="width: 100px;">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="courses" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'syllabus'">
          <a-button type="link" size="small" @click="download(record.key)">下载</a-button>
        </template>
      </template>
    </a-table>
    <!--新建-->
    <a-modal v-model:visible="add_visible" title="新建课程" @ok="addOkHandle" centered>
      <template #footer>
        <a-button key="cancel" @click="addCancelHandle">取消</a-button>
        <a-button key="submit" type="primary" :loading="add_loading" @click="addOkHandle">提交</a-button>
      </template>
      <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="课程名称" name="name">
          <a-input v-model:value="formState.name" size="small" />
        </a-form-item>
        <a-form-item label="课程类型" name="type">
          <a-select v-model:value="formState.type" size="small">
            <a-select-option value="compulsory">专业必修</a-select-option>
            <a-select-option value="optional">专业选修</a-select-option>
            <a-select-option value="general">通识</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="课程描述" name="description">
          <a-textarea v-model:value="formState.description" size="small"></a-textarea>
        </a-form-item>
        <a-form-item label="开课院系" name="department">
          <a-select v-model:value="formState.department" size="small"></a-select>
        </a-form-item>
        <a-form-item label="学分" name="credit">
          <a-input-number
            v-model:value="formState.credit"
            :min="0.5" :step="0.5" size="small" string-mode
            @change="(val) => {
              editableData[record.key][column.dataIndex] = Math.floor(val * 2) / 2
            }"
          />
        </a-form-item>
        <a-form-item label="课程大纲" name="syllabus">
          <a-upload-dragger
            v-model:fileList="formState.syllabus"
            name="file"
            :multiple="false"
            :maxCount="1"
            :before-upload="beforeUpload"
            @change="handleChange"
            @drop="handleDrop"
          >
            <p class="ant-upload-drag-icon">
              <Icon :icon="'InboxOutlined'"></Icon>
            </p>
            <p class="ant-upload-text">点击或拖入文件上传</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { Icon } from '@/components/icon'

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
  }
]

export default defineComponent({
  name: "ReleaseCourseView",
  components: {
    SearchForm,
    Icon
  },
  setup() {
    const courses = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        index: '1',
        name: `计算机网络${i}`,
        type: '专业必修',
        department: '计算机学院',
        credit: '3.0'
        }
      )))

    const download = (key) => {
      // TODO 下载大纲
      console.log(key)
    }

    // Modal add
    const formRef = ref()
    const formState = reactive({
      name: '',
      type: '',
      department: '',
      credit: '',
      description: '',
      syllabus: []
    })

    const add_visible = ref(false)
    const add_loading = ref(false)

    const beforeUpload = file => {
      formState.syllabus = [...formState.syllabus, file];
      return false;
    }

    const addOkHandle = () => {
      add_loading.value = true
      setTimeout(() => {
        formRef.value.validateFields().then(values => {
          console.log('Received values of form: ', values)
          console.log('formState: ', toRaw(formState))

          const formData = new FormData()
          for(const prop in formState) {
            if(prop === 'syllabus') {
              formData.append(prop, formState[prop][0])
            }
            else {
              formData.append(prop, formState[prop])
            }
          }

          // TODO 提交 api

          add_loading.value = false
          add_visible.value = false
          formRef.value.resetFields()
          console.log('reset formState: ', toRaw(formState))
        }).catch(info => {
          console.log('Validate Failed:', info)
        });
      }, 2000)
    }

    const addCancelHandle = () => {
      add_visible.value = false
    }

    const add = () => {
      // TODO 新建课程
      add_visible.value = true
    }

    return {
      search_form,

      columns,
      courses,
      download,
      add,

      formRef,
      formState,
      beforeUpload,

      add_visible,
      add_loading,
      addOkHandle,
      addCancelHandle
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
