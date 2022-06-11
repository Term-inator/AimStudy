<template>
  <a-modal v-model:visible="visible" title="新建课程" @ok="okHandle" centered>
    <template #footer>
      <a-button key="cancel" @click="cancelHandle">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="okHandle">提交</a-button>
    </template>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item v-for="(item, index) in modal" :key="index" :label="item.title" :name="item.name">
        <a-input v-if="item.type === 'input'" v-model:value="formState[item.key]" size="small" />
        <a-select v-else-if="item.type === 'select'" 
          :options="item.options" 
          v-model:value="formState[item.key]" 
          size="small">
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'CUModal',
  props: {
    modal: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    let formState = reactive({})

    const clear = () => {
      Object.keys(formState).map(key => {
        delete formState[key]
      })
    }

    const visible = ref(false)
    const loading = ref(false)

    const show = () => {
      visible.value = true
    }

    const assignValue = (form) => {
      formState = form
    }

    const okHandle = () => {
      loading.value = true
      formRef.value.validate(valid => {
        new Promise(resolve => {
          if (valid) {
            emit('ok', formState)
          }
          resolve()
        }).then(() => {
          loading.value = false
          visible.value = false
          clear()
        })
      })
    }

    const cancelHandle = () => {
      visible.value = false
      clear()
      emit('cancel')
    }

    return {
      visible,
      loading,
      formRef,
      formState,
      okHandle,
      cancelHandle,

      show,
      assignValue
    }
  },
})
</script>
