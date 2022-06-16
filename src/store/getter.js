const getters = {
  getDepartmentById: (state) =>  (departmentId) => {
    return state.constant.departments.find(item => item.id === departmentId)
  },
  getCampusLocationIdByName: (state) => (campusLocationName) => {
    return state.constant.campus_locations.find(item => item.name === campusLocationName).id
  }
}

export default getters