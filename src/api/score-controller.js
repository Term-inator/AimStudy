import axios from '@/utils/axios.js'

/**
 * 教师修改成绩
 */
export function modifyScore(sectionId){
  return axios({
    url: `/api/score/modify/${sectionId}`,
    method: 'post'
  })
}

/**
 * 教师发表成绩
 */
export function publishScore(sectionId, data){
  return axios({
    url: `/api/score/publish/${sectionId}`,
    method: 'post',
    data: data
  })
}

/**
 * 学生查询成绩
 */
export function queryScore(data){
  return axios({
    url: '/api/score/query',
    method: 'post',
    data: data
  })
}

/**
 * 教务查看待审核成绩的课程列表
 */
export function viewVerifyScoreSection(data){
  return axios({
    url: '/api/score/verify',
    method: 'post',
    data: data
  })
}

/**
 * 教务查看某课程的成绩表
 */
export function viewVerifyScore(sectionId){
  return axios({
    url: `/api/score/verify/${sectionId}`,
    method: 'post'
  })
}

/**
 * 教务审核成绩
 */
export function verifyScore(sectionId){
  return axios({
    url: `/api/score/verify/${sectionId}/submit`,
    method: 'post'
  })
}
