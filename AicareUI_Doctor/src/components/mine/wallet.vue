<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerBalance">
      <label class="labelBalance labelDesc">可提现</label>
      <label class="labelBalance labelMoney">{{balance}}</label>
      <label class="labelBalance labelUnit">元</label>
      <label class="labelBalance labelTotalDraw">累计获取：{{totalDraw}}元</label>
    </div>
    <div class="containerPaymentsDetail">
      <img class="imgPaymentsDetail" src="../../../static/images/icon_payments_detail.png">
      <label class="labelPaymentsDetail">收支明细</label>
    </div>
    <div v-for="item in payments" class="containerPaymentsItem">
      <img class="imgHeader" src="../../assets/logo.png"/>
      <label class="labelItemName">{{item.name}}</label>
      <label class="labelItemMoney">{{item.money}}</label>
      <label class="labelItemTime">{{item.time}}</label>
      <label class="labelItemType">[ {{item.type}} ]</label>
    </div>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerBalance {
    width: 96%;
    height: 3.48rem;
    background: url("../../../static/images/bg_wallet_balance.png");
    margin: 0.25rem 2% 0.05rem 2%;
    background-size: cover;
    text-align: left;
  }

  .labelBalance {
    display: block;
    padding-left: 0.39rem;
    color: #fff5ee;
  }

  .labelDesc {
    font-size: 0.26rem;
    padding-top: 0.65rem;
  }

  .labelMoney {
    display: inline-block;
    font-size: 0.7rem;
    color: white;
    padding-top: 0.2rem;
  }

  .labelUnit {
    display: inline-block;
    font-size: 0.36rem;
    color: white;
    padding-left: 0;
  }

  .labelTotalDraw {
    font-size: 0.26rem;
    padding-top: 0.4rem;
  }

  .containerPaymentsDetail {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .imgPaymentsDetail {
    display: inline-block;
    width: 0.24rem;
    height: 0.26rem;
    margin: 0.05rem 0.1rem 0.2rem 0.3rem;
    float: left;
  }

  .labelPaymentsDetail {
    font-size: 0.28rem;
    color: #666666;
    opacity: 0.2;
    float: left;
    padding-top: 0.02rem;
  }

  .containerPaymentsItem {
    position: relative;
    width: 100%;
    height: 1.4rem;
    background: white;
    border-bottom: 0.01rem solid #e0e0e0;;
  }

  .imgHeader {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background-color: #ffffff;
    border: solid 0.04rem #f4f4f4;
    border-radius: 1.4rem;
    left: 0.3rem;
    top: 0.25rem;
  }

  .labelItemName {
    position: absolute;
    font-size: 0.34rem;
    color: #333333;
    top: 0.24rem;
    left: 1.5rem;
  }

  .labelItemMoney {
    position: absolute;
    font-size: 0.34rem;
    color: #f3b88c;
    top: 0.28rem;
    right: 0.3rem;
  }

  .labelItemTime {
    position: absolute;
    font-size: 0.30rem;
    color: #999999;
    left: 1.5rem;
    bottom: 0.24rem;
  }

  .labelItemType {
    position: absolute;
    font-size: 0.30rem;
    color: #333333;
    right: 0.3rem;
    bottom: 0.2rem;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "wallet",  // 医生钱包页面
    data() {
      return {
        headerTitle: "钱包",
        balance: 8000.00,
        totalDraw: 1212,
        payments: [
          {
            "name": "赵大勋",
            "time": "2018-08-08 12:36",
            "type": "购买咨询",
            "money": "+10",
          },
          {
            "name": "高圆圆",
            "time": "2018-08-08 12:30",
            "type": "提现",
            "money": "-200"
          },
        ]
      }
    },
    methods: {},
    components: {
      commomHeader
    },
    created: function () {
    },
  }
</script>
