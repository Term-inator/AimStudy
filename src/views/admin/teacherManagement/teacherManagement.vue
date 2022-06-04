<template>
  <admin-management 
    :title="'教师管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="teachers"
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
    title: "工号",
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
    title: "入职年份",
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
    title: '工号',
    dataIndex: 'user_id',
    key: 'user_id',
    width: 120
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
    width: 100
  },
  {
    title: '入学年份',
    dataIndex: 'year',
    key: 'year',
    width: 100
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
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
  name: "TeacherManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const teachers = ref(
      [...Array(15)].map((_, i) => ({
        key: i,
        user_id: '20180001',
        name: `教师${i}`,
        major: '计算机科学与技术',
        year: '2019',
        phone: '123456789'
        }
      )))
    return {
      search_form,
      columns,
      teachers,
      add_modal
    }
  },
})
</script>
