<template>
  <div class="main">
    <h1> {{ title }} </h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <div class="tool-bar">
      <a-button type="primary" @click="add" size="small" style="width: 100px;">新建</a-button>
      <a-button @click="remove" size="small" style="width: 100px">删除</a-button>
    </div>
    <a-table 
      :columns="columns" 
      :data-source="data_source"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" 
      size="small" bordered>
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'key'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <span v-if="editableData[record.id]">
            <a-popconfirm title="确认保存?" okText="确认" cancelText="取消" @confirm="save(record.id)">
              <a-button type="link" size="small">保存</a-button>
            </a-popconfirm>
            <a-button type="link" @click="cancel(record.id)" size="small">取消</a-button>
          </span>
          <span v-else>
            <a-button type="link" @click="edit(record.id)" size="small">修改</a-button>
          </span>
        </template>
        <template v-else>
          <template v-if="column.dataIndex === 'id'">
            {{ text }}
          </template>
          <div v-else-if="column.dataIndex === 'departmentName'">
            <a-select
              v-if="editableData[record.id]"
              :options="$store.state.constant.departments_select"
              v-model:value="editableData[record.id]['departmentId']"
              size="small"
            >
            </a-select>
            <template v-else>
              {{ text }}
            </template>
          </div>
          <div v-else>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              size="small"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
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
        <a-form-item v-for="(item, index) in add_modal" :key="index" :label="item.title" :name="item.name">
          <a-input v-if="item.type === 'input'" v-model:value="formState[item.key]" size="small" />
          <a-select v-else-if="item.type === 'select'" 
            :options="item.options" 
            v-model:value="formState[item.key]" 
            size="small">
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, toRaw } from 'vue'
import { useStore } from 'vuex'; 
import SearchForm from '@/components/searchForm/searchForm.vue'
import { cloneDeep } from 'lodash-es';


export default defineComponent({
  name: "AdminManagement",
  props: {
    title: {
      type: String,
      required: true
    },
    search_form: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    data_source: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    add_modal: {
      type: Array,
      required: true
    }
  },
  components: {
    SearchForm
  },
  setup(props, { emit }) {
    const store = useStore()

    // SearchForm 筛选条件
    let filters = {}
    const handleTableChange = (pag) => {
      emit('change', { pag, filters })
    }

    const state = reactive({
      selectedRowKeys: []
    })

    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
    }

    // Modal add
    const formRef = ref()
    const formState = reactive({})

    const add_visible = ref(false)
    const add_loading = ref(false)

    const addOkHandle = () => {
      add_loading.value = true
      setTimeout(() => {
        formRef.value.validateFields().then(values => {
          console.log('Received values of form: ', values)
          console.log('formState: ', toRaw(formState))

          const formData = {}
          for(const prop in formState) {
            formData[prop] = formState[prop]
          }

          emit('add', formData)

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
      add_visible.value = true
    }

    const remove = () => {
      console.log('selectedRowKeys: ', state.selectedRowKeys)
      emit('remove', state.selectedRowKeys)
    }

    const editableData = reactive({})

    const edit = key => {
      editableData[key] = cloneDeep(props.data_source.filter(item => key === item.key)[0])
    }

    const save = key => {
      console.log(editableData[key])
      if(Object.prototype.hasOwnProperty.call(editableData[key], 'departmentId')) {
        editableData[key].departmentName = store.getters.getDepartmentById(editableData[key].departmentId).name
      }
      Object.assign(props.data_source.filter(item => key === item.key)[0], editableData[key])
      emit('update', editableData[key])
      delete editableData[key]
    }

    const cancel = key => {
      delete editableData[key]
    }

    const getConditions = (formState) => {
      filters = formState
      emit('search', formState)
    }

    return {
      handleTableChange,

      ...toRefs(state),
      onSelectChange,
      add,
      remove,
      edit, save, cancel, 
      getConditions,

      getDepartment: store.getters.getDepartment,
      editableData,

      formRef,
      formState,

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
    height: 100%;
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
