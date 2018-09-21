<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerItem">
      <label class="labelLeft">服务状态</label>
      <label v-if="getStatusIsOn()" class="labelStatus labelStatusOn">已开启</label>
      <label v-else class="labelStatus labelStatusOff">未开启</label>
    </div>
    <div class="containerItem">
      <label class="labelLeft">单次咨询价格</label>
      <label class="labelLeft labelStar">*</label>
      <label class="labelUnit">&nbsp;&nbsp;元</label>
      <label class="labelMoney">{{money}}</label>
    </div>
    <div class="containerDoctorDesc">
      <label class="labelLeft">医生介绍</label>
      <label class="labelLeft labelStar">*</label>
    </div>
    <div class="containerItem containerIntroduction">
      <label class="labelLeft labelIntroduction">{{introduction}}</label>
      <img class="imgEnter" src="../../../static/images/default/icon_enter.png">
    </div>
    <div class="containerDoctorDesc">
      <label class="labelLeft">服务介绍</label>
      <label class="labelLeft labelStar">*</label>
    </div>
    <div class="containerItem containerService">
      <label class="labelLeft labelService">{{service}}</label>
      <img class="imgEnter" src="../../../static/images/default/icon_enter.png">
    </div>
    <label class="labelWarning">{{warning}}</label>
    <label v-if="getStatusIsOn()" class="labelBottom labelCloseService">关闭服务</label>
    <label v-else class="labelBottom labelOpenService">开启服务</label>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerItem {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 3% 0 3%;
    border-bottom: 1px solid #e0e0e0;
    background: white;
  }

  .labelLeft {
    font-size: 0.36rem;
    color: #333333;
    float: left;
  }

  .labelStatus {
    display: inline-block;
    float: right;
    font-size: 0.36rem;
  }

  .labelStatusOff {
    color: #999999;
  }

  .labelStatusOn {
    color: #71debf;
  }

  .labelStar {
    color: #fb789a;
  }

  .labelMoney {
    font-size: 0.36rem;
    color: #333333;
    float: right;
  }

  .labelUnit {
    font-size: 0.36rem;
    color: #999999;
    float: right;
  }

  .containerDoctorDesc {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #f4f4f4;
    padding: 0 3% 0 3%;
  }

  .containerService {
    border-bottom: 0 solid #e0e0e0;
  }

  .containerIntroduction {
    border-bottom: 0 solid #e0e0e0;
  }

  .labelIntroduction, .labelService {
    width: 92%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .imgEnter {
    float: right;
    width: 0.11rem;
    height: 0.2rem;
    margin-top: 0.5rem;
  }

  .labelWarning {
    display: block;
    width: 100%;
    padding: 0.3rem;
    background-color: #fff6f0;
    text-align: left;
    font-size: 0.3rem;
    color: #f3b88c;
    float: left;
  }

  .labelBottom{
    display: block;
    position: absolute;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #ffffff;
    bottom: 0;
  }

  .labelCloseService {
    background-color: #fb789a;
  }

  .labelOpenService {
    background-color: #78adf7;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";

  const STATUS_ON = 1;//当前服务状态，已开启
  const STATUS_OFF = 0;//当前服务状态，已关闭
  export default {
    name: "consultingService",  //咨询服务
    data() {
      return {
        headerTitle: "咨询服务",
        status: STATUS_OFF,
        money: 10,
        introduction: "刘尚全，男，主任医师，内分泌科副主任医师",
        service: "本服务包含图文咨询服务一次，您购买该服务",
        warning: "1,开启咨询服务后，患者可向医生购买咨询服务，按次收费；2,患者购买服务后，可向医生提出问题咨询，咨询期间对话不做发送限制；3,医生完成咨询后，可点击结束咨询，结束咨询后患者将不能向医生发送消息。",
      }
    },
    methods: {
      getStatusIsOn: function () {
        return this.status === STATUS_ON;
      }
    },
    components: {
      commomHeader
    },
  }
</script>
