<template>
  <a-row :gutter="18">
    <template v-for="(item, index) in search_form" :key="index">
      <a-col v-show="expand || index < 4" :span="6">
        <a-row style="padding: 5px 0">
          <a-col :span="8"> {{ item.title }} </a-col>
          <a-col :span="16">
            <a-input v-if="item.type === 'input'" v-model:value="formState[`${item.title}`]" size="small"></a-input>
            <a-select v-else-if="item.type === 'select'" size="small" style="width: 100%"></a-select>
            <NullableInput v-else-if="item.type === 'nullable input'" ref="nullable_input" v-model:value="formState[`${item.title}`]"></NullableInput>
            <RangeInput v-else-if="item.type === 'range input'" v-model:value="formState[`${item.title}`]"></RangeInput>
          </a-col>
        </a-row>
      </a-col>
    </template>
  </a-row>
  <a-row>
    <a-col :span="24" style="text-align: right">
      <a-button type="primary" size="small" style="font-size: 5px" @click="onFinish">查询</a-button>
      <a-button size="small" style="margin: 0 8px; font-size: 5px" @click="formReset">重置</a-button>
      <a style="font-size: 12px" @click="expand = !expand">
        <template v-if="expand">
          <Icon :icon="'UpOutlined'"></Icon>
          收起
        </template>
        <template v-else>
          <Icon :icon="'DownOutlined'"></Icon>
          展开
        </template>
      </a>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { Icon } from '@/components/icon'
import NullableInput from '@/components/nullableInput/nullableInput.vue'
import RangeInput from '@/components/rangeInput/rangeInput.vue'

export default defineComponent({
  name: 'SearchForm',
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Icon,
    NullableInput,
    RangeInput
  },
  setup(props, { emit }) {
    console.log(props.items)

    const expand = ref(false);
    const formState = reactive({});

    const onFinish = () => {
      emit('conditions', formState)
    }

    const nullable_input = ref(null)

    const formReset = () => {
      for(let key in toRefs(formState)) {
        toRefs(formState)[key].value = ''
      }
      nullable_input.value.forEach(e => {
        e.reset()
      })
    }

    return {
      search_form: props.items,

      formState,
      formReset,
      expand,
      onFinish,

      nullable_input
    }
  },
})
</script>
