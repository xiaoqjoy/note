<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerEdit">
      <textarea class="input" placeholder="请输入内容..." maxlength="300" v-on:input="getWordCountText()" v-model="info"></textarea>
      <label class="labelWordCount">{{wordCount}}</label>
    </div>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerEdit {
    position: relative;
    width: 100%;
    height: 68%;
    background-color: #ffffff;
  }

  .input {
    display: inline-block;
    width: 96%;
    height: 90%;
    padding: 0.3rem 2% 0.3rem 2%;
    font-size: 0.36rem;
    letter-spacing: 0.01rem;
    color: #333333;
    overflow:auto;
    background-attachment:   fixed;
    background-repeat:   no-repeat;
    border-style:   solid;
    border-color:   #FFFFFF
  }

  .labelWordCount {
    position: absolute;
    font-size: 0.30rem;
    color: #999999;
    bottom: 0.3rem;
    right: 0.3rem;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "editInfo",  // 编辑信息（医生介绍及服务介绍共用页面）
    data() {
      return {
        headerTitle: "医生介绍",
        info: "刘尚全，男，主任医师，内分泌科副主任，医学博士，硕士研究生导师，糖尿病足诊疗中心主任，医务部副部长。毕业于上海交通大学医学院，上海市内分泌研究所，内分泌与代谢病专业。主持国家自然科学基金资助项目1项，教育厅自然科学基金资助项目1项，发表学术论文20余篇，其中SCI论文4篇。研究方向：干细胞在糖尿病治疗中的应用，GLP-1质粒的构建及其降糖机制研究，糖尿病非酮症高渗与钠调节， PTTG调控VEGF的作用及机制研究。擅长糖尿病及其慢性并发症、骨质疏松、垂体、肾上腺、甲状腺等疾病的防治。",
        wordCount: "0/300",
      }
    },
    methods: {
      getWordCountText: function(){
        this.wordCount = this.info.length + "/" + 300;
      }
    },
    components: {
      commomHeader
    },
    created: function() {
      this.getWordCountText();
    },
  }
</script>
