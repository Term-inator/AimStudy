<template>
  <div class="main">
    <a-card title="登录" class="login" bordered>
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
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="验证码"
          name="captcha"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <a-input v-model:value="formState.captcha" />
        </a-form-item>
        <img :src="captcha" @click="nextCaptcha" style="margin: 0 0 15px 32%; cursor: pointer;" />

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCaptcha } from '@/api/captcha-controller'

export default defineComponent({
  // TODO 忘记密码
  name: "LoginView",
  setup() {
    const store = useStore()
    const router = useRouter()

    const captcha = ref(0)
    const uuid = ref(0)
    getCaptcha().then(res => {
      captcha.value = res.entity
      uuid.value = res.uuid
    })

    const formState = reactive({
      username: '',
      password: '',
      captcha: ''
    })

    const nextCaptcha = () => {
      getCaptcha().then(res => {
        captcha.value = res.entity
        uuid.value = res.uuid
      })
    }

    const onFinish = values => {
      store.dispatch('user/login', {...values, uuid: uuid.value})
      .then(() => {
        store.dispatch('constant/queryConstant')
        router.push('main')
        console.log('Success:', values)
      })
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      captcha,
      nextCaptcha,
      formState,
      onFinish,
      onFinishFailed,
    }
  },
})
</script>

<style scoped>
  .main {
    display: flex;
    height: 100vh;
    background: url(@/assets/img/background656x432.jpeg) no-repeat;
    background-size: 100% 100%;
    align-items: center;
    justify-content: center;
  }

  .login {
    width: 40vw;
    height: flex;
  }
</style>
