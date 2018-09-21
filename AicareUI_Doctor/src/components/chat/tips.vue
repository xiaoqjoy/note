<template>
    <div>
      <div class="mask"></div>
      <div class="tips">
        <p class="title">空腹</p>
        <ul>
          <li>8:05<span>3.7 mmol</span></li>
          <li>8:05<span>3.7 mmol</span></li>
          <li>8:05<span>3.7 mmol</span></li>
          <li>8:05<span>3.7 mmol</span></li>
          <li>8:05<span>3.7 mmol</span></li>
        </ul>
        <p class="commit" @click="hideTips">知道了</p>
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
          hideTips: function(){
            this.$parent.$data.tip = false;
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
  .tips{
    width: 80%;
    height: 5.67rem;
    background: white;
    border-radius: 0.08rem;
    z-index: 999;
    opacity: 1;
    position: absolute;
    margin: 0 10%;
    ul{
      overflow-y: auto;
      display: inline-block;
      width: 100%;
      height: 3.7rem;
      li{
        height: 1rem;
        line-height: 1rem;
        width: 100%;
        border-bottom: 1px solid #F3F3F3;
        text-align: left;
        text-indent: 0.3rem;
        font-size: 0.32rem;
        span{
          margin-left: 0.8rem;
        }
      }
    }
    p{
      height: 1rem;
      width: 100%;
      line-height: 1rem;
      border-bottom: 1px solid #F3F3F3;
      font-size: 0.32rem;
      color: #000000;
    }
    .commit{
      color: #619aeb;
      border-top: 1px solid #F3F3F3;
      position: absolute;
      bottom: 0px;
    }
  }
</style>
