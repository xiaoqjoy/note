<template>
  <div id="test">
    <p>666666666666666666666666666666666666</p>
    <input type="text" v-model="number">
    <button type="button" v-on:click="increment">增加</button>

    <h1>{{ messageTxt }}</h1>


    <p v-clickTest:foo.a.b="message">222222222222222222222222222</p>
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
    <input type="text" ref="input">
    <button @click="add">click</button>
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
        a: 'hello world!',
        number: 0,
        messageTxt: ''
      }
    },
    created(){
      
    },
    methods: {
      increment: function() {
        this.number ++
      },
      add: function(){
        this.$refs.input.value = 999999 
      },
      getMsg: function(msg){
        this.helloChild = msg;
      },
      clickGetChild: function(){
      }
    },

    watch: {
      number: function(){
        return this.messageTxt = '22222222222'
      }
    },
    directives: {
      clickTest: {
        bind(el,binding,vnode,oldvnode){
          el.addEventListener('click',() => {
            console.log(binding)
            console.log(vnode)
            console.log(oldvnode)
          })
          var s = JSON.stringify
          el.innerHTML =
            'name: '       + s(binding.name) + '<br>' +
            'value: '      + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: '   + s(binding.arg) + '<br>' +
            'modifiers: '  + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
        }
      }
    },
    components: {
      HelloWorld,
      comp,
      Render
    },
    beforeCreate: function() {
      console.log("创建前")
      console.log(this.$route)
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
      this.$refs.input.value = 555555;
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


