var Toast = {};   //插件开发
Toast.install = function(Vue,options){
  Vue.prototype.$msg = 'hello vue!'
}
export default Toast
