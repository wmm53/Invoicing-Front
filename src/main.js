// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import axios from 'axios'
import VueResource from 'vue-resource'
import global from './components/global.vue'
import introduction from './components/detail/introduction.vue'
import permissionQuery from './components/permission/permissionQuery.vue'
import permissionChange from './components/permission/permissionChange.vue'
import createUser from './components/permission/createUser.vue'
import componentManage from './components/component/componentManage.vue'
import componentCheck from './components/component/componentCheck.vue'
Vue.component('permission-query', permissionQuery)
Vue.component('permission-change', permissionChange)
Vue.component('create-user', createUser)
Vue.component('introduction', introduction)
Vue.component('component-manage', componentManage)
Vue.component('component-check', componentCheck)
Vue.prototype.global = global
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueRouter)
// router.beforeEach((to, from, next) => {
//   if (to.meta.needLogin) {
//     console.log('ggggg')
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
