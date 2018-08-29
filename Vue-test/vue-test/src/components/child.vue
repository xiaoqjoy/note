<template>
    <div>
      <p>这里是子组件</p>
      <slot name="up"></slot>
      <slot name="down"></slot>  <!--具名插槽  数据由父组件提供-->

<!--正好相反-->


      <slot :data="data"></slot>  <!--作用域插槽  数据由子组件提供-->

      <!--样式父组件说了算，但内容可以显示子组件插槽绑定的-->
    </div>
</template>
<script>
    export default {
        name: 'child',
        data() {
            return {
              data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
            }
        },
        methods: {}
    }
</script>
<style>
</style>
