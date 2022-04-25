import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/mainPage/mainPage.vue'
import LoginView from '../views/login/login.vue'
import CourseQueryView from '../views/courseQuery/courseQuery.vue'
import CourseTableView from '../views/courseTable/courseTable.vue'

import CourseScoreView from '../views/eduAdmin/courseScore/courseScore.vue'
import OpenCourseManagementView from '../views/eduAdmin/openCourseManagement/openCourseManagement.vue'
import SelectCourseManagementView from '../views/eduAdmin/selectCourseManagement/selectCourseManagement.vue'
import StudentInfoView from '../views/eduAdmin/studentInfo/studentInfo.vue'
import StudentScoreView from '../views/eduAdmin/studentScore/studentScore.vue'
import TeacherInfoView from '../views/eduAdmin/teacherInfo/teacherInfo.vue'

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
  },
  {
    path: "/courseQuery",
    name: "courseQuery",
    component: CourseQueryView
  },
  {
    path: "/courseTable",
    name: "courseTable",
    component: CourseTableView
  }
]

export const asyncRoutes = [
  {
    path: '/courseScore',
    name: 'courseScore',
    component: CourseScoreView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/openCorseManagement',
    name: 'openCorseManagement',
    component: OpenCourseManagementView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/selectCorseManagement',
    name: 'selectCorseManagement',
    component: SelectCourseManagementView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/studentInfo',
    name: 'studentInfo',
    component: StudentInfoView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/studentScore',
    name: 'studentScore',
    component: StudentScoreView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/teacherInfo',
    name: 'teacherInfo',
    component: TeacherInfoView,
    meta: {
      roles: ['edu_admin']
    }
  }
]
// TODO tmp
constantRoutes.push(...asyncRoutes)
const router = createRouter({
  history: createWebHashHistory(),
//   routes
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
