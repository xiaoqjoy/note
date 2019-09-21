<template>
  <div>
    <h2>我是comp组件</h2>
  </div>
</template>

<script>
import Bus from './Bus.js'
    export default {
      name: "comp",
      data(){
        return{
          comp: 12345678
        }
      },
      mounted(){
        Bus.$on('listen-brother',(data) => {
          console.log(data)
        })
      }
    }
</script>

<style scoped>
  h2{
    color: red;
  }
</style>
