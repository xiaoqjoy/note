<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
.tops {
  padding: 2px 0 11px 0;
}
.tops span {
  padding: 0;
}
.addPatient {
  float: right;
  right: 20px;
  color: white;
  cursor: pointer;
  line-height: 32px;
  text-align: center;
  width: 80px;
  height: 32px;
  background-color: #24bdaf;
  border-radius: 4px;
}
.manage {
  position: absolute;
  top: 60px;
  left: 330px;
  width: calc( 100% - 330px);
  padding: 19px 20px;
  background: #f7f8fa;
}
.manage-person {
  position: absolute;
  top: 60px;
  width: calc( 100% - 200px);
  left: 130px;
  padding: 19px 0 19px 20px;
  background: #f7f8fa;
}
.managess {
  width: 100%;
  box-sizing: border-box;
  /*min-height: 812px;*/
  min-height: calc(100vh - 137px);
  background-color: #ffffff;
  padding: 20px;
  margin: 19px auto;
}
.treeNode {
  background: #fff;
  z-index: 20;
  position: fixed;
  left: 132px;
  top: 0;
  height: 100vh;
  width: 200px;
  padding-top: 60px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-box-shadow: 3px 0px 3px 0px rgba(129, 156, 173, 0.1);
  box-shadow: 3px 0px 3px 0px rgba(129, 156, 173, 0.1);
}
.treeNodeBox {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.allPatientTitle {
  color: #8b9eba;
  font-weight: bold;
  font-size: 15px;
  padding-left: 9px;
  line-height: 40px;
  cursor: pointer;
}
.allPatientTitle:hover {
  background-color: #f5f7fa;
}
</style>
