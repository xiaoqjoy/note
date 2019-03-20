<template>
    <div>
      <p>我是home页</p>
      <div ref="msgDiv">{{msg}}</div>
      <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
      <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
      <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
      <button @click="changeMsg">
        Change the Message
      </button>
      <button @click="goIndex">
        go to index
      </button>
      <!--<router-link to="/home/homePage">homepage</router-link>
      <router-link to="/home/index">index</router-link>-->
      <button class="btn" @click="goHome">homepage</button>
      <button class="btn" @click="godex">index</button>

      <!--这里是一个容器，用来接收路由组件的内容-->
      <router-view @testRouter="testRouter"></router-view>

      <button @click="goTestPage">去test页</button>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {
              i: 'this is a home',
              msg: 'Hello Vue.',
              msg1: '',
              msg2: '',
              msg3: ''
            }
        },
        created(){
          this.$router.push('/home/homePage')
        },
        methods: {
          goTestPage: function(){
            this.$router.push('/test')
          },
          testRouter: function(parm,str){
            console.log(parm)
            console.log(str)
          },
          goIndex: function(){
            this.$router.push('/')
          },
          goHome: function(){
            this.$router.push('./homePage')
          },
          godex: function(){
            this.$router.push('./index')
          },
          changeMsg() {
            console.time(2);
            this.msg = "Hello world."
            this.msg1 = this.$refs.msgDiv.innerHTML
            this.$nextTick(() => {                            //获得更新之后的 DOM
              this.msg2 = this.$refs.msgDiv.innerHTML
            })
            this.msg3 = this.$refs.msgDiv.innerHTML
            console.timeEnd(2);
          }
        }
    }
</script>
<style scoped>
  .btn{
    width: 150px;
    height: 50px;
    background: grey;
    border: none;
    border-radius: 15px;
    outline: none;
    cursor: pointer;
  }
</style>
