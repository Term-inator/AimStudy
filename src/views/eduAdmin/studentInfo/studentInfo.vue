<template>
  <div class="main">
    <h1> {{ $store.state.user.department }} 学生信息</h1>
    <div class="search">
      <search-form :items="search_form" @conditions="getConditions"></search-form>
    </div>
    <a-table 
      :columns="columns" 
      :data-source="students" 
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      size="small" bordered>
      <template #bodyCell="{ column, index }">
        <template v-if="column.dataIndex === 'key'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { usePagination } from 'vue-request'
import { defineComponent, ref, computed } from 'vue'
import SearchForm from '@/components/searchForm/searchForm.vue'
import { listUser } from '@/api/admin-user-controller'

const search_form = [
  {
    title: '学号',
    key: 'UserID',
    type: 'input',
    rules: {
      required: false
    }
  },
  {
    title: '姓名',
    key: 'RealName',
    type: 'input',
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
    width: 40
  },
  {
    title: '学号',
    dataIndex: 'userId',
    key: 'userId',
    width: 120
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName',
    width: 100
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 120
  },
  
]

export default defineComponent({
  name: "StudentInfoView",
  components: {
    SearchForm
  },
  setup() {
    // 总页数
    const total = ref(0)
    const {
      data: students,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(listUser, {
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
      pageSize: pageSize.value,
      showSizeChanger: true
    }))

    // SearchForm 筛选条件
    let filters_buffer = {}
    const handleTableChange = (pag) => {
      if(pag) {
        run({
          size: pag.pageSize,
          current: pag.current,
          total: pag.total,
          ...filters_buffer,
          role: 4
        })
      }
    }

    const search = (formState) => {
      run({
        size: pageSize.value,
        total: total.value,
        ...formState,
        role: 4
      })
    }

    const getConditions = (formState) => {
      filters_buffer = formState
      search(formState)
    }

    return {
      search_form,
      columns,
      students,
      pagination,
      loading,
      handleTableChange,

      getConditions
    }
  },
})
</script>
  
<style scoped>
  .main {
    padding: 35px 50px 0 50px;
  }

  h1 {
    font-size: 16px;
    font-weight: 500;
  }

  .search {
    padding: 0 0 10px 0;
  }

  ::v-deep .ant-table-cell ,.table-cell-button-font{
    font-size: 5px;
    text-align: center;
  }
</style>
