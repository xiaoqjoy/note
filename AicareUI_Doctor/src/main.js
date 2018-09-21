// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/commom.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import commomHeader from "./components/commomComponents/header"
import footer from "./components/commomComponents/footer"

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(MintUI);

Vue.component('header-nav',commomHeader)
Vue.component('footer-nav',footer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
