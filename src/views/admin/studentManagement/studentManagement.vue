<template>
  <admin-management 
    :title="'学生管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="students"
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
    title: "姓名",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "学号",
    type: "input",
    rules: {
      required: false
    }
  },
  {
    title: "专业",
    type: "select",
    rules: {
      required: false
    }
  },
  {
    title: "入学年份",
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
    title: '学号',
    dataIndex: 'user_id',
    key: 'user_id',
    width: '20%'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: '10%'
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
    width: '20%'
  },
  {
    title: '入学年份',
    dataIndex: 'year',
    key: 'year',
    width: '10%'
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    width: '20%'
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
    title: '姓名',
    name: 'name'
  },
  {
    title: '专业',
    name: 'major'
  },
  {
    title: '联系电话',
    name: 'phone'
  }
]

export default defineComponent({
  name: "StudentManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const students = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        user_id: '20180001',
        name: `学生${i}`,
        major: '计算机科学与技术',
        year: '2019',
        phone: '123456789'
        }
      )))
    return {
      search_form,
      columns,
      students,
      add_modal
    }
  },
})
</script>
