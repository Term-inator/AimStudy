// 模拟数据用户信息
const usersInfo = {
  admin: {
    name: 'admin',
    id: '123456789',
    department: '计算机科学与技术学院',
    roles: ['admin']
  },
  edu_admin: {
    name: 'edu_admin',
    id: '123456789',
    department: '计算机科学与技术学院',
    roles: ['edu_admin']
  },
  teacher: {
    name: 'teacher',
    id: '123456789',
    department: '计算机科学与技术学院',
    roles: ['teacher']
  },
  student: {
    name: 'student',
    id: '123456789',
    department: '计算机科学与技术学院',
    roles: ['student']
  }
}

import axios from '@/utils/axios'

export function login(data) {
  // 模拟后台返回数据
  // return new Promise(resolve => resolve(
  //   {
  //     msg: 'ok',
  //     token: usersInfo[data.username] && data.username
  //   }
  // ));
  // return request({
  //   url: '/users/login',
  //   method: 'post',
  //   data
  // })
  return axios({
    url: '/users/login-password',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  // 模拟后台返回数据
  return new Promise(resolve => resolve(
    {
      userInfo: usersInfo[username]
    }
  ));
  // return request({
  //   url: '/users/userinfo',
  //   method: 'get'
  // })
}

export function logout() {
  return new Promise(resolve => resolve());
  // return request({
  //   url: '/users/logout',
  //   method: 'post'
  // })
}
