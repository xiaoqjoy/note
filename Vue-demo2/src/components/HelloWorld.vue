<template>
  <div class="hello">
    <h2 style="color: red;">{{ parm }}标记</h2>
    <h1>{{ msg }}</h1>
    <h2 >Essential Links</h2>
    <button v-on:click="clikeMe">click me!</button>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <comp ref="comp"></comp>
    <test/>
    <h1 style="color: blue">{{ abc }}</h1>
  </div>
</template>

<script>
  import comp from "./comp";
  import test from "./test";

export default {
  name: 'HelloWorld',
  props: ['parm'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a: '我是要向父组件传值的',
      abc: ''
    }
  },
  created(){
    this.$emit('listen-child',this.msg)
  },
  methods: {
    clikeMe: function(){
      console.log(this.a)
      this.$emit('listen-child',this.a)
    }
  },
  components: {
    comp,
    test
  },
  mounted(){
    console.log(this.$refs)
    this.abc = this.$refs.comp._data.comp
    console.log(111111111111111111111111)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
