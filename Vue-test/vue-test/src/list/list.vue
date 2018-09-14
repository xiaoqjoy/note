<template>
    <div>
      <p>I am list</p>
      <p>2222222222222222222222</p>
      <p>{{ $route.query.name }}</p>
      <span @click="goHome">go home page</span>
      <footerComponent></footerComponent>
    </div>
</template>
<script>
  import footerComponent from '../utils/footerComponent'

    export default {
        name: 'list',
        data() {
            return {}
        },
        methods: {
          goHome: function(){
            this.$router.push('/home')
          }
        },
        created: function(){
          let id = this.$route.query.id;
          console.log(id)
          this.customAlert();
          console.log(global)
          console.log(this)
          console.log(global === window)
        },
        components: {
          footerComponent
        }
        /*beforeRouteEnter(to, from, next){
          console.log(to)
          console.log(from)
          console.log(next)
        },*/
        /*beforeRouteLeave(to, from, next){
          console.log(to)
        }*/
    }
</script>
<style>
</style>
