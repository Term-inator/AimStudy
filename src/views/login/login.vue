<template>
  <div class="main">
    <a-card title="登录" :bordered="false" class="login">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "LoginView",
  setup() {
    const store = useStore()
    const router = useRouter()

    const formState = reactive({
      username: '',
      password: ''
    })

    const onFinish = values => {
      console.log('Success:', values)
      store.commit('user/SET_TOKEN', 111)
      store.commit('user/setUser', {
        name: '张三',
        id: '123456789',
        department: '计算机科学与技术学院',
        roles: ['student']
        // admin edu_admin teacher student
      })
      router.push('/main')
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      onFinish,
      onFinishFailed,
    }
  },
})
</script>

<style scoped>
 .main {
   height: 100vh;
 }

 .login {
   transform: translateY(50%);
 }
</style>
