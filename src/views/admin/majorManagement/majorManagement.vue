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
    @search="search"
    :add_modal="add_modal"
    >
  </admin-management>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AdminManagement from '@/components/adminManagement/adminManagement.vue'
import { listDepartment, addDepartment, deleteDepartment, updateDepartment } from '@/api/admin-department-controller'

const search_form = [
  {
    title: "名称",
    key: "name",
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
    name: 'name',
    key: 'name',
    type: 'input'
  }
]

export default defineComponent({
  name: "MajorManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const store = useStore()

    const total = ref(0)
    const {
      data: majors,
      run,
      loading,
      current,
      pageSize,
      reload
    } = usePagination(listDepartment, {
      formatResult: res => {
        total.value = res.total
        res.data.map((item) => {
          item.key = item.id
        })
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
      if(pag) {
        run({
          pageSize: pag.pageSize,
          current: pag.current,
          total: pag.total
        })
      }
    }

    const add = (data) => {
      addDepartment(data).then(() => {
        reload()
        // 重新获取专业列表
        store.dispatch('constant/queryConstant')
      })
    }

    const remove = (selectedRowKeys) => {
      new Promise(resolve => {
        selectedRowKeys.forEach(key => {
          deleteDepartment(key)
        })
        resolve()
      }).then(() => {
        reload()
        // 重新获取专业列表
        store.dispatch('constant/queryConstant')
      })
    }

    const update = (formState) => {
      updateDepartment(formState)
      // 重新获取专业列表
      store.dispatch('constant/queryConstant')
    }

    const search = (formState) => {
      run({
        pageSize: pageSize.value,
        current: current.value,
        total: total.value,
        ...formState
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
      update,
      search
    }
  },
})
</script>
