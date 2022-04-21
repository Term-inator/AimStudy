<template>
  <div class="pageWrapper">
    <a-button type="primary" style="display: none; margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      style="width: 256px; height: 100vh; padding: 10vh 0 0 0;"
    >
      <template v-for="item in menuItems" :key=item.key>
        <template v-if="!item.children">
          <a-menu-item :key=item.key>
            <template #icon>
              <Icon :icon="item.icon"></Icon>
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { Icon } from "@/components/icon"
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

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
          <a-menu-item :key="item.key">
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
}

const main_page = {
  key: "main_page",
  title: "首页",
  icon: "PieChartOutlined"
}

const admin = [
  main_page,
  {
    key: "2",
    title: "学生管理",
    icon: "PieChartOutlined"
  },
  {
    key: "3",
    title: "教师管理",
    icon: "PieChartOutlined"
  },
  {
    key: "4",
    title: "专业管理",
    icon: "PieChartOutlined"
  }
]

const edu_admin = [
  main_page,
  {
    key: "2",
    title: "学生信息",
    icon: "PieChartOutlined"
  },
  {
    key: "3",
    title: "教师信息",
    icon: "PieChartOutlined"
  },
  {
    key: "4",
    title: "课程管理",
    icon: "PieChartOutlined"
  },
  {
    key: "5",
    title: "成绩管理",
    icon: "PieChartOutlined"
  }
]

const course_search = {
  key: "course_search",
  title: "全校开课查询",
  icon: "PieChartOutlined"
}

const course_table = {
  key: "course_table",
  title: "我的课表",
  icon: "PieChartOutlined"
}

const teacher = [
  main_page,
  {
    key: "2",
    title: "课程",
    icon: "PieChartOutlined",
    children: [
      course_search,
      {
        key: "2.2",
        title: "发布课程",
        icon: "PieChartOutlined"
      },
      course_table
    ]
  },
  {
    key: "3",
    title: "成绩",
    icon: "PieChartOutlined"
  }
]

const student = [
  main_page,
  {
    key: "2",
    title: "课程",
    icon: "PieChartOutlined",
    children: [
      course_search,
      {
        key: "2.2",
        title: "选课",
        icon: "PieChartOutlined"
      },
      {
        key: "2.3",
        title: "退课",
        icon: "PieChartOutlined"
      },
      course_table
    ]
  },
  {
    key: "3",
    title: "成绩",
    icon: "PieChartOutlined"
  }
]

const menus = {
  "admin": admin,
  "edu_admin": edu_admin,
  "teacher": teacher,
  "student": student
}

export default defineComponent({
  components: {
    Icon,
    "sub-menu": SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },

  setup() {
    const state = reactive({
      // role: this.$store.commit("roles")[0],
      role: "student",
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: [],
      preOpenKeys: [],
    })
    
    watch(() => state.openKeys, (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    })

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    }

    const menuItems = menus[state.role]
    return {
      menuItems,
      ...toRefs(state),
      toggleCollapsed,
    };
  },

});
</script>
<style scoped>
  .pageWrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
  
  .content {
    flex: 1;
  }
</style>