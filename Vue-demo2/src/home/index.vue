<template>
  <div>
    <p>这是index页面，已实现路由跳转</p>
    <p>{{ count }}-----------------index页面</p>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        count: this.$store.state.count
      }
    },
    name: "index",
    mounted(){
      console.log(this.$store.state.name);    //调用vuex里面的状态值需要在mounted里执行
      console.log(this.$store.state.count);
      this.$store.commit('increment');
      this.$store.dispatch('incrementAsync')
    },
    methods:{
    }
  }
</script>

<style scoped>

</style>
