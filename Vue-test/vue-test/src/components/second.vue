<template>
    <div>
      <h1>this is a index component!{{ msg }}</h1>
      <button @click="event">btn</button>
    </div>
</template>
<script>
import bus from '../assets/eventBus.js'
    export default {
        name: 'second',
        data() {
            return {
              msg: "准备接受兄弟传过来的值，我要变的"
            }
        },
        mounted(){
          var _this = this;
          bus.$on("userEvent",function(msg){
            _this.msg = msg;
          })
        },
        methods: {
          event: function(){
            this.$emit('centerKey','');
          }
        }
    }
</script>
<style>
</style>
