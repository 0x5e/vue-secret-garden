import Vue from 'vue'
import Router from 'vue-router'
import Select from '@/components/Select'
import Paint from '@/components/Paint'
import Submit from '@/components/Submit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Select',
      component: Select
    },
    {
      path: '/paint',
      name: 'Paint',
      component: Paint
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    }
  ]
})
