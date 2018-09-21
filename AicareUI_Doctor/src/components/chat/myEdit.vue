<template>
    <div>
      <div class="mask"></div>
      <div class="myEdit">
        <p>填写分组名称</p>
        <input type="text" value="" placeholder="请填写分组名称">
        <div class="btn">
          <button class="cancel" @click="cancel">取消</button>
          <button class="commit">确定</button>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {}
        },
        methods: {
          cancel: function(){
            this.$parent.$data.edit = false;
          }
        }
    }
</script>
<style lang="less" scoped type="text/less">
  .mask{
    background-color: #000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 500;
    opacity: .6;
  }
  .myEdit{
    height: 3.7rem;
    width: 90%;
    background-color: #ffffff;
    border-radius: 0.12rem;
    z-index: 999;
    opacity: 1;
    position: absolute;
    margin: 0 5%;
    p{
      font-size: 0.32rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: left;
      text-indent: 0.3rem;
    }
    input{
      height: 0.9rem;
      width: 90%;
      background-color: #ffffff;
      border-radius: 0.08rem;
      border: 1px solid #cecece;
      text-indent: 0.2rem;
      font-size: 0.32rem;
    }
    .btn{
      width: 90%;
      margin: 0.5rem 5% 0;
      button{
        width: 3rem;
        height: 0.9rem;
        border-radius: 0.08rem;
        outline: none;
        font-size: 0.36rem;
      }
      .cancel{
        border: 1px solid #cecece;
        color: black;
        background: white;
      }
      .commit{
        background-color: #78adf7;
        color: white;
        border: 1px solid #78adf7;
      }
    }
  }
</style>
