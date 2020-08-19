<template>
  <div>
    <p>this is test file!</p>
    <span>{{ name }}--------------------test page</span>
    <span  ref="dom">{{ count }}-------------------test page</span>
    <p>{{ num }}</p>
<<<<<<< HEAD

=======
    <p>{{ parm }}</p>
    <p>----------------------------------------------++++++++++++++++++++++++++</p>
>>>>>>> 4549d6ddd466af713ace28af0898ac3d64529a66
  </div>
</template>

<script>
    export default {
      name: "test",
      props: ['parm'],
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
      
      created(){
        console.log(this.$store)
        console.log('+++++++++++++++++++++++++')
        //setTimeout('console.log(this.$refs.dom)',0)
        this.$nextTick(() => {
          console.log(this.$refs.dom)
        })
      },
      computed: {
        num(){
          return this.a + this.b
        }
      },
      watch: {
        
      },
      mounted(){
        console.log('---------------------')
        console.log(this.$refs.dom)
      }
    }
</script>

<style scoped>

</style>
