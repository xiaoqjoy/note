<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/hello">Go to hello</router-link>
    <router-link to="/index">Go to index</router-link>
    <router-view></router-view>
    <p>{{ parm }}-----------------APP页面</p>
    <test/>
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
  console.log(store.state.count)

  export default {
    name: 'App',
    data(){
      return{
        parm: this.$store.state.count
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
</style>
