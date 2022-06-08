<template>
  <a-table
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </a-table>
</template>
<script>
import { usePagination } from 'vue-request';
import { computed, defineComponent } from 'vue';
import axios from 'axios';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [{
    text: 'Male',
    value: 'male',
  }, {
    text: 'Female',
    value: 'female',
  }],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

const queryData = params => {
  console.log(params)
  return axios.get('https://randomuser.me/api?noinfo', {
    params,
  });
};

export default defineComponent({
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: res => {
        return res.data.results
      },
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const handleTableChange = (pag) => {
      if(pag) {
      run({
        results: pag.pageSize,
        page: pag.current,
      });
      }
    };

    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
    };
  },

});
</script>