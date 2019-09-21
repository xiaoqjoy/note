<template>
  <div>
    <p>222222222222222222222222222</p>
    <test />
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from "./HelloWorld";
  import test from "./test";
  export default {
    name: "hello",
    components: {
      HelloWorld,
      test
    }
  }
</script>

<style scoped>

</style>
