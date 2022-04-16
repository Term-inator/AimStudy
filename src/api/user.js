
// 模拟数据路由表
const routesMaps = {
  admin: [
    {
        path: '/',
        children: [
            {
                path: 'dashboard'
            }
        ]
    },
    {
        path: '/example',
        children: [
            {
                path: 'table'
            },
            {
                path: 'tree'
            }
        ]
    },
    {
        path: '/form',
        children: [
            {
                path: 'index'
            }
        ]
    },
    {
        path: '/nested',
        children: [
            {
                path: 'menu1',
                children: [
                    {
                        path: 'menu1-1'
                    },
                    {
                        path: 'menu1-2',
                        children: [
                            {
                                path: 'menu1-2-1'
                            },
                            {
                                path: 'menu1-2-2'
                            }
                        ]
                    },
                    {
                        path: 'menu1-3'
                    }
                ]
            },
            {
                path: 'menu2'
            }
        ]
    },
    {
        path: 'external-link',
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/'
            }
        ]
    }
  ],
  editor: [
    {
      path: '/',
      children: [
          {
              path: 'dashboard'
          }
      ]
    },
    {
      path: '/example',
      children: [
          {
              path: 'table'
          },
          {
              path: 'tree'
          }
      ]
  },
  ]
}

// 模拟数据用户信息
const usersInfo = {
  admin: {
    nickname: 'admin',
    portrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3636641334,72781070&fm=26&gp=0.jpg'
  },
  editor: {
    nickname: 'editor',
    portrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3636641334,72781070&fm=26&gp=0.jpg'
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
      userInfo: usersInfo[username],
      routesMap: routesMaps[username]
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
