<template>
  <admin-management 
    :title="'校区管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="campus"
    :add_api="add_api"
    :remove_api="remove_api"
    :update_api="update_api"
    :add_modal="add_modal"
    >
  </admin-management>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AdminManagement from '@/components/adminManagement/adminManagement.vue'

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
  name: "CampusManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const campus = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        name: `校区${i}`,
        amount: '20',
        }
      )))
    return {
      search_form,
      columns,
      campus,
      add_modal
    }
  },
})
</script>
