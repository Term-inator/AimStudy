import axios from '@/utils/axios.js'

/**
 * 学生选课
 */
export function chooseSection(data){
  return axios({
    url: '/api/course/choose',
    method: 'post',
    data: data
  })
}

/**
 * 教务删除课程
 */
export function deleteSection(data){
  return axios({
    url: '/api/course/delete',
    method: 'post',
    data: data
  })
}

/**
 * 教务修改课程
 */
export function modifyCourse(data){
  return axios({
    url: '/api/course/modify',
    method: 'post',
    data: data
  })
}

/**
 * 教师发布课程
 */
export function publishCourse(data){
  return axios({
    url: '/api/course/publish',
    method: 'post',
    data: data
  })
}

/**
 * 全校开课查询
 */
export function queryCourse(data){
  return axios({
    url: '/api/course/query',
    method: 'get',
    params: data
  })
}

/**
 * 学生退课
 */
export function quitSection(data){
  return axios({
    url: '/api/course/quit',
    method: 'post',
    data: data
  })
}

/**
 * 教师开课
 */
export function startCourse(data){
  return axios({
    url: '/api/course/start',
    method: 'post',
    data: data
  })
}

/**
 * 教务审核发布课程
 */
export function verifyPublishCourse(data){
  return axios({
    url: '/api/course/verifyPublish',
    method: 'post',
    data: data
  })
}

/**
 * 教务审核开设课程
 */
export function verifyStartCourse(data){
  return axios({
    url: '/api/course/verifyStart',
    method: 'post',
    data: data
  })
}

/**
 * 教师查看课程池
 */
export function viewCoursePool(data){
  return axios({
    url: '/api/course/viewCoursePool',
    method: 'post',
    data: data
  })
}

/**
 * 教务查看本学院课程
 */
export function viewDepartmentCourse(data){
  return axios({
    url: '/api/course/viewDepartmentCourse',
    method: 'post',
    data: data
  })
}
