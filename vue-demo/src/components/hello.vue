<template>
  <div>
    <p>这是hello页面，已实现路由跳转</p>
    <p>2222222221111111111222222222222222222{{ message }}</p>
    <test v-on:parents-value="childMessage"></test>

    <h1 style="color: red;">222{{ par }}</h1>
    <!-- 以上就是单向数据流的一般表现了： 父级 prop 的更新会向下流动到子组件中，但是反过来则不行。 -->
    <HelloWorld />
    <slot>子组件内插槽的内容 现在当我在一个父级组件 APP 中使用并且不提供任何插槽内容时：后备内容“子组件内插槽的内容”将会被渲染</slot>

    <button @click="initAllData">initAllData</button>
    <span>{{ $store.state.num }}</span>

  </div>
</template>

<script>
import HelloWorld from "./HelloWorld";
import test from "./test";
export default {
  name: "hello",
  data() {
    return {
      message: '5555555555555555555555555555',
      par: ''
    }
  },
  watch: {
    "$store.state.num"(news, olds) {
      if (news != olds) {
        console.log('222222222222')
      }
    }
  },
  methods: {
    childMessage: function (data) {
      this.par = data
    },
    initAllData() {

      //this.$store.commit('triggerInitData', { a: true })
    }
  },
  components: {
    HelloWorld,
    test
  }
}
</script>

<style scoped>
</style>
