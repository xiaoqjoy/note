<template>
  <div>
    <commomHeader :headerTitle="headerTitle" :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo='false'>
    </commomHeader>
    <div class="eachLine">
      <input class="inputMobile fl edit edit-width" type="text" placeholder="请输入手机号" v-model="mobile" maxlength="11">
    </div>
    <div class="eachLine">
      <input class="inputMobile fl edit edit-width" type="text" placeholder="请输入密码" v-model="password" maxlength="6">
    </div>
    <button class="btnLogin">登录</button>
    <label class="labelPasswordLogin" @click="validCodeLogin">验证码登录</label>
  </div>
</template>

<style scoped>
  .eachLine {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.36rem;
    border-bottom: 0.01rem solid #e0e0e0;
  }

  .edit-width {
    width: 70%;
  }

  .edit {
    color: #111;
    width: 40%;
    display: inline-block;
    height: 1.17rem;
    line-height: 1.17rem;
  }

  .eachLine .inputMobile {
    padding: 0.2rem 0.24rem;
    height: 1.17rem;
  }

  .btnLogin {
    width: 92%;
    height: 0.9rem;
    margin: 0.6rem 4% 0 4%;
    background-color: #78adf7;
    border-radius: 8px;
    font-size: 0.40rem;
    color: #ffffff;
  }

  .labelPasswordLogin {
    font-size: 0.36rem;
    color: #619aeb;
    margin: 0.58rem 0.3rem 0 0;
    display: block;
  }
</style>
<script>
  import commomHeader from "../commomComponents/header";
  export default {
    name: "passwordLogin",  // 密码登录

    data() {
      return {
        headerTitle: "登录",
        mobile: "",
        password: "",
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
