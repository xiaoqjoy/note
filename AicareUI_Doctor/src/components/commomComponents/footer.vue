<template>
    <div>
      <div class="footer_nav">
        <ul>
          <li class="active"><i class="patient"></i><span>患者</span></li>
          <li><i class="msg"></i><span>消息</span></li>
          <li @click="goMe"><i class="me"></i><span>我的</span></li>
        </ul>
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
          goMe: function(){
            //this.$router.push("/home/record");
          }
        }
    }
</script>
<style lang="less" scoped type="text/less">
  .footer_nav{
    height: 0.98rem;
    width: 100%;
    border-top: 1px solid #F3F3F3;
    position: fixed;
    bottom: 0;
    ul li{
      width: 33.3%;
      float: left;
      height: 1rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      flex: 1;
      span{
        display: inline-block;
        width: 100%;
      }
      i{
        display: inline-block;
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../../static/images/icon.png") no-repeat;
        zoom: 0.5;
        text-align: center;
        line-height: 1rem;
        background-size: 7.52rem 38rem;
        margin: 10px auto 0;
      }
      i.patient{
        background-position: -0.01rem -17.56rem;
      }
      i.msg{
        background-position: -0.01rem -16.69rem;
      }
      i.me{
        background-position: -0.01rem -19.38rem;
      }
    }
    .active{
      color: #78adf7;
      i.patient{
        background-position: -0.01rem -17.13rem;
      }
      i.msg{
        background-position: -0.01rem -18.01rem;
      }
      i.me{
        background-position: -0.01rem -18.9rem;
      }
    }
  }
</style>
