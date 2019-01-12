import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue'
import ceshiluyou from '@/components/ceshiluyou.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/2-1',
      name: '2-1',
      component: ceshiluyou
    }
  ]
})
