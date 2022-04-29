<template>
  <a-row :gutter="10">
    <a-col :span="10">
      <a-input size="small" v-model:value="left" @change="leftValChange(left)"></a-input>
    </a-col>
    <a-col :span="4" style="text-align: center;">—</a-col>
    <a-col :span="10">
      <a-input size="small" v-model:value="right" @change="rightValChange(right)"></a-input>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({left: '', right: ''}),
      required: true
    }
  },
  setup(props, { emit }) {
    const state = reactive(props.value)

    watch(() => props.value, () => {
      state.left = props.value.left
      state.right = props.value.right
    })

    const leftValChange = (val) => {
      emit('update:value', {left: val, right: state.right})
    }

    const rightValChange = (val) => {
      emit('update:value', {left: state.left, right: val})
    }

    return {
      ...toRefs(state),
      leftValChange,
      rightValChange
    }
  },
})
</script>
