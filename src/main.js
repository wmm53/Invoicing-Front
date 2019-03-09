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
import permissionManage from './components/permission/permissionManage.vue'
import permissionChange from './components/permission/permissionChange.vue'
import userManage from './components/permission/userManage.vue'
import componentAdd from './components/component/componentAdd.vue'
import componentCheck from './components/component/componentCheck.vue'
import createInPaper from './components/inOutOrder/createInPaper.vue'
import manageInPaper from './components/inOutOrder/manageInpaper.vue'
import manageOutPaper from './components/inOutOrder/manageOutpaper.vue'
import allOrder from './components/allOrder/allOrder.vue'
Vue.component('permission-manage', permissionManage)
Vue.component('permission-change', permissionChange)
Vue.component('user-manage', userManage)
Vue.component('introduction', introduction)
Vue.component('component-add', componentAdd)
Vue.component('component-check', componentCheck)
Vue.component('create-inpaper', createInPaper)
Vue.component('manage-inpaper', manageInPaper)
Vue.component('manage-outpaper', manageOutPaper)
Vue.component('all-order', allOrder)
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
