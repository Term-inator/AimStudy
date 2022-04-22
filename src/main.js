import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import '@/permission'

const app = createApp(App)

// const components = ["topbar"]
// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.includes('-')
// }

app.use(store).use(store).use(router).use(Antd).mount('#app')
