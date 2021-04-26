<template>
  <div id="app">

    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <h1>Vue 拖拽组件</h1>

    <draggable @getDraggable="getDraggable" />

    <h1>wangEnduit编辑器</h1>
    <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>

    <img src="./assets/logo.png">
    <router-link to="/hello">Go to hello</router-link>
    <router-link to="/index">Go to index</router-link>
    <router-view></router-view>
    <p>{{ parm }}-----------------APP页面</p>
    <div>{{ fullName }}fullname</div>

    <input type="text" v-model="name">
    <test>
      这是插槽的使用 插槽内可以包含任何模板代码 甚至其它的组件 {{ slot }}
      父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
    </test>

    <input ref="username" type="text" />

    <el-input v-model="famount" maxlength="2" placeholder="请输入内容" @keyup.native="number"></el-input>

    <el-input maxlength="7" v-model="num" placeholder="请输入内容" @keyup.native="limitNum"></el-input>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
import Vue from 'vue';
import Vuex from "vuex";
import test from "./home/test";
import draggable from "./home/draggable";

import EditorBar from './wangEnduit'


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: '我是vuex-4444444',
    name: '我是vuex',
    age: 56,
    obj: {
      a: 1,
      b: 'abcdefg'
    }
  },
  mutations: {
    increment(state) {
      state.count += 196
    }
  },
  actions: {    //支持异步
    /*increment(context){
      context.commit('increment');
    }*/
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
// store.commit('increment')

export default {
  name: 'App',
  data() {
    return {
      parm: this.$store.state.count,
      slot: '我是插槽变量',
      num: '',
      name: 'kkkkkkkkk',
      age: '4444444444444',
      famount: '',
      tableData: [],
      isClear: false,
      detail: ""
    }
  },
  created() {

    var a = { name: 'kkkkk' };

    function fn() {
      console.log(this.name + '-------------------')
    }

    fn.call(a);

    let fun = () => {
      console.log(this)
    }

    fun()


    function c(callback) {
      console.log(6666)
      callback();
    }

    function b() {
      console.log(444)
    }

    c(b)


    function fn(par) {
      console.log(par)
    }

    function aaa(callback, data) {
      callback(data)     //这里实现把data传进去
    }

    aaa(fn, '我是回调函数')

    /*
    * 结论：回调函数就是： 外函数调用内函数的过程
    * 首先，fn应作为aaa的参数
    * 最后，aaa方法 调用了 fn方法
    * */


    let B = (b) => {
      console.log(arguments)
    }

    B(56)


    function A(a) {
      console.log(arguments)
    }

    A(56, 78, 45)


    //JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，该如何拿到参数呢，答案就是arguments了

    var a = 10;
    let f = (n) => n + this.a;

    let m = {
      a: 20
    }

    f.call(m, 1)

    //箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响

    let arr = [34, 56, 565, 5445];
    var array = [1, 23, 456, 54];

    let newArr = [...arr, ...array];

    console.log(newArr)

  },
  watch: {
    // '$route'(to,from){
    //   var path = to.path;
    //   console.log(path)
    // },
    'name': function () {
      console.log('我变了')
    }
  },

  methods: {
    change(val) {
      console.log(val)
    },

    getDraggable(val) {
      console.log(val)
    },


    //文本框，整数数字，最多两位
    number() {
      this.famount = this.famount.replace(/[^\.\d]/g, '');
      this.famount = this.famount.replace('.', '');
    },
    //文本框，仅数字和小数点，自动保留一位小数，整数部分最多5位
    limitNum() {
      this.num = this.num.replace(/[^\d.]/g, '');
    },
    getUser() {
      console.log(this.$refs.username.value)
    }
  },
  computed: {
    fullName() {                //fullName 写法注意   不是定义函数
      return this.name + this.age
    }
  },

  store,
  components: {
    test,
    EditorBar,
    draggable
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
  width: 100%;
  height: 100px;
  border: 1px solid red;
}
.left {
  height: 100%;
  width: 100px;
  border: 1px solid green;
  float: left;
}
.right {
  width: calc(100% - 102px);
  height: 100%;
  background: red;
  float: left;
}

h1:after {
  display: block;
  content: "";
  height: 1px;
  background: linear-gradient(0, #fff, #000);
}
@media screen and (min-device-pixel-ratio: 2),
  (-webkit-min-device-pixel-ratio: 2) {
  h1:after {
    transform: scaleY(0.5);
  }
}
@media screen and (min-device-pixel-ratio: 3),
  (-webkit-min-device-pixel-ratio: 3) {
  h1:after {
    transform: scaleY(0.5);
  }
}
</style>
