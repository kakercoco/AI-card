import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/index'
    }, {
      path: '/main',
      name: 'main',
      component: () => import('@/views/home/main'),
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/home/index')
      }, {
        path: 'message',
        name: 'message',
        component: () => import('@/views/home/message')
      }, {
        path: 'news',
        name: 'news',
        component: () => import('@/views/home/news')
      }, {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/home/contact')
      }, {
        path: 'self',
        name: 'self',
        component: () => import('@/views/home/self')
      }]
    }, {
      path: '/produceList',
      name: 'produceList',
      component: () => import('@/views/produce/list')
    }
  ]
})
