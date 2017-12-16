// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import vueResource from 'vue-resource'
import echarts from 'echarts/lib/chart/pie'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false
// Vue.use(mint)
Vue.use(echarts)
Vue.use(vueResource)
Vue.use(VueCookie)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (store.state.user !== null && store.state.isLogin !== false) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
