const year_semester = (() => {
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  if(month >= 2 && month <= 7) {
    return {
      year: year - 1,
      semester: 2
    }
  }
  return {
    year: year,
    semester: 1
  }
})()


const getSelectFromMap = (map) => {
  let select = []
  for(let key in map) {
    select.push({
      value: parseInt(key),
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

/**
 * 年份选择
 * @param {Number} left 左 left 年
 * @param {Number} right 右 right 年
 */
const yearSelectGen = (left, right) => {
  let tmp = []
  for(let i = left; i <= right; ++i) {
    tmp.push(i)
  }
  let res = []
  let year = new Date().getFullYear()
  for(let i = 0; i < right - left + 1; ++i) {
    res.push({
      value: year + tmp[i],
      label: year + tmp[i]
    })
  }
  return res
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
const year_select = yearSelectGen(-5, 0)

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
const getNumberByDay = getKeyByValue(dayMap)

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
const getNumberByCourseType = getKeyByValue(courseTypeMap)

// 审核状态
const UNAUDITED = 1
const PASS = 2
const FAIL = 3
const DELETED = 4
const statusMap = {
  UNAUDITED: '待审核',
  PASS: '审核通过',
  FAIL: '审核未通过',
  DELETED: '已删除'
}
const getStatusByNumber = getValueByKey(statusMap)

// 开课学年
const open_year_select = yearSelectGen(-1, 2)

// 面向年级
const open_for_select = yearSelectGen(-3, 1)

// 教学楼
const building = ['一教', '二教', '三教', '四教']

// 教室
const classroom = []
for(let i = 1; i <= 5; ++i) {
  for(let j = 1; j <= 2; ++j) {
    for(let k = 0; k <= 9; ++k) {
      classroom.push(`${i}${j}${k}`)
    }
  }
}

const building_classroom_select = []
for(let b in building) {
  for(let c in classroom) {
    building_classroom_select.push({
      value: `${building[b]}${classroom[c]}`,
      label: `${building[b]}${classroom[c]}`
    })
  }
}

const weekMap = {
  1: '第一周',
  2: '第二周',
  3: '第三周',
  4: '第四周',
  5: '第五周',
  6: '第六周',
  7: '第七周',
  8: '第八周',
  9: '第九周',
  10: '第十周',
  11: '第十一周',
  12: '第十二周',
  13: '第十三周',
  14: '第十四周',
  15: '第十五周',
  16: '第十六周',
  17: '第十七周',
  18: '第十八周'
}
const week_select = getSelectFromMap(weekMap)
const getWeekByNumber = getValueByKey(weekMap)

export {
  year_semester,

  roles,
  roles_select,
  getRoleIdByName,
  getRoleNameById,

  year_select, 
  open_year_select, open_for_select,
  semester_select, getSemesterByNumber,
  day_select, getDayByNumber, getNumberByDay,
  section_select, getSectionByNumber,

  course_type_select, getCourseTypeByNumber, getNumberByCourseType,
  building_classroom_select,

  week_select, getWeekByNumber,

  UNAUDITED, PASS, FAIL, DELETED,
  getStatusByNumber
}