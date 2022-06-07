
const roles = {
  '教务': 2,
  '教师': 3,
  '学生': 4
}

const roles_select = []
for(let role in roles) {
  roles_select.push({
    value: roles[role],
    label: role
  })
}

const getRoleIdByName = (name) => {
  return roles[name]
}

const getRoleNameById = (id) => {
  for(let role in roles) {
    if(roles[role] === id) {
      return role
    }
  }
}

export {
  roles,
  roles_select,
  getRoleIdByName,
  getRoleNameById
}