import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Select from '@/components/Select'
import Paint from '@/components/Paint'
import Submit from '@/components/Submit'
import Feedback from '@/components/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/select',
      name: 'Select',
      component: Select,
      meta: {
        title: ''
      }
    },
    {
      path: '/paint',
      name: 'Paint',
      component: Paint,
      meta: {
        title: '填色'
      }
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit,
      meta: {
        title: '提交'
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        title: '反馈'
      }
    }
  ]
})
