import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/index',
      meta: { title: 'AI雷达' }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/home/main'),
      children: [{
        path: 'index',
        name: 'index',
        meta: { title: 'AI雷达' },
        component: () => import('@/views/home/index')
      }, {
        path: 'message',
        name: 'message',
        meta: { title: '消息' },
        component: () => import('@/views/home/message')
      }, {
        path: 'news',
        name: 'news',
        meta: { title: '动态圈' },
        component: () => import('@/views/home/news')
      }, {
        path: 'contact',
        name: 'contact',
        meta: { title: '通讯录' },
        component: () => import('@/views/home/contact')
      }, {
        path: 'self',
        name: 'self',
        meta: { title: 'AI雷达' },
        component: () => import('@/views/home/self')
      }]
    },
    {
      path: '/seeCard',
      name: 'seeCard',
      meta: { title: '查看名片' },
      component: () => import('@/views/homeList/seeCard')
    },
    {
      path: '/seeWebsite',
      name: 'seeWebsite',
      meta: { title: '查看网站' },
      component: () => import('@/views/homeList/seeWebsite')
    },
    {
      path: '/callPhone',
      name: 'callPhone',
      meta: { title: '拨打电话' },
      component: () => import('@/views/homeList/callPhone')
    },
    {
      path: '/messageManage',
      name: 'messageManage',
      meta: { title: '销售管家' },
      component: () => import('@/views/messageManage/index')
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      meta: { title: '日程详情' },
      component: () => import('@/views/messageManage/detail')
    },
    {
      path: '/messageIM',
      name: 'messageIM',
      meta: { title: '聊天室' },
      component: () => import('@/views/messageManage/IM')
    },
    {
      path: '/insertTag',
      name: 'insertTag',
      meta: { title: '添加标签' },
      component: () => import('@/views/contacts/insertTag')
    },
    {
      path: '/insertClient',
      name: 'insertClient',
      meta: { title: '添加客户' },
      component: () => import('@/views/contacts/insertClient')
    },
    {
      path: '/newsPublish',
      name: 'newsPublish',
      meta: { title: '发布动态' },
      component: () => import('@/views/news/publish')
    },
    {
      path: '/newsSelf',
      name: 'newsSelf',
      meta: { title: '我的动态' },
      component: () => import('@/views/news/self')
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      meta: { title: '动态详情' },
      component: () => import('@/views/news/detail')
    },
    {
      path: '/calendar',
      name: 'calendar',
      meta: { title: '销售日历' },
      component: () => import('@/views/self/calendar')
    },
    {
      path: '/insertCalendar',
      name: 'insertCalendar',
      meta: { title: '添加日程' },
      component: () => import('@/views/self/insertCalendar')
    }
  ]
})
