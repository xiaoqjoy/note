<template>
  <div>
    <p>2222222221111111111222222222222222222{{ message }}</p>
    <test v-on:parents-value="childMessage"></test>

    <h1 style="color: red;">222{{ par }}</h1>
    <!-- 以上就是单向数据流的一般表现了： 父级 prop 的更新会向下流动到子组件中，但是反过来则不行。 -->
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
        message: '5555555555555555555555555555',
        par: ''
      }
    },
    methods: {
      childMessage: function(data){
        this.par = data
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
