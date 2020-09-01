<template>
  <div>
    <p>这是index页面，已实现路由跳转11111111</p>
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
    created(){
      console.log(this.$store.state.count)
      this.test();
    },
    mounted(){
      console.log(this.$store.state.name);    //调用vuex里面的状态值需要在mounted里执行
      console.log(this.$store.state.count);
      //this.$store.commit('increment');
      //this.$store.dispatch('incrementAsync')
    },
    methods:{
      test(){
        this.query().then(res => {      //这里的res就是2，resolve传过来的
          alert(res)
        })
      },

      query(){
        return new Promise(function(resolve, reject){
          if(1){
            resolve(2)
          }else{
            reject(3)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
