import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import aLLWork from '@/components/allWork'
import login from '../login'
import main from '@/components/main'
import HourWork from '@/components/hourWork'
import applyPost from '@/components/applyPost'
import workClock from '@/components/workClock'
import allDayList from '@/components/allDayWorkList'/*全天工列表前端*/
import hourDayList from '@/components/hourDayWorkList'/*小时工列表前端*/
import newsList from '@/components/newsList'/*新闻列表前端*/

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
      {
          path: '/aLLWork',
          name: 'aLLWork',
          component: aLLWork
      },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/',
          name: 'main',
          component: main
      },
      {
          path: '/HourWork',
          name: 'HourWork',
          component: HourWork
      },
      {
          path: '/applyPost',
          name: 'applyPost',
          component: applyPost
      },
      {
          path: '/workClock',
          name: 'workClock',
          component: workClock
      },
      {
          path: '/allDayList',
          name: 'allDayList',
          component: allDayList
      },
      {
          path: '/hourDayList',
          name: 'hourDayList',
          component: hourDayList
      },
      {
          path: '/newsList',
          name: 'newsList',
          component: newsList
      }
  ]
})
