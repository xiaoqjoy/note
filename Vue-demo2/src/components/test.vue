<template>
  <div>
    <h1>我是comp组件的兄弟组件</h1>
    <button v-on:click="clikeMe">gggggggggggggg</button>
  </div>
</template>

<script>
import Bus from './Bus.js'
    export default {
      name: "test",
      data(){
        return{
          msg: '44444444444'
        }
      },
      created(){
      },
      methods: {
        clikeMe: function(){
            Bus.$emit('listen-brother',this.msg)
        }
      }
    }
</script>

<style scoped>
</style>
