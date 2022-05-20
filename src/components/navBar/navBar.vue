<template>
  <template v-if="$store.state.user.token !== undefined && $store.state.user.token !== ''">
    <a-layout has-sider>
      <a-layout-sider
        v-model:collapsed="collapsed" :trigger="null" collapsible
        :style="{ position: 'fixed',
                  left: 0, top: 0, bottom: 0,
                  height: '100vh',
                  zIndex: 2, 
                  overflow: 'auto', 
                  boxShadow: '6px 0 6px #888888' ,
                  transition: 'all 0.3s'
        }"
      >
        <div class="logo"></div>
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="dark"
        >
          <template v-for="item in menuItems" :key=item.key>
            <template v-if="!item.children">
              <a-menu-item :key=item.key @click="goto(item.route)">
                <template #icon>
                  <Icon :icon="item.icon"></Icon>
                </template>
                <span>{{ item.title }}</span>
              </a-menu-item>
            </template>
            <template v-else>
              <sub-menu :key="item.key" :menu-info="item" @goto="goto" />
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout :style="right_side_style">
        <a-layout-header 
          :style="header_style"
        >
          <top-bar :style="top_bar_style">
            <template #close_menu>
              <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="toggleCollapsed"
              />
              <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
            </template>
          </top-bar>
        </a-layout-header>
        <a-layout-content :style="{ margin: '64px 16px 0 16px', overflow: 'initial' }">
          <router-view/>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          AimStudy ©2022
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
  <template v-else>
    <router-view/>
  </template>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Icon } from "@/components/icon"
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import topBar from "@/components/navBar/topBar.vue"

const SubMenu = {
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon>
        <Icon :icon="menuInfo.icon"></Icon>
      </template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key" @click="goto(item.route)">
            <template #icon>
              <Icon :icon="item.icon"></Icon>
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {
    Icon
  },
  setup(props, context) {
    const goto = (route) => {
      context.emit("goto", route)
    }
    return {
      goto
    }
  }
}

const main_page = {
  key: "main_page",
  title: "首页",
  icon: "HomeOutlined",
  route: "main"
}

const admin = [
  main_page,
  {
    key: "2",
    title: "学生管理",
    icon: "TeamOutlined",
    route: "studentManagement"
  },
  {
    key: "3",
    title: "教师管理",
    icon: "SolutionOutlined",
    route: "teacherManagement"
  },
  {
    key: "4",
    title: "专业管理",
    icon: "ProfileOutlined",
    route: "majorManagement"
  }
]

const course_query = {
  key: "course_query",
  title: "全校开课查询",
  icon: "SearchOutlined",
  route: "courseQuery"
}

const edu_admin = [
  main_page,
  {
    key: "2",
    title: "学生信息",
    icon: "TeamOutlined",
    route: "studentInfo"
  },
  {
    key: "3",
    title: "教师信息",
    icon: "SolutionOutlined",
    route: "teacherInfo"
  },
  {
    key: "4",
    title: "课程管理",
    icon: "AppstoreOutlined",
    route: "releaseCourseManagement",
    children: [
      course_query,
      {
        key: "4.2",
        title: "开课管理",
        icon: "ReadOutlined",
        route: "releaseCourseManagement"
      },
      {
        key: "4.3",
        title: "选课管理",
        icon: "SelectOutlined",
        route: "selectCourseManagement"
      }
    ]
  },
  {
    key: "5",
    title: "成绩管理",
    icon: "PieChartOutlined",
    route: "courseScore"
  }
]

const course_table = {
  key: "course_table",
  title: "我的课表",
  icon: "TableOutlined",
  route: "courseTable"
}

const teacher = [
  main_page,
  {
    key: "2",
    title: "课程",
    icon: "AppstoreOutlined",
    children: [
      course_query,
      {
        key: "2.2",
        title: "发布课程",
        icon: "ReadOutlined",
        route: "releaseCourse"
      },
      course_table
    ]
  },
  {
    key: "3",
    title: "成绩",
    icon: "PieChartOutlined",
    route: "publishScore"
  }
]

const student = [
  main_page,
  {
    key: "2",
    title: "课程",
    icon: "AppstoreOutlined",
    children: [
      course_query,
      {
        key: "2.2",
        title: "选课",
        icon: "SelectOutlined",
        route: "selectCourse"
      },
      {
        key: "2.3",
        title: "退课",
        icon: "ExportOutlined",
        route: "dropCourse"
      },
      course_table
    ]
  },
  {
    key: "3",
    title: "成绩",
    icon: "PieChartOutlined",
    route: "scoreQuery"
  }
]

const menus = {
  "admin": admin,
  "edu_admin": edu_admin,
  "teacher": teacher,
  "student": student
}

const menu_expand_width = 200
const menu_collapse_width = 81.9

export default defineComponent({
  name: "navBar",
  components: {
    Icon,
    "sub-menu": SubMenu,
    topBar,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },

  setup() {
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      collapsed: false,
      right_side_style: {
        width: "100%",
        margin: " 0 0 0 200px",
        transition: "margin 0.3s"
      },
      header_style: {
        position: 'fixed', 
        width: `${window.innerWidth - 200}px`,
        height: '64px',
        background: '#fff', 
        padding: 0, 
        zIndex: 1, 
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.4)',
        transition: 'width 0.3s'
      },
      top_bar_style: {
        position: 'fixed',
        left: '200px', 
        right: 0,
        height: 'inherit',
        backgroundColor: 'white',
        transition: 'left 0.3s'
      },
      selectedKeys: ['main_page'],
      openKeys: [],
      preOpenKeys: [],
    })
    
    watch(() => state.openKeys, (_val, oldVal) => {
      state.preOpenKeys = oldVal
    })

    const goto = (route) => {
      router.push(route)
    }

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
      state.openKeys = state.collapsed ? [] : state.preOpenKeys
      state.right_side_style.margin = state.collapsed ? `0 0 0 ${menu_collapse_width}px` : `0 0 0 ${menu_expand_width}px`
      state.header_style.width = state.collapsed ? `${window.innerWidth - menu_collapse_width}px` : `${window.innerWidth - menu_expand_width}px`
      state.top_bar_style.left = state.collapsed ? `${menu_collapse_width}px` : `${menu_expand_width}px`
    }

    const menuItems = ref([])
    watch(() => store.state.user.roles, () => {
      menuItems.value = menus[store.state.user.roles[0]]
    })

    return {
      menuItems,
      ...toRefs(state),
      toggleCollapsed,
      goto
    }
  },

})
</script>

<style scoped>
  .logo {
    height: 32px;
    background: #001529;
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger :hover {
    color: #1890ff;
    transition: color 0.3s;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }

  .content {
    position: relative;
    max-width: 85vw;
    height: 89vh;
    margin: 10vh 0 0 0;
    padding: 1vh 1vw 1vh 1vw;
  }

</style>