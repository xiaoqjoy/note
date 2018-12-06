import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import child from '@/components/child'
import second from '@/components/second'
import list from '@/list/list'
import home from '@/home/home'
import homePage from '@/home/homePage'
import index from '@/home/index'
import test from '@/home/test'
import err from '@/home/err'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
      {
        path: 'child',
        component: child
      },
      {
        path: 'second',
        component: second
      }
    ]
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
        path: 'homePage',
        component: homePage
        },
        {
          path: 'index',
          component: index
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '*',
      name: '错误页面',
      component: err     //当用户输入无效的URL时，进入err页面
    }
    // {
    //   path: '/test',
    //   redirect: '/'
    // }
  ]
})

/*router.beforeEach((to,from,next) => {
  //console.log('router.beforeEach')
})*/

router.afterEach((to,from,next) => {
  console.log('router.afterEach')
})

export default router;
