<template>
    <div>
      <p>homepage----homepage</p>
      <span @click="testHome">888888888888888</span>
      <p>{{ msg }}</p>
      <input type="text" v-model="msg">
    </div>
</template>
<script>
    export default {
        name: 'home-page',
        data() {
            return {
              msg: 'this is a homepage',
              i: 'this is a test'
            }
        },
        created: function(){
          console.log(this.msg)
        },
        methods: {
          testHome: function(){
            this.$emit("testRouter",this,'主页')
            //this.$parent.goIndex();
          }
        }
    }
</script>
<style>
</style>
