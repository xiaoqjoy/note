<template>
  <div>
    <header-nav :headerTitle="headerTitle" :rightIsShow="true" :showAdd="true" :goBackTwo='true'></header-nav>
    <div class="eachLine">
      <input class="inputMobile fl edit edit-width" type="text" placeholder="请输入手机号" v-model="mobile" maxlength="11">
      <button :class="getCodeClass" @click="onGetCodeClick" :disabled="btnGetCodeDisabled">
        {{getCodeText}}
      </button>
    </div>
    <div class="eachLine">
      <input class="inputMobile fl edit edit-width" type="text" placeholder="请输入验证码" v-model="validCode" maxlength="6">
    </div>
    <button class="btnLogin" @click="login">登录</button>
    <label class="labelPasswordLogin fr" @click="passwordLogin">密码登录</label>
  </div>
</template>
<script>
  export default {
    name: "validCodeLogin",  // 验证码登录

    data() {
      return {
        headerTitle: "登录",
        mobile: "",
        validCode: "",
        getCodeText: "获取验证码",
        btnGetCodeDisabled: false,
        getCodeClass: "btnGetCodeEnabledClass",
      }
    },
    methods: {
      login: function(){
        this.$router.push("/home/patient");
      },
      // 密码登录
      passwordLogin: function () {
        this.$router.push("/login/passwordLogin");
      },
      // 获取验证码
      onGetCodeClick: function () {
        console.log("onGetCodeClick")
        let time = 60;
        this.getCodeText = time + " S";
        this.btnGetCodeDisabled = true;
        this.getCodeClass = "btnGetCodeDisabledClass";
        let Timer = setInterval(()=> {
          time--;
          this.getCodeText = time + " S";
          if (time === 0) {
            clearInterval(Timer);
            this.getCodeText = "获取验证码";
            this.getCodeClass = "btnGetCodeEnabledClass";
            this.btnGetCodeDisabled = false;
          }
        }, 1000);
      }
    },
    components: {},
  }
</script>

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

  .btnGetCodeEnabledClass {
    width: 1.8rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color: #78adf7;
    border-radius: 0.08rem;
    margin: 0.27rem 0.3rem 0.23rem 0.2rem;
    font-size: 0.28rem;
    color: #ffffff;
    float: right;
  }

  .btnGetCodeDisabledClass {
    width: 1.8rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color: #bcc8d7;
    border-radius: 0.08rem;
    margin: 0.27rem 0.3rem 0.23rem 0.2rem;
    font-size: 0.28rem;
    color: #ffffff;
    float: right;
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
