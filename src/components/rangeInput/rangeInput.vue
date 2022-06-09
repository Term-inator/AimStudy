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
    left_value: {
      type: Number,
      required: true
    },
    right_value: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      left: props.left_value,
      right: props.right_value
    })

    watch(() => props.left_value, () => {
      state.left = props.left_value
    })

    watch(() => props.right_value, () => {
      state.right = props.right_value
    })

    const leftValChange = (val) => {
      state.left = val
      emit('update:left_value', state.left)
    }

    const rightValChange = (val) => {
      state.right = val
      emit('update:right_value', state.right)
    }

    return {
      ...toRefs(state),
      leftValChange,
      rightValChange
    }
  },
})
</script>
