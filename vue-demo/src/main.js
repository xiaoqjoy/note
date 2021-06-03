// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Hello from "./components/hello";
import Index from "./home/index";
import VueRouter from "vue-router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/index";

Vue.use(VueRouter);

Vue.config.productionTip = false;

var router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/hello', name: 'hello', component: Hello },
    { path: '/index', name: 'index', component: Index }
  ]
})

Vue.use(Element);

//store.commit('run')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  mouted() {
    router.push('/hello')
  }
})
