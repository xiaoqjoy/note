<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false">
    </commomHeader>
    <div class="containerTop">
      <img class="imgHeader" src="../../assets/logo.png"/>
      <div class="imgEdit"></div>
      <label class="labelName">{{doctorInfo.name}}</label>
      <label class="labelTitle">{{doctorInfo.title}}</label>
    </div>
    <div class="containerItem" style="margin-top: 0.3rem">
      <div class="imgWallet"></div>
      <label class="labelItem">钱包</label>
      <div class="imgEnter"></div>
    </div>
    <div class="containerItem">
      <div class="imgAuth"></div>
      <label class="labelItem">资格认证</label>
      <label class="labelStatus">{{doctorInfo.isAuth === 1 ? "已认证": "未认证"}}</label>
      <div class="imgEnter"></div>
    </div>
    <div class="containerItem">
      <div class="imgService"></div>
      <label class="labelItem">咨询服务</label>
      <label class="labelStatus">{{doctorInfo.isServiceOpen === 1 ? "已开通": "未开通"}}</label>
      <div class="imgEnter"></div>
    </div>
  </div>
</template>

<style scoped>
  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }
  .containerTop {
    position: relative;
    width: 100%;
    height: 3.2rem;
    background: url("../../../static/images/blue.png") no-repeat;
    background-size: cover;
  }
  .imgHeader {
    position: absolute;
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    top: 0.4rem;
    left: 3.15rem;
    background-color: #ffffff;
    border: solid 0.02rem #f4f4f4;
    border-radius: 1.2rem;
  }
  .imgEdit {
    position: absolute;
    display: inline-block;
    width: 0.3rem;
    height: 0.26rem;
    background: url("../../../static/images/icon.png") no-repeat;
    background-position: 0 -2.29rem;
    background-size: 7.52rem 38rem;
    top: 1.34rem;
    left: 4.41rem;
  }
  .labelName {
    position: absolute;
    display: block;
    width: 100%;
    font-size: 0.36rem;
    color: #ffffff;
    top: 1.87rem;
    text-align: center;
  }

  .labelTitle {
    position: absolute;
    display: block;
    width: 100%;
    font-size: 0.3rem;
    color: #ffffff;
    top: 2.38rem;
    text-align: center;
  }

  .containerItem {
    position: relative;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background: white;
    margin-top: 1px;
  }

  .imgWallet {
    position: absolute;
    display: inline-block;
    width: 0.38rem;
    height: 0.34rem;
    background: url("../../../static/images/icon.png") no-repeat;
    background-position: 0 -10.77rem;
    background-size: 7.52rem 38rem;
    left: 0.3rem;
    top: 0.43rem;
  }

  .imgAuth {
    position: absolute;
    display: inline-block;
    width: 0.42rem;
    height: 0.42rem;
    background: url("../../../static/images/icon.png") no-repeat;
    background-position: 0 -14.14rem;
    background-size: 7.52rem 38rem;
    left: 0.28rem;
    top: 0.4rem;
  }

  .imgService {
    position: absolute;
    display: inline-block;
    width: 0.44rem;
    height: 0.31rem;
    background: url("../../../static/images/icon.png") no-repeat;
    background-position: 0 -2.87rem;
    background-size: 7.52rem 38rem;
    left: 0.3rem;
    top: 0.45rem;
  }

  .labelItem {
    display: inline-block;
    font-size: 0.34rem;
    color: #333333;
    float: left;
    margin-left: 0.9rem;
  }

  .imgEnter {
    width: 0.11rem;
    height: 0.2rem;
    background: url("../../../static/images/icon.png") no-repeat;
    background-position: 0 -1.28rem;
    background-size: 7.52rem 38rem;
    float: right;
    margin: 0.5rem 0.3rem 0 0;
  }

  .labelStatus {
    position: absolute;
    font-size: 0.34rem;
    color: #999999;
    right: 0.6rem;
  }


</style>
<script>
  import commomHeader from "../commomComponents/header";

  const AUTH_YES = 1;
  const SERVICE_OPEN_YES = 1;
  export default {
    name: "mine",  // 首页我的页面
    data() {
      return {
        headerTitle: "我的",
        doctorInfo: {
          "name": "赵又廷",
          "title": "主任医师",
          "isAuth": 0,
          "isServiceOpen": 0
        }
      }
    },
    methods: {},
    components: {
      commomHeader
    },
  }
</script>
