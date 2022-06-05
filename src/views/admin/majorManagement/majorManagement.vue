<template>
  <admin-management 
    :title="'专业管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="majors"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    @add="add"
    @remove="remove"
    @update="update"
    :add_modal="add_modal"
    >
  </admin-management>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import AdminManagement from '@/components/adminManagement/adminManagement.vue'
import { listDepartment, addDepartment, deleteDepartment, updateDepartment } from '@/api/admin-department-controller'

const search_form = [
  {
    title: "名称",
    type: "input",
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
    width: '10%',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '80%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%'
  }
]

const add_modal = [
  {
    title: '名称',
    name: 'name'
  }
]

export default defineComponent({
  name: "MajorManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const total = ref(0)
    const {
      data: majors,
      run,
      loading,
      current,
      pageSize
    } = usePagination(listDepartment, {
      formatResult: res => {
        total.value = res.total
        return res.data
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value
    }))

    const handleTableChange = ({ pag }) => {
      console.log(pag)
      run({
        pageSize: pag.pageSize,
        current: pag?.current,
        total: pag?.total
      })
    }

    const add = (data) => {
      addDepartment(data).then(() => {
        majors.value.push(data)
        majors.value[majors.value.length - 1].key = majors.value.length
      })
    }

    const remove = (selectedRowKeys) => {
      for(let i = 0; i < selectedRowKeys.length; ++i) {
        deleteDepartment(majors.value[selectedRowKeys[i] - 1].id).then(() => {
          majors.value.splice(selectedRowKeys[i] - 1, 1)
        })
      }
    }

    const update = (formState) => {
      updateDepartment(formState).then(res => {
        for(let i = 0; i < majors.value.length; ++i) {
          if(majors.value[i].id === res.data.id) {
            majors.value[i] = res.data
          }
        }
      })
    }

    return {
      search_form,
      columns,
      majors,
      pagination,
      loading,
      handleTableChange,

      add_modal,
      add,
      remove,
      update
    }
  },
})
</script>
