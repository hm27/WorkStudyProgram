import Vue from 'vue'
import Router from 'vue-router'
import adminLog from '@/components/admin/adminLog'//查看管理员日志路由
import allWork from '@/components/recruit/allDayWork'//全天工路由
import HourWrok from '@/components/recruit/hourlyWorker'//小时工路由
import resume from '@/components/resume'//简历审批路由
import pass from '@/components/applyMsg/pass'//简历通过
import notPass from '@/components/applyMsg/notPass'//简历不同过
import lunBo from '@/components/lunBo'//简历不同过
import news from '@/components/news'//简历不同过
import working from '@/components/working'//简历不同过
Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {/*管理员日志*/
      path: '/',
      name: 'adminLog',
      component: adminLog
    },
      {/*全天工*/
          path: '/allWork',
          component: allWork
      },
      {/*小时工*/
          path: '/HourWrok',
          component: HourWrok
      },
      {/*简历审批*/
          path: '/resume',
          component: resume
      },
      {/*简历通过*/
          path: '/pass',
          component: pass
      },
      {/*简历不通过*/
          path: '/notPass',
          component: notPass
      },
      {/*轮播*/
          path: '/lunBo',
          component: lunBo
      },
      {/*学校新闻*/
          path: '/news',
          component: news
      },
      {/*派出管理*/
          path: '/working',
          component: working
      }
  ]
})
