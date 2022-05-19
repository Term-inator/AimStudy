import { createRouter, createWebHashHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const MainView = () => import('../views/mainPage/mainPage.vue')
const LoginView = () => import('../views/login/login.vue')
const CourseQueryView = () => import('../views/courseQuery/courseQuery.vue')
const CourseTableView = () => import('../views/courseTable/courseTable.vue')

const MajorManagementView = () => import('../views/admin/majorManagement/majorManagement.vue')
const StudentManagementView = () => import('../views/admin/studentManagement/studentManagement.vue')
const TeacherManagementView = () => import('../views/admin/teacherManagement/teacherManagement.vue')

const CourseScoreView = () => import('../views/eduAdmin/courseScore/courseScore.vue')
const ReleaseCourseManagementView = () => import('../views/eduAdmin/releaseCourseManagement/releaseCourseManagement.vue')
const SelectCourseManagementView = () => import('../views/eduAdmin/selectCourseManagement/selectCourseManagement.vue')
const StudentInfoView = () => import('../views/eduAdmin/studentInfo/studentInfo.vue')
const StudentScoreView = () => import('../views/eduAdmin/studentScore/studentScore.vue')
const TeacherInfoView = () => import('../views/eduAdmin/teacherInfo/teacherInfo.vue')

const DropCourseView = () => import('../views/student/dropCourse/dropCourse.vue')
const ScoreQueryView = () => import('../views/student/scoreQuery/scoreQuery.vue')
const SelectCourseView = () => import('../views/student/selectCourse/selectCourse.vue')

const ReleaseCourseView = () => import('../views/teacher/releaseCourse/releaseCourse.vue')
const PublishScore = () => import('../views/teacher/publishScore/publishScore.vue')

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
    path: '/majorManagement',
    name: 'majorManagement',
    component: MajorManagementView,
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/studentManagement',
    name: 'studentManagement',
    component: StudentManagementView,
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/teacherManagement',
    name: 'teacherManagement',
    component: TeacherManagementView,
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/courseScore',
    name: 'courseScore',
    component: CourseScoreView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/releaseCourseManagement',
    name: 'releaseCourseManagement',
    component: ReleaseCourseManagementView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/selectCourseManagement',
    name: 'selectCourseManagement',
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
  },

  {
    path: '/dropCourse',
    name: 'dropCourse',
    component: DropCourseView,
    meta: {
      roles: ['student']
    }
  },
  {
    path: '/scoreQuery',
    name: 'scoreQuery',
    component: ScoreQueryView,
    meta: {
      roles: ['student']
    }
  },
  {
    path: '/selectCourse',
    name: 'selectCourse',
    component: SelectCourseView,
    meta: {
      roles: ['student']
    }
  },
  {
    path: '/releaseCourse',
    name: 'releaseCourse',
    component: ReleaseCourseView,
    meta: {
      roles: ['teacher']
    }
  },
  {
    path: '/publishScore',
    name: 'publishScore',
    component: PublishScore,
    meta: {
      roles: ['teacher']
    }
  }
]

// TODO tmp
constantRoutes.push(...asyncRoutes)
const createMyRouter = () => {
  return createRouter({
      history: createWebHashHistory(),
      routes: constantRoutes
    })
}

const router = createMyRouter()

export function resetRouter() {
  const newRouter = createMyRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
