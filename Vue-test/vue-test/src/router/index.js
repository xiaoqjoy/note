import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import child from '@/components/child'
import list from '@/list/list'
import home from '@/home/home'
import homePage from '@/home/homePage'
import index from '@/home/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'child',
        component: child
      }]
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
    }
  ]
})

/*router.beforeEach((to,from,next) => {
  //console.log('router.beforeEach')
})*/

router.afterEach((to,from,next) => {
  console.log('router.afterEach')
})

export default router;
