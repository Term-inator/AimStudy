<template>
  <admin-management 
    :title="'学生管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="students"
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
import { listUser, addUser, updateUser, deleteUser } from '@/api/admin-user-controller'

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
    dataIndex: 'userId',
    key: 'userId',
    width: '20%'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName',
    width: '10%'
  },
  {
    title: '专业',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: '20%'
  },
  {
    title: '入学年份',
    dataIndex: 'enrollmentYear',
    key: 'enrollmentYear',
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
    const total = ref(0)
    const {
      data: students,
      run,
      loading,
      current,
      pageSize,
      reload
    } = usePagination(listUser, {
      defaultParams: [
        {
          role: 4,
        },
      ],
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
      addUser(data).then(() => {
        reload()
      })
    }

    const remove = (selectedRowKeys) => {
      new Promise(resolve => {
        for(let key in selectedRowKeys) {
          deleteUser(key)
        }
        resolve()
      }).then(() => {
        reload()
      })
    }

    const update = (formState) => {
      updateUser(formState)
    }

    return {
      search_form,
      columns,
      students,
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
