import Vue from 'vue';
import Router from 'vue-router';
const Login = () => import('../views/Login.vue');
const Home = () => import('../views/Home.vue');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [{
      path: '/',
      redirect: '/Login',
      meta: {}
    }, {
      path: '/Login',
      component: Login
    }, {
      path: '/Home',
      component: Home
    }]
  });
}
