import { listDepartment } from '@/api/department-controller'

const getDefaultState = () => {
  return {
    departments: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_MAJORS: (state, departments) => {
    state.departments = departments
  }
}

const actions = {
  queryDepartment({ commit }) {
    return new Promise((resolve, reject) => {
      listDepartment({ size: 10000 }).then(response => {
        let departments =  response.data.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        commit('SET_MAJORS', departments)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  queryConstant({ dispatch }) {
    dispatch('queryDepartment')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}