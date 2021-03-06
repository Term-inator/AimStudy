<template>
  <a-modal v-model:visible="visible" :title="title" @ok="okHandle" centered>
    <template #footer>
      <a-button key="cancel" @click="cancelHandle">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="okHandle">提交</a-button>
    </template>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item v-for="(item, index) in modal" 
        :key="index" 
        :label="item.title" 
        :name="item.name"
      >
        <a-input v-if="item.type === 'input'" 
          v-model:value="formState[item.key]" 
          size="small" />
        <a-input-number v-if="item.type === 'input number'"
          v-model:value="formState[item.key]"
          :min="item.min" :step="item.step"
          size="small"
          @change="(val) => {
            if(item.change) {
              formState[item.key] = item.change(val)
            }
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
        <a-select v-else-if="item.type === 'search select'"
          show-search
          :default-active-first-option="false"
          :show-arrow="false"
          :not-found-content="null"
          :options="item.options"
          v-model:value="formState[item.key]"
          size="small">
        </a-select>
        <a-slider v-else-if="item.type === 'slider'"
          v-model:value="formState[item.key]" 
          :min="item.min" :max="item.max" :step="item.step" 
          size="small">
        </a-slider>
        <range-input v-else-if="item.type === 'range input'" 
            v-model:left_value="formState[item.key[0]]"
            v-model:right_value="formState[item.key[1]]"
        >
        </range-input>
        <a-upload-dragger v-if="item.type === 'upload dragger'"
            name="file"
            :multiple="false"
            :maxCount="1"
            :customRequest="customRequest"
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
import RangeInput from '@/components/rangeInput/rangeInput.vue'
import { Icon } from '@/components/icon'
import { uploadFile, deleteFile } from '@/api/file-controller'

// TODO 上传文件加载问题
export default defineComponent({
  name: 'CUModal',
  components: {
    RangeInput,
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

    const hide = () => {
      loading.value = false
      visible.value = false
      clear()
    }

    const assignValue = (form) => {
      console.log(form)
      for(const prop in form) {
        formState[prop] = form[prop]
      }
    }

    const assignListValue = (form) => {
      console.log(form)
    }
    
    const url = ref(0)
    const customRequest = (file) => {
      const formData = new FormData()
      formData.append('file', file.file)
      uploadFile(formData).then(res => {
        if(url.value !== 0) {
          deleteFile(url.value).then(() => {
            url.value = res
          })
        }
        else {
          url.value = res
        }
      }) 
    }

    const okHandle = () => {
      loading.value = true
      formRef.value.validateFields().then(valid => {
        if (valid) {
          const formData = {}
          for(const prop in formState) {
            formData[prop] = formState[prop]
          }
          formData['syllabusPath'] = url.value
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
      customRequest,
      okHandle,
      cancelHandle,

      show, hide,
      assignValue,
      assignListValue
    }
  },
})
</script>
