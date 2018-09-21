<template>
    <div>
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <div class="content">
        <img src="../../../static/images/test.png">
        <p>请让患者扫二维码关注“掌护健康公众号”</p>
        <p>并注册，即可自动关联到医生名下</p>
      </div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
              headerTitle: '添加患者'
            }
        },
        methods: {}
    }
</script>
<style lang="less" scoped type="text/less">
  .content{
    margin: 0 auto;
    margin-top: 1.68rem;
    img{
      width: 3.44rem;
      height: 3.44rem;
      display: inline-block;
    }
    p{
      font-size: 0.34rem;
    }
  }
</style>
