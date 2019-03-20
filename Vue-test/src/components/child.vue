<template>
    <div>
      <p @click="sendMsg">这里是子组件</p>
      <slot name="up"></slot>
      <slot name="down"></slot>  <!--具名插槽  数据由父组件提供-->

      <!--正好相反-->
      <slot :data="data"></slot>  <!--作用域插槽  数据由子组件提供-->

      <!--样式父组件说了算，但内容可以显示子组件插槽绑定的-->


      <input type="text" ref="input" @change="getValue" v-model="msg">
      <button @click="getInput">赋值</button>

      <span ref="child">3333333333333</span>
      <p>{{ message }}</p>
      <span @click="goList">跳转到list页</span>
    </div>
</template>
<script>
import bus from '../assets/eventBus.js'
    export default {
        props: {
          message: String    //父组件向子组件传值
        },
        name: 'child',
        data() {
            return {
              data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba'],
              msg: '88883333'
            }
        },
        methods: {

          sendMsg: function(){
            bus.$emit("userEvent","我是兄弟组件现在已经传值过来了!")
          },
          getValue: function(e){
            console.log(e.target.value)
            this.msg = 'uuuuuuuuuuuuuuu'
          },
          getInput: function(){
            this.$refs.input.value = '2222'    //this.$refs.input  减少获取dom节点的消耗
            var father = this.$parent.$refs.father.innerHTML;    //引用父组件 需用 $
            console.log(father)
            console.log(this.$parent.$refs.profile)
          },
          goList: function(){
            this.$router.push({
              path: '/list',
              query: {
                id: 111111,
                name: 2222
              }
            })
          }
        },
        created: function(){
          console.log(this.$msg)
          console.log(this)
          console.log(this.$slots)
          console.log(this.$slots.up)
        }
    }
</script>
<style>
</style>
