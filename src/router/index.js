import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import SelectCanvas from '@/components/SelectCanvas'
import SelectColor from '@/components/SelectColor'
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
      path: '/select-canvas',
      name: 'SelectCanvas',
      component: SelectCanvas,
      meta: {
        title: ''
      }
    },
    {
      path: '/select-color',
      name: 'SelectColor',
      component: SelectColor,
      meta: {
        title: '配色'
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
