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
  mounted() {
    window.document.documentElement.setAttribute('data-theme', 'dark')

  },
}
</script>

<style scoped>
</style>
