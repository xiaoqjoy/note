<template>
    <div>
      <h2>this is a test page</h2>
      <button @click="goIndex">go to index</button>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {}
        },
        methods: {
          goIndex: function(){
            this.$router.push('/')
          }
        }
    }
</script>
<style>
</style>
