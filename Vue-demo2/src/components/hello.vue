<template>
  <div id="test">
    <p>222222222222222222222222222</p>
    <p style="color: red;">看看我从儿子处获得的消息：{{ helloChild }}</p>
    <textarea v-model="helloChild" placeholder="add multiple lines"></textarea>
    <HelloWorld v-bind:parm="message" v-on:listen-child="getMsg"></HelloWorld>
    <p v-on:click="clickGetChild">子组件向父组件传值的方式</p>
    <comp></comp>
    <!--<comp>
      <slot></slot>
      <p>999999999999999</p>&lt;!&ndash;这段显示不出来&ndash;&gt;
    </comp>-->
    <Render></Render>
    <h1>{{ a }}</h1>
  </div>
</template>

<script>
  console.log(this)
  import HelloWorld from "./HelloWorld";
  import comp from "./comp";
  import Render from "../home/render.js";
  export default {
    name: "hello",
    data() {
      return {
        message: 'xiaoqi is a boy!',
        helloChild: '',
        a: 'hello world!'
      }
    },
    methods: {
      getMsg: function(msg){
        this.helloChild = msg;
      },
      clickGetChild: function(){
      }
    },
    components: {
      HelloWorld,
      comp,
      Render
    },
    beforeCreate: function() {
      console.log("创建前")
      console.log(this.a)
      console.log(this.$el)
    },
    created: function() {
      console.log("创建之后");
      console.log(this.a)
      console.log(this.$el)
    },
    beforeMount: function() {
      console.log("mount之前")
      console.log(this.a)
      console.log(this.$el)
    },
    mounted: function() {
      console.log("mount之后")
      console.log(this.a)
      console.log(this.$el)
    },
    beforeUpdate: function() {
      console.log("更新前");
      console.log(this.a);
      console.log(this.$el)
    },
    updated: function() {
      console.log("更新完成");
      console.log(this.a)
    },
    beforeDestroy: function() {
      console.log("销毁前");
      console.log(this.a)
      console.log(this.$el)
    },
    destroyed: function() {
      console.log("已销毁");
      console.log(this.a)
      console.log(this.$el)
    }
  }
</script>

<style scoped>

</style>


