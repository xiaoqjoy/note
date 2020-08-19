<template>
  <div id="app">

    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <h1>222222222222</h1>



    <img src="./assets/logo.png">
    <router-link to="/hello">Go to hello</router-link>
    <router-link to="/index">Go to index</router-link>
    <router-view></router-view>
    <p>{{ parm }}-----------------APP页面</p>
    <div>{{ fullName }}</div>

    <input type="text" v-model="name">
    <test />

    <input ref="username" type="text"  />


  </div>
</template>


<script>
  import Vue from 'vue';
  import Vuex from "vuex";
  import test from "./home/test";

  Vue.use(Vuex);        

  const store = new Vuex.Store({
    state: {
      count: 4,
      name: '我是vuex'
    },
    mutations: {
      increment (state) {
        state.count += 196
      }
    },
    actions: {    //支持异步
      /*increment(context){
        context.commit('increment');
      }*/
      incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }
  })
 // store.commit('increment')
  console.log(222222222222222222)
  console.log(store.state.count)

  export default {
    name: 'App',
    data(){
      return{
        parm: this.$store.state.count,
        num: '',
        name: 'kkkkkkkkk',
        age: '4444444444444',
      }
    },
    created(){
      var a = { name: 'kkkkk' };

      function fn(){
        console.log(this.name + '-------------------')
      }

      fn.call(a);

      let fun = () => {
        console.log(this)
      }

      fun()


      function c(callback){
        console.log(6666)
        callback();
      }

      function b(){
        console.log(444)
      }

      c(b)


      function fn(par){
        console.log(par)
      }

      function aaa(callback, data){
        callback(data)     //这里实现把data传进去
      }

      aaa(fn, '我是回调函数')


      /*
      * 结论：回调函数就是： 外函数调用内函数的过程。
      * 首先，fn应作为aaa的参数
      * 最后，aaa方法 调用了 fn方法
      * */


      let B = (b) => {
        console.log(arguments)
      }

      B(56)


      function A(a){
        console.log(arguments)
      }

      A(56,78,45)


      //JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，该如何拿到参数呢，答案就是arguments了



      var a = 10;
      let f = (n) => n + this.a;

      let m = {
          a: 20
      }

      f.call(m,1)

      //箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响

      let arr = [34,56,565,5445];
      var array = [1,23,456,54];

      let newArr = [...arr,...array];

      console.log(newArr)








    },
    watch: {
      // '$route'(to,from){
      //   var path = to.path;
      //   console.log(path)
      // },
      'name': function(){
        console.log('我变了')
      }
    },

    methods: {
      getUser(){
        console.log(this.$refs.username.value)
      }
    },
    computed: {
        fullName (){                //fullName 写法注意   不是定义函数
        return this.name + this.age
      }
    },
    
    store,
    components: {
      test
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box{
  width: 100%;
  height: 100px;
  border: 1px solid red;
}
.left{
  height: 100%;
  width: 100px;
  border: 1px solid green;
  float: left;
}
.right{
  width: calc(100% - 102px);
  height: 100%;
  background: red;
  float: left;
}



h1:after {
  display: block;
  content: '';
  height: 1px;
  background: linear-gradient(0, #fff, #000);
}
@media screen and (min-device-pixel-ratio: 2),  (-webkit-min-device-pixel-ratio: 2) {
  h1:after {
    transform: scaleY(0.5);
  }
}
@media screen and (min-device-pixel-ratio: 3),  (-webkit-min-device-pixel-ratio: 3) {
  h1:after {
    transform: scaleY(0.5);
  }
}
</style>
