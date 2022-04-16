import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
]

export const asyncRoutes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      roles: ['admin', 'edu_admin', 'teacher']
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
//   routes
  router: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
