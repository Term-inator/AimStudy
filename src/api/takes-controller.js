import axios from '@/utils/axios.js'

/**
 * 学生已选的课程列表
 */
export function listChoose(data) {
  return axios({
    url: '/api/takes/choose',
    method: 'get',
    params: data
  })
}

/**
 * 选某门课的学生
 */
export function listStudents(data) {
  console.log(data)
  return new Promise((resolve) => {
    resolve({data: [
      {
        realName: 'student',
        studentId: '10202216001'
      }
    ]})
  })
}