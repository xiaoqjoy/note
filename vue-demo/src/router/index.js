import Vue from 'vue'
import Router from 'vue-router'
import Hello from "@/components/hello";
import Index from "@/home/index";
import login from '@/components/login'
import content from '@/components/content'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'App',
//       component: App
//     }
//   ]
// })

export default new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/content', name: 'content', component: content },
    { path: '/hello', name: 'hello', component: Hello },
    { path: '/index', name: 'index', component: Index }
  ]
})