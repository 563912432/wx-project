import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: require('@/components/Hello')
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login')
    },
    {
      path: '/reg',
      name: 'reg',
      component: require('@/components/reg')
    },
    {
      path: '/forget',
      name: 'forget',
      component: require('@/components/forget')
    },
    {
      path: '/tk/',
      name: 'tk',
      component: require('@/components/tk')
    },
    {
      path: '/tk/:cid',
      name: 'tkList',
      component: require('@/components/tkList')
    },
    {
      path: '/tkDetail/:cid',
      name: 'tkDetail',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/tkDetail')
    },
    {
      path: '/paperInfo/:tid/:pid',
      name: 'paperInfo',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/paperInfo')
    },
    {
      path: '/chapter_paper/:tid',
      name: 'chapter_paper',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/chapter_paper')
    },
    {
      path: '/simulate_paper/:tid',
      name: 'simulate_paper',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/simulate_paper')
    },
    {
      path: '/vip_paper/:tid',
      name: 'vip_paper',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/vip_paper')
    },
    {
      path: '/exam/:tid(\\d+)/:pid(\\d+)/:progress_id(\\d+)?',
      name: 'exam',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/exam')
    },
    {
      path: '/chapter_exam/:tid(\\d+)/:pid(\\d+)/:progress_id(\\d+)?',
      name: 'chapter_exam',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/chapter_exam')
    },
    {
      path: '/myProgress/:tid(\\d+)',
      name: 'progress',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/myProgress')
    },
    {
      path: '/collect_exam/:cid(\\d+)',
      name: 'collect_exam',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/collect_exam')
    },
    {
      path: '/error_exam/:cid(\\d+)',
      name: 'error_exam',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/error_exam')
    },
    {
      path: '/result/:pid',
      name: 'result',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/result')
    },
    {
      path: '/parse/:pid',
      name: 'parse',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/parse')
    },
    {
      path: '/video',
      name: 'video',
      component: require('@/components/video')
    },
    {
      path: '/video/:vid',
      name: 'videoShow',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/videoShow')
    },
    {
      path: '/member',
      name: 'member',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/member')
    },
    {
      path: '/mycourse',
      name: 'mycourse',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/mycourse')
    },
    {
      path: '/spendlog',
      name: 'spendLog',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/spendLog')
    },
    {
      path: '/message/',
      name: 'message',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/message')
    },
    {
      path: '/message/:id',
      name: 'messageDetail',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/messageDetail')
    },
    {
      path: '/contactus',
      name: 'contactus',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/contactus')
    },
    {
      path: '/buy/:cid',
      name: 'buy',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/buy')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/ask/:cid',
      name: 'ask',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: require('@/components/ask')
    }
  ]
})
