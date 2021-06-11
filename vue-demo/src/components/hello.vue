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

    <button @click="emitStore">whw</button>

    <div class="box"></div>
    <div class="foo">
      <div class="ff">calc()垂直居中</div>
    </div>

    <div class="foo">
      <div class="cc">position垂直居中</div>
    </div>

  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import test from "@/components/test";
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
      }
    }
  },
  methods: {
    childMessage: function (data) {
      this.par = data
    },
    initAllData() {

      //this.$store.commit('triggerInitData', { a: true })
    },
    emitStore() {
      this.$store.dispatch("getData", { num: false });
    }
  },
  components: {
    HelloWorld,
    test
  }
}
</script>

<style scoped>
.box {
  height: 30px;
  width: calc(100% - 100px);
  /* calc 混合计算绝对单位（比如百分比与视口单元）与相对单位（比如像素） */
  border: 1px solid red;
  height: calc(100vh - 200px);
  /* 100vh视口的高度 */
}
.foo {
  position: relative;
  width: 250px;
  height: 250px;
  border: 1px solid red;
}
.foo .ff {
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  border: 1px solid green;
  /* 使用 calc() 给我们提供另一个垂直居中元素的解决方案 */
  /* Flexbox 的介入，已经很少需要这种方法了。不过，一些情况下 Flexbox 不能被使用。比如，元素需要绝对定位或者固定定位，这种方法是有用的 */
}
.foo .cc {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  border: 1px solid black;
}
</style>