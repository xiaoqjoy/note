<template>
  <section class="login-container">
    <div class="login-top">
      <div class="login-title">
      </div>
    </div>
    <div class="login-bottom">
      <div class="login-content box-cneter">
        <div class="login-info">
          <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" :maxlength="11">
                <i slot="prefix" class="icon iconfont icon-yonghuming font-20"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码">
                <i slot="prefix" class="icon iconfont icon-mima font-20"></i>
              </el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
        </div>
      </div>
      <div class="explain">
        <p class="font-default text-cneter">建议使用1280*1024或以上分辨率，达到最佳浏览效果</p>
        <p class="font-default text-cneter">Copyright 2017-2018 民宿好住 版权所有粤ICP备10202274</p>
      </div>
    </div>
  </section>
</template>

<script>
// import md5 from 'js-md5';
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      pwdType: 'password',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.doLogin();
        } else {
          this.$message({
            type: 'warning',
            message: '请输入用户名和密码!'
          });
          return false;
        }
      });
    },
    doLogin() {
      this.$axios.get('login/login', {
        params: {
          userName: this.loginForm.username,
          password: this.loginForm.password
          // password: md5(this.loginForm.password)
        }
      }).then(res => {
        if (res.data.status === 'C0000') {
          // let data = res.data.result;
          // window.sessionStorage.setItem('userInfo', JSON.stringify(data));
          this.$router.replace('/Home');
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
}
.box-cneter {
  margin: 0 auto;
  width: 560px;
}
.login-container >>> input {
  padding: 12px 5px 12px 30px !important;
}
.login-top {
  width: 100%;
  height: 40%;
  position: relative;
  background-color: #008842;
}
.login-title {
  text-align: center;
  margin-left: -280px;
  width: 560px;
  height: 170px;
  position: absolute;
  bottom: 0;
  left: 50%;
  font-size: 30px;
  font-weight: 900;
  line-height: 170px;
  color: #ffffff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* background-image: url("../../../static/img/logo-login.png"); */
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(228, 236, 231, 0.2);
  box-shadow: 0px -3px 10px rgba(229, 226, 226, 0.1);
}
.login-bottom {
  width: 100%;
  height: 60%;
  background-color: #eeeeee;
}
.login-content {
  height: 240px;
  background-color: #ffffff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0px 3px 10px rgb(211, 211, 211);
}
.login-info {
  margin: 0 auto;
  padding-top: 40px;
  width: 240px;
  position: relative;
}
.explain {
  margin-top: 40px;
}
.text-cneter {
  text-align: center;
}
i.font-20 {
  font-size: 20px;
}
</style>
