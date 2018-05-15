<template>
  <div>
    <p>this is test file!</p>
    <span>{{ name }}--------------------test page</span>
    <span>{{ count }}-------------------test page</span>
    <p>{{ num }}</p>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          name: this.$store.state.name,
          count: this.$store.state.count
        }
      },
      name: "test",
      computed: {
        num(){
          return 11
        }
      },
      mounted(){
        console.log(this.$store.state.name);
        console.log(this.$store.state.count);
      }
    }
</script>

<style scoped>

</style>
