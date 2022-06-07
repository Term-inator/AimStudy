import { listDepartment } from '@/api/department-controller'
import { listCampusLocation } from '@/api/admin-campus-location-controller'

const getDefaultState = () => {
  return {
    departments: [],
    departments_select: [],
    campus_locations: [],
    campus_locations_select: [],
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
  },
  setCampusLocations: (state, campus_locations) => {
    state.campus_locations = campus_locations
  },
  setCampusLocationsSelect: (state, campus_locations_select) => {
    state.campus_locations_select = campus_locations_select
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

  queryCampusLocation({ commit }) {
    return new Promise((resolve, reject) => {
      listCampusLocation({ size: 10000 }).then(response => {
        commit('setCampusLocations', response)
        let campus_locations_select =  response.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        commit('setCampusLocationsSelect', campus_locations_select)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  queryConstant({ dispatch }) {
    dispatch('queryDepartment')
    dispatch('queryCampusLocation')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}