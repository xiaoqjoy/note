<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <children>
      <div slot="up">
        <span>菜单1</span>
        <span>菜单2</span>
        <span>菜单3</span>
        <span>菜单4</span>
        <span>菜单5</span>
        <span>菜单6</span>
        <span>{{ list }}</span>
      </div>
      <div slot="down">
        <span>88888888888888888</span>
      </div>
      <template slot-scope="user">
        <span v-for="item in user.data" class="user">{{ item }}</span>
      </template>
    </children>
  </div>
</template>

<script>
  import children from './child'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: '菜单7'
    }
  },
  components: {
    children
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
  span.user{
    margin: 0 15px;
  }
</style>
