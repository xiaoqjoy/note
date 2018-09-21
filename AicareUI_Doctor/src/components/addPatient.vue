<template>
  <div>
    <commomHeader :headerTitle="headerTitle" :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo='false'>
    </commomHeader>
    <img class="imgBarCode" src="../assets/logo.png"/>
    <label class="labelDesc">{{desc}}</label>
  </div>
</template>

<style scoped>
  .imgBarCode {
    width: 44%;
    margin: 1.68rem 0 0.53rem 28%;
  }
  .labelDesc {
    display: block;
    width: 80%;
    margin-left: 10%;
    font-size: 0.34rem;
    color: #333333;
  }
</style>
<script>
  import commomHeader from "./commomComponents/header";
  export default {
    name: "addPatient",  // 添加患者

    data() {
      return {
        headerTitle: "添加患者",
        desc: "请让患者扫二维码关注“掌护健康公众号”并注册，即可自动关联到医生名下"
      }
    },
    methods: {
      validCodeLogin: function(){
        history.go(-1);
      }
    },
    components: {
      commomHeader
    },
  }
</script>
