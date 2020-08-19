<template>
  <div>
    <p style="color: red;" @click="passValue">我是test组件111</p>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
  export default {
    name: "test",
    data(){
      return{
        age: '0000000000000'
      }
    },
    props: ['message'],
    methods: {
      passValue(){
        this.$emit('parents-value', this.age)
      }
    },
    components: {
    }
  }
</script>

<style scoped>

</style>
