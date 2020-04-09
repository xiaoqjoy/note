<template>
  <div>
    <p>this is test file!</p>
    <span>{{ name }}--------------------test page</span>
    <span  ref="dom">{{ count }}-------------------test page</span>
    <p>{{ num }}</p>
    <p>{{ parm }}</p>
    <p>----------------------------------------------++++++++++++++++++++++++++</p>
  </div>
</template>

<script>
    export default {
      name: "test",
      props: ['parm'],
      data(){
        return{
          name: this.$store.state.name,
          count: this.$store.state.count
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
          return 11
        }
      },
      mounted(){
        console.log('---------------------')
        console.log(this.$refs.dom)
      }
    }
</script>

<style scoped>

</style>
