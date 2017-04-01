import Vue from 'vue'
import Router from 'vue-router'
import Paint from '@/components/Paint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Paint',
      component: Paint
    }
  ]
})
