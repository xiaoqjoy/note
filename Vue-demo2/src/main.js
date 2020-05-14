// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Hello from "./components/hello";
import Index from "./home/index";
import Log from "./home/log";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.config.silent = false;   //取消 Vue 所有的日志与警告

var router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
      path: '/hello', 
      name: 'hello', 
      component: Hello ,
      children: [
        {
          path: '/hello/log',
          component: Log
        }
      ]
    },
    { 
      path: '/index', 
      name: 'index', 
      component: Index
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router,
  mouted(){
    router.push('/index')
  }
})
