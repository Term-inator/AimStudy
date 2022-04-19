<template>
  <div class="pageWrapper">
    <a-button type="primary" style="display: none; margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      v-if="role=='admin'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      style="width: 256px; height: 100vh; padding: 10vh 0 0 0;"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>首页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>学生管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>教师管理</span>
      </a-menu-item>
      <a-menu-item key="4">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>专业管理</span>
      </a-menu-item>
    </a-menu>
    <a-menu
      v-if="role=='edu_admin'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>首页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>学生管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>教师管理</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
    <a-menu
      v-if="role=='student'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>首页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>学生管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>教师管理</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
    <a-menu
      v-if="role=='edu_admin'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>首页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>学生管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>教师管理</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },

  setup() {
    const state = reactive({
      // role: this.$store.commit("roles")[0],
      role: "admin",
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });
    watch(() => state.openKeys, (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    });

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return { ...toRefs(state),
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