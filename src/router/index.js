import { createRouter, createWebHashHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const MainView = () => import('../views/mainPage/mainPage.vue')
const LoginView = () => import('../views/login/login.vue')
const CourseQueryView = () => import('../views/courseQuery/courseQuery.vue')
const CourseTableView = () => import('../views/courseTable/courseTable.vue')

const CampusManagementView = () => import('../views/admin/campusManagement/campusManagement.vue')
const MajorManagementView = () => import('../views/admin/majorManagement/majorManagement.vue')
const UserManagementView = () => import('../views/admin/userManagement/userManagement.vue')

const CourseScoreView = () => import('../views/eduAdmin/courseScore/courseScore.vue')
const CoursePoolView = () => import('../views/eduAdmin/coursePool/coursePool.vue')
const OpenCourseManagementView = () => import('../views/eduAdmin/openCourseManagement/openCourseManagement.vue')
const ReleaseCourseManagementView = () => import('../views/eduAdmin/releaseCourseManagement/releaseCourseManagement.vue')
const StudentInfoView = () => import('../views/eduAdmin/studentInfo/studentInfo.vue')
const ScoreManagementView = () => import('../views/eduAdmin/scoreManagement/scoreManagement.vue')
const TeacherInfoView = () => import('../views/eduAdmin/teacherInfo/teacherInfo.vue')

const DropCourseView = () => import('../views/student/dropCourse/dropCourse.vue')
const ScoreQueryView = () => import('../views/student/scoreQuery/scoreQuery.vue')
const SelectCourseView = () => import('../views/student/selectCourse/selectCourse.vue')

const ReleaseCourseView = () => import('../views/teacher/releaseCourse/releaseCourse.vue')
const OpenCourseView = () => import('../views/teacher/openCourse/openCourse.vue')
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
  }
]

export const asyncRoutes = [
  {
    path: '/main',
    name: 'main',
    component: MainView,
    meta: {
      roles: ['admin', 'edu_admin', 'teacher', 'student']
    }
  },
  {
    path: "/courseQuery",
    name: "courseQuery",
    component: CourseQueryView,
    meta: {
      roles: ['admin', 'edu_admin', 'teacher', 'student']
    }
  },
  {
    path: "/courseTable",
    name: "courseTable",
    component: CourseTableView,
    meta: {
      roles: ['admin', 'edu_admin', 'teacher', 'student']
    }
  },
  
  {
    path: '/campusManagement',
    name: 'campusManagement',
    component: CampusManagementView,
  },
  {
    path: '/majorManagement',
    name: 'majorManagement',
    component: MajorManagementView,
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    component: UserManagementView,
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
    path: '/coursePool',
    name: 'coursePool',
    component: CoursePoolView,
    meta: {
      roles: ['edu_admin']
    }
  },
  {
    path: '/openCourseManagement',
    name: 'openCourseManagement',
    component: OpenCourseManagementView,
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
    path: '/scoreManagement',
    name: 'scoreManagement',
    component: ScoreManagementView,
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
    path: '/openCourse',
    name: 'openCourse',
    component: OpenCourseView,
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
