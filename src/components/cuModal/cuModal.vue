<template>
  <a-modal v-model:visible="visible" title="title" @ok="okHandle" centered>
    <template #footer>
      <a-button key="cancel" @click="cancelHandle">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="okHandle">提交</a-button>
    </template>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item v-for="(item, index) in modal" :key="index" :label="item.title" :name="item.name">
        <a-input v-if="item.type === 'input'" 
          v-model:value="formState[item.key]" 
          size="small" />
        <a-input-number v-if="item.type === 'input number'"
          v-model:value="formState[item.key]"
          :min="item.min" :step="item.step"
          size="small" string-mode
          @change="(val) => {
            formState[item.key] = item.change(val)
          }" />
        <a-textarea v-if="item.type === 'textarea'"
          v-model:value="formState[item.key]"
          size="small">
        </a-textarea>
        <a-select v-else-if="item.type === 'select'" 
          :options="item.options" 
          v-model:value="formState[item.key]" 
          size="small">
        </a-select>
        <a-slider v-else-if="item.type === 'slider'"
          v-model:value="formState[item.key]" 
          :min="item.min" :max="item.max" :step="item.step" 
          size="small">
        </a-slider>
        <a-upload-dragger v-if="item.type === 'upload dragger'"
            v-model:fileList="uploadedFileList"
            name="file"
            :multiple="false"
            :maxCount="1"
            action="https://aimstudy.neptu.cn/api/file"
            :headers="{'x-auth-token': $store.state.user.token}"
            @change="handleChange"
            @drop="handleDrop"
          >
            <p class="ant-upload-drag-icon">
              <Icon :icon="'InboxOutlined'"></Icon>
            </p>
            <p class="ant-upload-text">点击或拖入文件上传</p>
          </a-upload-dragger>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { Icon } from '@/components/icon'
import { deleteFile } from '@/api/file-controller'

export default defineComponent({
  name: 'CUModal',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    modal: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    let formState = reactive({})
    const uploadedFileList = ref([])

    const clear = () => {
      Object.keys(formState).map(key => {
        delete formState[key]
      })
    }

    const visible = ref(false)
    const loading = ref(false)

    const show = () => {
      deleteFile("2022/06/12/1655015959574-大纲测试.docx").then(res => {
        console.log(res)
      })
      visible.value = true
    }

    const hide = () => {
      loading.value = false
      visible.value = false
      clear()
    }

    const assignValue = (form) => {
      for(const prop in form) {
        formState[prop] = form[prop]
      }
    }

    const okHandle = () => {
      loading.value = true
      console.log(uploadedFileList.value)
      formRef.value.validateFields().then(valid => {
        if (valid) {
          const formData = {}
          for(const prop in formState) {
            formData[prop] = formState[prop]
          }
          emit('ok', formData)
        }
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

      show, hide,
      assignValue,
      
      uploadedFileList
    }
  },
})
</script>
