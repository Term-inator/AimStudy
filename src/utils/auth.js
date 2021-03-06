import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('auth: ' + token)
  return Cookies.set(TokenKey, token, { expires: 2/(24) })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}