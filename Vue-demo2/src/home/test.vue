<template>
  <div>
    <p>this is test file!</p>
    <span>{{ name }}--------------------test page</span>
    <span>{{ count }}-------------------test page</span>
    <p>{{ num }} {{ searchQuery }} {{ gridColumns[0] }}-----{{ gridColumns[1] }}</p>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          name: this.$store.state.name,
          count: this.$store.state.count
        }
      },
      props: ['searchQuery','gridColumns','gridData'],
      name: "test",
      computed: {
        num(){
          return this.gridColumns[1]
        }
      },
      mounted(){
        console.log(this.$store.state.name);
        console.log(this.$store.state.count);
      }
    }
</script>

<style scoped>

</style>
