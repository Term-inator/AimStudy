import axios from '@/utils/axios.js'

/**
 * 获取验证码
 */
export function getCaptcha(){
  return axios({
    url: '/api/captcha',
    method: 'get'
  })
}
