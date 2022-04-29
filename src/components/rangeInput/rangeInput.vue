<template>
  <a-row :gutter="10">
    <a-col :span="10">
      <a-input size="small" v-model:value="state.left" @change="leftValChange(state.left)"></a-input>
    </a-col>
    <a-col :span="4" style="text-align: center;">—</a-col>
    <a-col :span="10">
      <a-input size="small" v-model:value="state.right" @change="rightValChange(state.right)"></a-input>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({left: '', right: ''}),
      required: true
    }
  },
  setup(props, { emit }) {
    const state = ref(props.value)

    watch(() => props.value, () => {
      console.log(props.value)
      state.value.left = props.value.left
      state.value.right = props.value.right
    })

    const leftValChange = (val) => {
      emit('update:value', {left: val, right: state.value.right})
    }

    const rightValChange = (val) => {
      emit('update:value', {left: state.value.left, right: val})
    }

    return {
      state,
      leftValChange,
      rightValChange
    }
  },
})
</script>
