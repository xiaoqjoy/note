<template>
  <div>
    <p>222222222222222222222222222{{ message }}</p>
    <test v-bind:parm="message"></test>
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from "./HelloWorld";
  import test from "./test";
  export default { 
    name: "hello",
    data(){
      return{
        message: '5555555555555555555555555555'
      }
    },
    components: {
      HelloWorld,
      test
    }
  }
</script>

<style scoped>

</style>
