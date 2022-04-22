import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    id: '',
    department: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  setUser: (state, user) => {
    state.name = user.name
    state.id = user.id
    state.department = user.department
    state.roles = user.roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.token) {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve()
        } else {
          // Message({
          //   message: '账号或密码错误',
          //   type: 'error',
          //   duration: 5 * 1000
          // })
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //调用api/user 里面的getInfo方法获取用户信息和权限信息
      getInfo(state.token).then(response => {
        if (!response.userInfo) {
          return reject('验证失败，请重新登录')
        }

        const { name, id, department, roles } = response.userInfo

        // roles must be a non-empty array
        // roles必须是一个数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        //把roles存入到store
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_ID', id)
        commit('SET_DEPARTMENT', department)
        resolve(response.userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    // dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

