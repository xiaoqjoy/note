<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerItem">
      <img class="imgHeader" src="../../assets/logo.png"/>
      <label class="labelItem labelItemRight">头像</label>
    </div>
    <div class="containerItem">
      <label class="labelItem labelItemLeft">姓名</label>
      <label class="labelItem labelItemRight">{{doctorInfo.name}}</label>
    </div>
    <div class="containerItem">
      <label class="labelItem labelItemLeft">职位</label>
      <label class="labelItem labelItemRight">{{doctorInfo.title}}</label>
    </div>
    <div class="containerItem">
      <label class="labelItem labelItemLeft">科室</label>
      <label class="labelItem labelItemRight">{{doctorInfo.department}}</label>
    </div>
    <div class="containerItem">
      <label class="labelItem labelItemLeft">医院</label>
      <label class="labelItem labelItemRight">{{doctorInfo.hospital}}</label>
    </div>
    <div class="containerIntroduction">
      <label class="labelIntroduction">医生介绍</label>
      <label class="labelStar">*</label>
    </div>
    <div class="containerWriteIntroduction">
      <label v-if="checkIntroductionIsEmpty()" class="labelIntroductionEmpty">请填写</label>
      <label v-else class="labelItem labelIntroductionNotEmpty">{{doctorInfo.introduction}}</label>
      <img src="../../../static/images/default/icon_enter.png" class="imgEnter"/>
    </div>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerItem {
    position: relative;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 0.01rem solid #e0e0e0;
    background: white;
  }

  .imgHeader {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background-color: #ffffff;
    border: solid 4px #f4f4f4;
    border-radius: 0.8rem;
    float: left;
    margin: 0.2rem;
  }

  .labelItem {
    position: absolute;
    display: inline-block;
    font-size: 0.36rem;
    color: #333333;
    text-align: center;
  }

  .labelItemRight {
    right: 0.3rem;
  }

  .labelItemLeft {
    left: 0.3rem;
  }

  .containerIntroduction {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.3rem;
  }

  .labelIntroduction {
    display: inline-block;
    font-size: 0.32rem;
    color: #666666;
    float: left;
  }

  .labelStar {
    display: inline-block;
    font-size: 0.32rem;
    color: #fb789a;
    float: left;
  }

  .containerWriteIntroduction {
    position: relative;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background: white;
  }

  .labelIntroductionEmpty {
    font-size: 0.36rem;
    color: #999999;
    float: right;
    margin-right: 0.64rem;
  }

  .imgEnter {
    position: absolute;
    display: inline-block;
    width: 0.11rem;
    height: 0.2rem;
    top: 0.52rem;
    right: 0.3rem;
  }

  .labelIntroductionNotEmpty {
    position: absolute;
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 0.3rem;
    padding-right: 5%;
  }


</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "doctorInfo",  // 医生详情
    data() {
      return {
        headerTitle: "基本信息",
        doctorInfo: {
          "name": "赵又廷",
          "title": "主任医师",
          "department": "内分泌科",
          "hospital": "北京人民医院",
          "introduction": "医生介绍医生介绍医生介绍医生介绍医生介绍医生介绍医生介绍医生介绍医生介绍",
          "headUrl": ""
        }
      }
    },
    methods: {
      checkIntroductionIsEmpty:function(){
        return this.doctorInfo.introduction.trim().length === 0;
      }
    },
    components: {
      commomHeader
    },
  }
</script>
