<template>
  <div id="app">
    <router-link to="/hello">Go to hello</router-link>
    <router-link to="/index">Go to index</router-link>
    <img src="./assets/logo.png">
    <p>{{ parm }}-----------------APP页面1111111111</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <button @click="addData">click</button>
    <p v-html="title"></p>
    <test v-bind:searchQuery="searchQuery"
          v-bind:gridData="gridData"
          v-bind:gridColumns="gridColumns">
    </test>

    <p>222222222222222266666666666666666</p>
    <router-view></router-view>

    <div id="demo">
      <form id="search">
        Search <input v-model="searchQuery">
      </form>
      <!--<demo-grid
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </demo-grid>-->
    </div>

    <example :searchQuery="searchQuery" :gridData="gridData" :gridColumns="gridColumns"></example>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Vuex from "vuex";
  import test from "./home/test";
  import example from "./home/example";
  import common from "./assets/common";

  Vue.use(Vuex);
  console.log(common.log())

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
    name: 'app',
    data(){
      return{
        searchQuery: '2222222222',
        gridColumns: ['name', 'power'],
        gridData: [
          { name: 'Chuck Norris', power: Infinity },
          { name: 'Bruce Lee', power: 9000 },
          { name: 'Jackie Chan', power: 7000 },
          { name: 'Jet Li', power: 8000 }
        ],

        parm: this.$store.state.count,
        title: '<b>2222222222</b>333333333333',
        todos: [
          {
            id: 1,
            text: '学习使用 v-for'
          },
          {
            id: 2,
            text: '学习使用 key'
          }
        ]
      }
    },
    provide: {
      for: 'kkkkkkkkkkooooooooooooooooooooo '
    },
    created(){
      console.log(1+'-------------------')
      setTimeout(function(){
        console.log(2)
      })
      new Promise(function(resolve){
        console.log(3)
        resolve();
      }).then(function(){
        console.log(4)
      })
      console.log(5+'----------------------')


    },
    methods: {
      addData: function(){
        let len = this.todos.length;
        //Vue.set(this.todos,len,{id: 3, text: '学习使用 input'})
        this.$set(this.todos,len,{id: 3, text: '学习使用 input'})    //注意这里的 写法 this.$  以后vue提供的方法都可以这样写的
        console.log(Vue == this);
        console.log(Vue);
        console.log(this);
      }
    },
    store,
    components: {
      test,
      example
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
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
