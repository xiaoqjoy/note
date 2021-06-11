<template>
  <div>
    <p style="color: red;" @click="passValue">我是test组件111</p>
    <h2>{{ message }}</h2>
    <ul>
      <li v-for="(item, index) in evenNumbers" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in itemNumbers" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      age: '0000000000000',
      numbers: [1, 2, 3, 4, 5]
    }
  },
  props: ['message'],
  created() {
  },
  computed: {
    evenNumbers() {
      return this.numbers.filter(item => item > 2)   //注意箭头函数的写法
    },
    itemNumbers() {
      return this.numbers.filter(function (item) {
        return item < 3
      })
    }
  },
  methods: {
    passValue() {
      this.$emit('parents-value', this.age)
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
