import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/sysUser',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools'
    },
    alwaysShow: true,
    children: [
      {
        path: 'sysUser',
        name: 'SysUser',
        component: () => import('@/views/system/List'),
        meta: {
          title: '用户管理',
          icon: 'user'
        },
      },
      {
        path: 'join',
        name: 'Join',
        component: () => import('@/views/system/Join'),
        meta: {
          title: '审批加入',
          icon: 'el-icon-s-check'
        },
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/system/Create'),
        meta: {
          title: '审批创建',
          icon: 'el-icon-s-check'
        },
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: 'Activity',
    meta: {
      title: '活动管理',
      icon: 'el-icon-basketball'
    },
    alwaysShow: true,
    children: [{
      path: 'list',
      name: 'ActivityList',
      component: () => import('@/views/activity/List'),
      meta: { title: '活动列表', icon: 'el-icon-s-grid' }
    },
    {
      path: 'content',
      name: 'ActivityContent',
      component: () => import('@/views/activity/Content'),
      meta: { title: '活动内容', icon: 'el-icon-notebook-2' }
    },
    {
      path: 'comment',
      name: 'ActivityComment',
      component: () => import('@/views/activity/Comment'),
      meta: { title: '活动评论', icon: 'el-icon-s-comment' }
    }]
  },

  {
    path: '/help',
    component: Layout,
    redirect: '/help/list',
    name: 'Help',
    meta: {
      title: '互助管理',
      icon: 'el-icon-s-help'
    },
    alwaysShow: true,
    children: [{
      path: 'list',
      name: 'HelpList',
      component: () => import('@/views/help/List'),
      meta: { title: '互助列表', icon: 'el-icon-s-grid' }
    },
    {
      path: 'content',
      name: 'HelpContent',
      component: () => import('@/views/help/Content'),
      meta: { title: '互助内容', icon: 'el-icon-notebook-2' }
    },
    {
      path: 'comment',
      name: 'HelpComment',
      component: () => import('@/views/help/Comment'),
      meta: { title: '互助评论', icon: 'el-icon-s-comment' }
    }]
  },

/*   {
    path: '/hole',
    component: Layout,
    redirect: '/hole/list',
    name: 'Hole',
    meta: {
      title: '树洞管理',
      icon: 'el-icon-chat-square'
    },
    alwaysShow: true,
    children: [{
      path: 'list',
      name: 'HoleList',
      component: () => import('@/views/hole/List'),
      meta: { title: '树洞列表', icon: 'el-icon-s-grid' }
    },
    {
      path: 'content',
      name: 'HoleContent',
      component: () => import('@/views/hole/Content'),
      meta: { title: '树洞内容', icon: 'el-icon-notebook-2' }
    },
    {
      path: 'comment',
      name: 'HoleComment',
      component: () => import('@/views/hole/Comment'),
      meta: { title: '树洞评论', icon: 'el-icon-s-comment' }
    }]
  }, */

  {
    path: '/team',
    component: Layout,
    redirect: '/team/manage-teacher',
    name: 'Team',
    meta: {
      title: '学校管理',
      icon: 'el-icon-chat-square'
    },
    alwaysShow: true,
    children: [{
      path: 'manage-teacher',
      name: 'TeacherManage',
      component: () => import('@/views/team/TeacherManage'),
      meta: { title: '教师管理', icon: 'el-icon-s-grid' }
    },
    {
      path: 'manage-course',
      name: 'CourseManage',
      component: () => import('@/views/team/CourseManage'),
      meta: { title: '课程管理', icon: 'el-icon-s-grid' }
    },
    {
      path: 'manage-teach',
      name: 'TeachManage',
      component: () => import('@/views/team/TeachManage'),
      meta: { title: '授课管理', icon: 'el-icon-s-grid' }
    },
    {
      path: 'manage-selection',
      name: 'SelectionManage',
      component: () => import('@/views/team/SelectionManage'),
      meta: { title: '选课管理', icon: 'el-icon-s-grid' }
    }]
  },

  {
    path: '/inform',
    component: Layout,
    children: [{
      path: 'list',
      name: 'InformList',
      component: () => import('@/views/inform/List'),
      meta: { title: '举报管理', icon: 'el-icon-document' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
