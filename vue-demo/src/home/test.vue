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
      created(){
        console.log(this.$store)
      },
      computed: {
        num(){
          return 11
        }
      },
      mounted(){
        
      }
    }
</script>

<style scoped>

</style>
