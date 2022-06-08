<template>
  <admin-management 
    :title="'校区管理'" 
    :columns="columns"
    :data_source="campus"
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
import { useStore } from 'vuex'
import AdminManagement from '@/components/adminManagement/adminManagement.vue'
import { listCampusLocation, addCampusLocation, updateCampusLocation, deleteCampusLocation } from '@/api/admin-campus-location-controller'

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
  name: "CampusManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const store = useStore()
    
    const total = ref(0)
    const {
      data: campus,
      run,
      loading,
      current,
      pageSize,
      reload
    } = usePagination(listCampusLocation, {
      formatResult: res => {
        total.value = res.total
        res.map((item) => {
          item.key = item.id
        })
        return res
      },
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'size'
      },
    })
    
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true
    }))

    const handleTableChange = ({ pag }) => {
      if(pag) {
        run({
          size: pag.pageSize,
          current: pag.current,
          total: pag.total
        })
      }
    }

    const add = (data) => {
      addCampusLocation(data).then(() => {
        reload()
        // 重新获取校区列表
        store.dispatch('constant/queryCampusLocation')
      })
    }

    const remove = (selectedRowKeys) => {
      new Promise(resolve => {
        selectedRowKeys.forEach(key => {
          deleteCampusLocation(key)
        })
        resolve()
      }).then(() => {
        reload()
        // 重新获取专业列表
        store.dispatch('constant/queryCampusLocation')
      })
    }

    const update = (formState) => {
      updateCampusLocation(formState)
      // 重新获取专业列表
      store.dispatch('constant/queryCampusLocation')
    }

    return {
      columns,
      campus,
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
