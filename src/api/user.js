// 模拟数据用户信息
const usersInfo = {
  admin: {
    name: 'admin',
    roles: ['admin']
  },
  teacher: {
    name: 'teacher',
    roles: ['teacher']
  }
}

export function login(data) {
  // 模拟后台返回数据
  return new Promise(resolve => resolve(
    {
      msg: 'ok',
      token: usersInfo[data.username] && data.username
    }
  ));
  // return request({
  //   url: '/users/login',
  //   method: 'post',
  //   data
  // })
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
