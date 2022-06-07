<template>
  <admin-management 
    :title="'用户管理'" 
    :search_form="search_form"
    :columns="columns"
    :data_source="users"
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
import { roles_select, getRoleNameById } from '@/utils/constant'

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: '10%',
  },
  {
    title: '学工号',
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
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    width: '10%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%'
  }
]

export default defineComponent({
  name: "UserManagementView",
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
        title: "学号",
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
        title: "入学年份",
        key: "enrollmentYear",
        type: "input",
        rules: {
          required: false
        }
      },
      {
        title: "角色",
        key: "role",
        type: "select",
        options: roles_select,
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
        title: '入学年份',
        name: 'enrollmentYear',
        key: 'enrollmentYear',
        type: 'input'
      },
      {
        title: '角色',
        name: 'role',
        key: 'role',
        type: 'select',
        options: roles_select
      }
    ])

    // 总页数
    const total = ref(0)
    const {
      data: users,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(listUser, {
      formatResult: res => {
        total.value = res.total
        // 去除超级管理员
        let result = res.data.filter((item) => item.role !== 1)
        result.map((item) => {
          item.id = item.userId
          item.key = item.id
          item.roleName = getRoleNameById(item.role)
        })
        return result
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

    // SearchForm 筛选条件
    let filters_buffer = {}
    const handleTableChange = ({ pag, filters }) => {
      // AdminManagement 组件的 handleTableChange 会触发该事件
      // 所以当表格翻页时，该事件会被触发，并根据筛选条件重新 run 获取新的数据
      // 由于此处的 filters 是从 Search Form 中获取的，没有使用 antd Table 的筛选功能，
      // 所以这里的 filters 不是 antd Table 提供的 filters
      // 每次 AdminManagement 的 handleTableChange 触发时，都会将其暂存的 filters 传递给该事件
      // 然而，antd Table 的 onSelectChange 似乎也是 handleTableChange 的一部分
      // 在删除操作的选择步骤时，该事件也会被触发，由于此时没有把上面提到的暂存的 filters 传递给该事件，
      // 所以这里的 filters 是 antd Table 的 filters，为 undefined，因此要进行判断
      if(filters) {
        filters_buffer = filters
      }
      if(pag) {
        run({
          pageSize: pag.pageSize,
          current: pag.current,
          total: pag.total,
          ...filters
        })
      }
    }

    const add = (data) => {
      addUser(data).then(() => {
        run({
          pageSize: pageSize.value,
          current: current.value,
          total: total.value,
          ...filters_buffer
        })
      })
    }

    const remove = (selectedRowKeys) => {
      new Promise(resolve => {
        selectedRowKeys.forEach(key => {
          deleteUser(key)
        })
        resolve()
      }).then(() => {
        run({
          pageSize: pageSize.value,
          current: current.value,
          total: total.value,
          ...filters_buffer
        })
      })
    }

    const update = (formState) => {
      updateUser(formState)
    }

    const search = (formState) => {
      filters_buffer = formState
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
      users,
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
