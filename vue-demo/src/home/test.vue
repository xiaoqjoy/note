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
          count: this.$store.state.count,
          a: 123,
          b: 456,
          firstName: 'Foo',
          lastName: 'Bar'
        }
      },
      name: "test",
      created(){
        console.log(this.$store)
      },
      computed: {
        num(){
          return this.a + this.b
        }
      },
      watch: {
        
      },
      mounted(){
        
      }
    }
</script>

<style scoped>

</style>
