<template>
  <admin-management 
    :title="'教师管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="teachers"
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
import { listUser, addUser, updateUser, deleteUser } from '@/api/admin-user-controller'

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: '10%',
  },
  {
    title: '工号',
    dataIndex: 'id',
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
    title: '入职年份',
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

export default defineComponent({
  name: "TeacherManagementView",
  components: {
    AdminManagement
  },
  setup() {
    const store = useStore()

    const search_form = ref([
      {
        title: "姓名",
        key: "realName",
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "工号",
        key: "userId",
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "专业",
        key: "departmentId",
        type: "select",
        options: store.state.constant.departments_select,
        rules: {
          required: false
        }
      },
      {
        title: "入职年份",
        key: "enrollmentYear",
        type: "input",
        rules: {
          required: false
        }
      }
    ])

    const add_modal = ref([
      {
        title: '姓名',
        name: 'realName',
        key: 'realName',
        type: 'input'
      },
      {
        title: '专业',
        name: 'departmentId',
        key: 'departmentId',
        type: 'select',
        options: store.state.constant.departments_select
      },
      {
        title: '联系电话',
        name: 'phone',
        key: 'phone',
        type: 'input'
      },
      {
        title: '入职年份',
        name: 'enrollmentYear',
        key: 'enrollmentYear',
        type: 'input'
      }
    ])

    // 总页数
    const total = ref(0)
    const {
      data: teachers,
      run,
      loading,
      current,
      pageSize,
      reload
    } = usePagination(listUser, {
      defaultParams: [
        {
          role: 3,
        },
      ],
      formatResult: res => {
        total.value = res.total
        res.data.map((item) => {
          item.id = item.userId
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

    const handleTableChange = ({ pag, filters }) => {
      if(pag) {
        run({
          pageSize: pag.pageSize,
          current: pag.current,
          total: pag.total,
          role: 3,
          ...filters
        })
      }
    }

    const add = (data) => {
      addUser({
        ...data,
        role: 3
      }).then(() => {
        reload()
      })
    }

    const remove = (selectedRowKeys) => {
      new Promise(resolve => {
        selectedRowKeys.forEach(key => {
          deleteUser(key)
        })
        resolve()
      }).then(() => {
        reload()
      })
    }

    const update = (formState) => {
      updateUser(formState)
    }

    const search = (formState) => {
      run({
        pageSize: pageSize.value,
        current: current.value,
        total: total.value,
        role: 3,
        ...formState
      })
    }
    
    return {
      search_form,
      columns,
      teachers,
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
