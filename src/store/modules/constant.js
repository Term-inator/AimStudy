import { listDepartment } from '@/api/department-controller'
import { listCampusLocation } from '@/api/campus-location-controller'

const getDefaultState = () => {
  return {
    departments: [],
    departments_select: [],
    departments_name_select: [],
    campus_locations: [],
    campus_locations_select: [],
    campus_locations_name_select: []
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
  setDepartmentsNameSelect: (state, departments_name_select) => {
    state.departments_name_select = departments_name_select
  },
  setCampusLocations: (state, campus_locations) => {
    state.campus_locations = campus_locations
  },
  setCampusLocationsSelect: (state, campus_locations_select) => {
    state.campus_locations_select = campus_locations_select
  },
  setCampusLocationsNameSelect: (state, campus_locations_name_select) => {
    state.campus_locations_name_select = campus_locations_name_select
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
        let departments_name_select = response.data.map(item => {
          return {
            value: item.name,
            label: item.name
          }
        })
        commit('setDepartmentsSelect', departments_select)
        commit('setDepartmentsNameSelect', departments_name_select)
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
        let campus_name_select = response.map(item => {
          return {
            value: item.name,
            label: item.name
          }
        })
        commit('setCampusLocationsSelect', campus_locations_select)
        commit('setCampusLocationsNameSelect', campus_name_select)
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