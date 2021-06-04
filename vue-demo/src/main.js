// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from "vue-router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/index";
import router from './router'
import App from './App'

Vue.use(VueRouter);

Vue.config.productionTip = false;

// var router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   routes: [
//     { path: '/hello', name: 'hello', component: Hello },
//     { path: '/index', name: 'index', component: Index }
//   ]
// })

// var router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   routes: [
//     { path: '/login', name: 'login', component: login },
//     {
//       path: '/app',
//       name: 'App',
//       component: App
//     },
//     { path: '/hello', name: 'hello', component: Hello },
//     { path: '/index', name: 'index', component: Index }
//   ]
// })

router.beforeEach(async (to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    console.log('在登录')
  }
  next()
})

router.afterEach(() => {

})

Vue.use(Element);

//store.commit('run')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App />',
  router,
  store
})
