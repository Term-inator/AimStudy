import { loginPassword, logout, getCurrentUserInfo } from '@/api/user-controller'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    id: '',
    departmentName: '',
    departmentId: '',
    enrollmentYear: '',
    email: '',
    phone: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    console.log('set token: ' + token)
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_DEPARTMENT_ID: (state, departmentId) => {
    state.departmentId = departmentId
  },
  SET_DEPARTMENT_NAME: (state, departmentName) => {
    state.departmentName = departmentName
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ENROLLMENT_YEAR: (state, enrollmentYear) => {
    state.enrollmentYear = enrollmentYear
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginPassword({ username: username.trim(), password: password }).then(() => {
        if (getToken()) {
          commit('SET_TOKEN', getToken())
          // setToken(response.token)
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
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      //调用api/user 里面的getInfo方法获取用户信息和权限信息
      getCurrentUserInfo().then(response => {
        if (!response) {
          return reject('验证失败，请重新登录')
        }

        const { 
          realName, userId, 
          departmentId, departmentName, 
          enrollmentYear, 
          email, phone,
          role } = response
        let roles = []
        switch (role) {
          case 1:
            roles = ['admin']
            break
          case 2:
            roles = ['edu_admin']
            break
          case 3:
            roles = ['teacher']
            break
          case 4:
            roles = ['student']
            break
          default:
            roles = []
        }

        // roles must be a non-empty array
        // roles必须是一个数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        //把roles存入到store
        commit('SET_ROLES', roles)
        commit('SET_NAME', realName)
        commit('SET_ID', userId)
        commit('SET_DEPARTMENT_ID', departmentId)
        commit('SET_DEPARTMENT_NAME', departmentName)
        commit('SET_ENROLLMENT_YEAR', enrollmentYear)
        commit('SET_EMAIL', email)
        commit('SET_PHONE', phone)

        // 适配接口返回的数据
        response.roles = roles
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        commit('RESET_STATE')

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
    accessRoutes.forEach(route => {
      router.addRoute(route)
    })

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

