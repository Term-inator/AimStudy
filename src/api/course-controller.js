import axios from '@/utils/axios.js'

/**
 * 学生可以选的课的列表
 * @deprecated
 */
export function listChoose(data) {
  return axios({
    url: '/api/course/choose',
    method: 'get',
    params: data
  })
}

/**
 * 学生选课
 */
export function chooseSection(sectionId, data){
  return axios({
    url: `/api/course/choose/${sectionId}`,
    method: 'post',
    data: data
  })
}

/**
 * @deprecated
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
 * 教师/教务删除 course
 */
export function deletePublishCourse(data){
  return axios({
    url: '/api/course/deletePublish',
    method: 'post',
    data: data
  })
}

/**
 * 教师/教务删除 section
 */
export function deletePublishSection(data){
  return axios({
    url: '/api/course/deleteStart',
    method: 'post',
    data: data
  })
}

/**
 * @deprecated
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
 * 教师/教务修改 course
 */
export function modifyPublishCourse(data){
  return axios({
    url: '/api/course/modifyPublish',
    method: 'post',
    data: data
  })
}

/**
 * 教师/教务修改 section
 */
export function modifyPublishSection(data){
  return axios({
    url: '/api/course/modifyStart',
    method: 'post',
    data: data
  })
}

/**
 * 教师发布 course
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
export function quitSection(sectionId, data){
  return axios({
    url: `/api/course/quit/${sectionId}`,
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
 * 系统决定上课学生
 */
export function systemCheck(data){
  return axios({
    url: '/api/course/systemCheck',
    method: 'post',
    data: data
  })
}

/**
 * 教务查看待审核的 course 列表
 */
export function viewPublishCourse(data){
  return axios({
    url: '/api/course/viewPublish',
    method: 'get',
    params: data
  })
}

/**
 * 教务审核 course
 */
export function verifyPublishCourse(data){
  return axios({
    url: '/api/course/verifyPublish',
    method: 'post',
    data: data
  })
}

/**
 * 教务查看待审核的 section 列表
 */
export function viewStartCourse(data){
  return axios({
    url: '/api/course/viewStart',
    method: 'get',
    params: data
  })
}

/**
 * 教务审核 section
 */
export function verifyStartCourse(data){
  return axios({
    url: '/api/course/verifyStart',
    method: 'post',
    data: data
  })
}

/**
 * 教师/教务查看课程池 course
 */
export function viewCoursePool(data){
  return axios({
    url: '/api/course/viewCoursePool',
    method: 'get',
    params: data
  })
}

/**
 * @deprecated
 * 教务查看本学院课程
 */
export function viewDepartmentCourse(data){
  return axios({
    url: '/api/course/viewDepartmentCourse',
    method: 'get',
    params: data
  })
}
