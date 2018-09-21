<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerTop">
      <label class="labelCanWithDraw">可提现金额：{{canWithDraw}}</label>
      <label class="labelUnit">￥</label>
      <label class="labelBalance">{{balance}}</label>
      <div class="divider"></div>
      <label class="labelSingleMaxDraw">单次最多提现：{{singleMaxDraw}}元</label>
    </div>
    <button class="btnWithDraw">提现</button>
    <label class="labelDesc">申请成功后将在3个工作日内审核完毕，提现金额将打款至微信钱包</label>
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
    width: 96%;
    height: 3.12rem;
    background-color: #ffffff;
    border-radius: 0.10rem;
    margin: 0.3rem 2% 0.3rem 2%;
  }

  .labelCanWithDraw {
    position: absolute;
    display: block;
    font-size: 0.24rem;
    color: #999999;
    left: 0.3rem;
    top: 0.3rem;
  }

  .labelUnit {
    position: absolute;
    left: 0.27rem;
    bottom: 1.18rem;
    font-size: 0.38rem;
    color: #333333;
  }

  .labelBalance {
    position: absolute;
    left: 0.75rem;
    bottom: 1.1rem;
    font-size: 0.64rem;
    color: #333333;
  }

  .divider {
    position: absolute;
    width: 92%;
    height: 1px;
    left: 4%;
    bottom: 0.87rem;
    background-color: #e0e0e0;
  }

  .labelSingleMaxDraw {
    position: absolute;
    display: block;
    font-size: 0.24rem;
    color: #999999;
    left: 0.3rem;
    bottom: 0.3rem;
  }

  .btnWithDraw {
    width: 96%;
    height: 0.9rem;
    margin: 0 2% 0.3rem 2%;
    background-color: #78adf7;
    border-radius: 8px;
    font-size: 0.32rem;
    color: #ffffff;
  }

  .labelDesc {
    display: block;
    font-size: 0.24rem;
    color: #999999;
    margin: 0 0.3rem 0 0.3rem;
    text-align: left;
    float: left;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "withdraw",  //提现
    data() {
      return {
        headerTitle: "提现",
        canWithDraw: 10000, //可提现金额
        balance: 4999, //余额
        singleMaxDraw: 4999, //单次最多提现
      }
    },
    methods: {},
    components: {
      commomHeader
    },
  }
</script>
