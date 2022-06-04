import axios from '@/utils/axios.js'

/**
 * 用户更新个人信息
 */
export function updateUserInfo(data){
  return axios({
    url: '/api/user',
    method: 'put',
    data: data
  })
}

/**
 * 忘记密码
 */
export function forgetPassword(data){
  return axios({
    url: '/api/user/forget-password',
    method: 'post',
    data: data
  })
}

/**
 * 获取当前用户信息
 */
export function getCurrentUserInfo(){
  return axios({
    url: '/api/user/info',
    method: 'get'
  })
}

/**
 * 用户邮箱登录
 */
export function loginEmail(data){
  return axios({
    url: '/api/user/login-email',
    method: 'post',
    data: data
  })
}

/**
 * 用户密码登录
 */
export function loginPassword(data){
  return axios({
    url: '/api/user/login-password',
    method: 'post',
    data: data
  })
}

/**
 * 用户退出登录
 */
export function logout(){
  return axios({
    url: '/api/user/logout',
    method: 'post'
  })
}

/**
 * 用户重置密码
 */
export function resetPassword(data){
  return axios({
    url: '/api/user/reset-password',
    method: 'post',
    data: data
  })
}
