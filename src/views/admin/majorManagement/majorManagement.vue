<template>
  <admin-management 
    :title="'专业管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="majors"
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
    width: 30,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },
  {
    title: '人数',
    dataIndex: 'amount',
    key: 'amount',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 60
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
    const majors = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        name: `专业${i}`,
        amount: '20',
        }
      )))
    return {
      search_form,
      columns,
      majors,
      add_modal
    }
  },
})
</script>
