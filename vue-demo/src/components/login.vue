<template>
  <div>
    <p><input type="text" placeholder="user"></p>
    <p><input type="text" placeholder="password"></p>
    <button @click="login">login</button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
    }
  },
  methods: {
    login() {
      console.log(this.$router)
      this.$router.push({ path: '/content' })
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
