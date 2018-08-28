<template>
  <div>
    <h2>我是comp组件</h2>
  </div>
</template>

<script>
    export default {
      name: "comp",
      data(){
        return{
          comp: 12345678
        }
      }
    }
</script>

<style scoped>
  h2{
    color: red;
  }
</style>
