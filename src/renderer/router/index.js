import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('../views/Main').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('../views/Settings').default
    },
    {
      path: '/game',
      name: 'game',
      component: require('../views/Game').default
    },
    {
      path: '/characters',
      name: 'Characters',
      component: require('../views/Characters').default
    }
  ]
})
