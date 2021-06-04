<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    }
  },
  created() {
    this.$router.push({ path: '/login' })
  },
  methods: {

  },
}
</script>

<style scoped>
</style>
