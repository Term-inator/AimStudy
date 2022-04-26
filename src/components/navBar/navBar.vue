<template>
  <div class="page-wrapper">
    <div class="menu-wrapper" ref="menu_wrapper">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        style="height: 100%; padding: 10vh 0 0 0; box-shadow: 6px 0 6px #888888;"
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
    </div>
  
    <div class="right-part">
      <top-bar>
        <template #close_menu>
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="toggleCollapsed"/>
          <MenuFoldOutlined v-else class="trigger" @click="toggleCollapsed"/>
        </template>
      </top-bar>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Icon } from "@/components/icon"
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
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
  icon: "PieChartOutlined",
  route: "main"
}

const admin = [
  main_page,
  {
    key: "2",
    title: "学生管理",
    icon: "PieChartOutlined",
    route: "studentManagement"
  },
  {
    key: "3",
    title: "教师管理",
    icon: "PieChartOutlined",
    route: "teacherManagement"
  },
  {
    key: "4",
    title: "专业管理",
    icon: "PieChartOutlined",
    route: "majorManagement"
  }
]

const course_query = {
  key: "course_query",
  title: "全校开课查询",
  icon: "PieChartOutlined",
  route: "courseQuery"
}

const edu_admin = [
  main_page,
  {
    key: "2",
    title: "学生信息",
    icon: "PieChartOutlined",
    route: "studentInfo"
  },
  {
    key: "3",
    title: "教师信息",
    icon: "PieChartOutlined",
    route: "teacherInfo"
  },
  {
    key: "4",
    title: "课程管理",
    icon: "PieChartOutlined",
    route: "releaseCourseManagement",
    children: [
      course_query,
      {
        key: "4.2",
        title: "开课管理",
        icon: "PieChartOutlined",
        route: "releaseCourseManagement"
      },
      {
        key: "4.3",
        title: "选课管理",
        icon: "PieChartOutlined",
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
  icon: "PieChartOutlined",
  route: "courseTable"
}

const teacher = [
  main_page,
  {
    key: "2",
    title: "课程",
    icon: "PieChartOutlined",
    children: [
      course_query,
      {
        key: "2.2",
        title: "发布课程",
        icon: "PieChartOutlined",
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
    icon: "PieChartOutlined",
    children: [
      course_query,
      {
        key: "2.2",
        title: "选课",
        icon: "PieChartOutlined",
        route: "selectCourse"
      },
      {
        key: "2.3",
        title: "退课",
        icon: "PieChartOutlined",
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

export default defineComponent({
  name: "navBar",
  components: {
    Icon,
    "sub-menu": SubMenu,
    topBar,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },

  setup() {
    const router = useRouter()
    const store = useStore()

    const reference = {
      menu_wrapper: null,
    }

    const state = reactive({
      role: store.state.user.roles[0],
      collapsed: false,
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
      reference.menu_wrapper.style.width = state.collapsed ? '70px' : '256px'
    }

    const menuItems = menus[state.role]
    return {
      ...toRefs(reference),
      menuItems,
      ...toRefs(state),
      toggleCollapsed,
      goto
    }
  },

})
</script>

<style scoped>
  .page-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .right-part {
    height: 100vh;
    flex: 1;
  }

  .menu-wrapper {
    width: 256px;
    height: 100vh;
    transition: width 0.5s;
  }

  .top-bar {
    width: 100%;
    height: 10vh;
  }

  .content {
    position: relative;
    height: 90vh;
    margin: 0 0 0 5px;
    padding: 1vh 0 0 1vw;
    overflow-y: scroll;
  }

  .trigger :hover {
    color: #1890ff;
    transition: color 0.3s;
  }
</style>