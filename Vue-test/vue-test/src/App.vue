<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
.demo-ruleForm1 {
  display: block;
  margin: 0 30px;
}
.demo-ruleForm1 .el-form-item {
  width: 16%;
  display: inline-block;
}
.el-input {
  resize: none !important;
}
.fonts {
  color: #ccc;
}
.warn {
  position: absolute;
  width: 100%;
  color: red;
  line-height: 12px;
  font-size: 12px;
}
.row .col select {
  width: 107px;
}
</style>
