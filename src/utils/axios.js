import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'

const TOKEN_HEADER = 'x-auth-token'

const _axios = axios.create({
  baseURL: 'https://aimstudy.neptu.cn/api/',
  // baseURL: 'http://localhost/api/',
  headers: {
    'Content-Type': 'application/json'
  },
});
// _axios.defaults.adapter = adapter

// const getParamsSerializer = params => qs.stringify(params,{indices:false})
// 请求拦截器
_axios.interceptors.request.use(
  function success(config) {
    const token = getToken()
    // 添加用户token
    config.headers[TOKEN_HEADER] = token
    // get请求格式化(具体根据后端接口参数要求)
    // if(config.method.toLowerCase() === 'get'){
    //   config.paramsSerializer = getParamsSerializer
    // }
    return config
  },
  function fail(error) {
    console.log(error)
    return Promise.reject(error)
  }
)

function checkToken(response){
  const token = response.headers[TOKEN_HEADER]
  setToken(token)
}

// 响应拦截器
_axios.interceptors.response.use(
  function success(response) {
    checkToken(response);
    const data = response.data
    console.log(data)
    return data.data || data;
  },
  function fail(error) {
    const resp = error.response
    if(!resp){
      console.log('网络请求失败')
      return Promise.reject(error)
    } 
    else {
      checkToken(resp)
    }
    if(resp.status === 401){
      // todo login
      console.log('请先登录')
    } else if(resp.status === 403){
      console.log('对不起，你没有权限进行此操作')
    } else {
      if(resp.data.message){
        console.log(resp.data.message)
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default _axios