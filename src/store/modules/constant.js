import { listDepartment } from '@/api/department-controller'

const getDefaultState = () => {
  return {
    departments: [],
    departments_select: []
  }
}

const state = getDefaultState()

const mutations = {
  resetState: (state) => {
    Object.assign(state, getDefaultState())
  },
  setDepartments: (state, departments) => {
    state.departments = departments
  },
  setDepartmentsSelect: (state, departments_select) => {
    state.departments_select = departments_select
  }
}

const actions = {
  queryDepartment({ commit }) {
    return new Promise((resolve, reject) => {
      listDepartment({ size: 10000 }).then(response => {
        commit('setDepartments', response.data)
        let departments_select =  response.data.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        commit('setDepartmentsSelect', departments_select)
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