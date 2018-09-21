<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerTop">
      <img class="imgWithdrawSuccess" src="../../../static/images/icon_withdraw_success.png">
      <label class="labelSuccess">申请成功</label>
    </div>
    <div class="containerCenter">
      <label class="labelCenter labelMoney">提现金额&nbsp;&nbsp;&nbsp;&nbsp;{{money}}元</label>
      <label class="labelCenter labelTime">申请时间&nbsp;&nbsp;&nbsp;&nbsp;{{time}}</label>
      <div class="containerDivider"></div>
      <label class="labelCenter labelDesc">你的申请将在3个工作日内审核完毕，请耐心等待</label>
    </div>
    <button class="btnBack">返回</button>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerTop {
    width: 100%;
    height: 2.7rem;
    background-color: #71debf;
  }

  .imgWithdrawSuccess {
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    margin-top: 0.6rem;
  }

  .labelSuccess {
    display: block;
    width: 100%;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
    margin-top: 0.2rem;
  }

  .containerCenter {
    position: relative;
    width: 94%;
    height: 2.84rem;
    background-color: #ffffff;
    border-radius: 0.1rem;
    margin: 0.3rem 3% 0.3rem 3%;
  }

  .labelCenter {
    display: block;
    position: absolute;
    font-size: 0.36rem;
    color: #333333;
    left: 0.3rem;
  }

  .labelMoney {
    top: 0.5rem;
  }

  .labelTime {
    top: 1.2rem;
  }

  .containerDivider {
    position: absolute;
    width: 92%;
    height: 1px;
    left: 4%;
    bottom: 0.87rem;
    background-color: #e0e0e0;
  }

  .labelDesc {
    bottom: 0.3rem;
    font-size: 0.3rem;
    color: #999999;
  }

  .btnBack {
    width: 94%;
    height: 0.9rem;
    margin: 0 3% 0 3%;
    background-color: #78adf7;
    border-radius: 0.08rem;
    font-size: 0.4rem;
    color: #ffffff;
  }
</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "withdrawResult",  //提现结果
    data() {
      return {
        headerTitle: "提现",
        money: 4900.00,
        time: "2018-08-20 12:00"
      }
    },
    methods: {},
    components: {
      commomHeader
    },
  }
</script>
