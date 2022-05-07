<template>
  <a-row>
    <a-col :span="4">
      <a-switch v-model:checked="isNotEmpty" size="small" @change="toggleSwitch"/>
    </a-col>
    <a-col :span="18" :offset="2">
      <a-input size="small" v-model:value="state.value" :disabled="!isNotEmpty" @input="valChange(state.value)"></a-input>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: "NullableInput",
  props: {
    value: {
      type: Object,
      default: () => ({isEmpty: true, value: ''}),
      required: true
    }
  },
  setup(props, { emit, expose }) {
    const isNotEmpty = ref(true)
    const state = ref(props.value)

    const toggleSwitch = () => {
      emit('update:value', {isEmpty: !isNotEmpty.value, value: ''})
    }

    watch(() => props.value, () => {
      state.value = props.value
    })

    const valChange = (val) => {
      if(isNotEmpty.value) {
        emit('update:value', {isEmpty: false, value: val})
      }
      else {
        emit('update:value', {isEmpty: true, value: ''})
      }
    }

    const reset = () => {
      isNotEmpty.value = true
    }
    expose({
      reset
    })

    return {
      isNotEmpty,
      toggleSwitch,
      state,
      valChange,
    }
  },
})
</script>
