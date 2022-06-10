const getSelectFromMap = (map) => {
  let select = []
  for(let key in map) {
    select.push({
      value: key,
      label: map[key]
    })
  }
  return select
}

const getValueByKey = (map) => {
  return (key) => {
    return map[key]
  }
}

const getKeyByValue = (map) => {
  return (value) => {
    for(let key in map) {
      if(map[key] === value) {
        return key
      }
    }
  }
}

// 角色
const roles = {
  2: '教务',
  3: '教师',
  4: '学生'
}
const roles_select = getSelectFromMap(roles)
const getRoleNameById = getValueByKey(roles)
const getRoleIdByName = getKeyByValue(roles)

// 学年
const year_select = []
let year = new Date().getFullYear()
for(let i = 0; i < 6; i++) {
  year_select.push({
    value: year - i,
    label: year - i
  })
}

// 学期
const semesterMap = {
  1: '第一学期',
  2: '第二学期'
}
const semester_select = getSelectFromMap(semesterMap)
const getSemesterByNumber = getValueByKey(semesterMap)

// 星期
const dayMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}
const day_select = getSelectFromMap(dayMap)
const getDayByNumber = getValueByKey(dayMap)

// 小节
const sectionMap = {
  1: '第一节',
  2: '第二节',
  3: '第三节',
  4: '第四节',
  5: '第五节',
  6: '第六节',
  7: '第七节',
  8: '第八节',
  9: '第九节',
  10: '第十节',
  11: '第十一节',
  12: '第十二节',
  13: '第十三节',
  14: '第十四节',
}
const section_select = getSelectFromMap(sectionMap)
const getSectionByNumber = getValueByKey(sectionMap)

const courseTypeMap = {
  1: '专业必修',
  2: '专业选修',
  3: '通识'
}
const course_type_select = getSelectFromMap(courseTypeMap)
const getCourseTypeByNumber = getValueByKey(courseTypeMap)

export {
  roles,
  roles_select,
  getRoleIdByName,
  getRoleNameById,

  year_select,
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber,
  section_select, getSectionByNumber,

  course_type_select, getCourseTypeByNumber
}