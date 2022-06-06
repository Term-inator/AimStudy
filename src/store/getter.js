const getters = {
  getDepartmentById: (state) =>  (departmentId) => {
    return state.constant.departments.find(item => item.id === departmentId)
  }
}

export default getters