<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="true"
                  :rightText="rightText"
                  :showAdd="false"
                  :goBackTwo="false"
    >
    </commomHeader>
    <div class="containerWarning">
      <div class="labelWarning">{{warningText}}</div>
    </div>
    <div class="containerMsgItem" ref="mescroll">
      <div class="item" v-for="item in reminds">
        <label class="time">{{item.time}}</label>
        <div class="containerMsg">{{item.content}}</div>
        <img src="../../assets/logo.png" class="imgHeader"/>
        <div class="containerSendSuccess" v-show="checkShow(item.sendStatus, true)">
          <img src="../../../static/images/remind/icon_send_success.png" class="imgSendStatus">
          <label class="labelStatus">发送成功</label>
        </div>
        <div class="containerSendFailure" v-show="checkShow(item.sendStatus, false)">
          <img src="../../../static/images/remind/icon_send_failure.png" class="imgSendStatus">
          <label class="labelStatus">发送失败</label>
        </div>
        <div class="containerResend" v-show="checkShow(item.sendStatus, false)">
          <img src="../../../static/images/remind/icon_send_failure.png" class="imgSendStatus">
          <label class="labelStatus">重新发送</label>
        </div>
      </div>
    </div>
    <div class="containerBottom">
      <input class="inputMsg" placeholder="请输入内容..." v-model="msg"/>
      <div class="containerSendMsg" @click="onSendMsgClick">
        <img class="imgSendMsg" src="../../../static/images/remind/icon_send.png"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .containerRoot {
    width: 100%;
    height: 100%;
    background: #f3f3f7;
  }

  .containerWarning {
    width: 100%;
    padding: 0.3rem 4% 0.3rem 4%;
    background-color: #fff6f0;
  }

  .labelWarning {
    font-size: 0.3rem;
    color: #f3b88c;
    text-align: left;
  }

  .containerMsgItem {
    width: 100%;
    height: 72%;
    overflow-y: scroll;
  }

  .item {
    position: relative;
    width: 100%;
    padding: 0.8rem 0.4rem 0.6rem 0.9rem;
    margin-bottom: 0.4rem;
  }

  .time {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 0.28rem;
    color: #999999;
  }

  .containerMsg {
    width: 80%;
    display: inline-block;
    background-color: #ffffff;
    border-radius: 0.06rem;
    font-size: 0.30rem;
    color: #333333;
    text-align: left;
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    margin-top: 0.3rem;
  }

  .imgHeader {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.8rem;
    position: absolute;
    right: 0.2rem;
    top: 1.5rem;
  }

  .containerSendSuccess {
    display: inline-block;
    width: 1.64rem;
    height: 0.50rem;
    background-color: #71debf;
    border-radius: 0.04rem;
    float: left;
    margin: 0.3rem 0 0 0.8rem;
  }

  .containerSendFailure {
    display: inline-block;
    width: 1.64rem;
    height: 0.50rem;
    background-color: #bcc8d8;
    border-radius: 0.04rem;
    float: left;
    margin: 0.3rem 0 0 0.8rem;
  }

  .containerResend {
    display: inline-block;
    width: 1.64rem;
    height: 0.50rem;
    line-height: 0.50rem;
    background-color: #78adf7;
    border-radius: 0.04rem;
    float: right;
    margin: 0.3rem 0.8rem 0 0;
  }

  .imgSendStatus {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    margin: 0.15rem 0.08rem 0 0;
  }

  .labelStatus {
    display: inline-block;
    font-size: 0.24rem;
    color: #ffffff;
  }

  .containerBottom {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #ffffff;
    border-top: 1px solid #dddde4;
    position: absolute;
    bottom: 0;
  }

  .inputMsg {
    width: 80%;
    height: 0.7rem;
    background-color: #ffffff;
    border-radius: 0.04rem;
    border: solid 1px #dddde4;
    padding: 0 0.2rem 0 0.2rem;
    float: left;
    margin: 0.15rem 0 0 0.3rem;
    font-size: 0.32rem;
  }

  .containerSendMsg {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 0.7rem;
    background-color: #78adf7;
    margin: 0.15rem 0.3rem 0 0.2rem;
    float: right;
  }

  .imgSendMsg {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.2rem 0.2rem 0.2rem 0.2rem;
  }
</style>
<script>
  import commomHeader from "../commomComponents/header";
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  const SEND_STATUS_SUCCESS = 0 //成功
  const SEND_STATUS_FAILURE = 1 //失败
  const SEND_STATUS_ING = 2 //发送中
  export default {

    name: "remind",  // 医生给患者发送提醒

    data() {
      return {

        headerTitle: "赵忠",
        rightText: "详情",
        warningText: "发送的消息将通过公众号推送给患者，患者无法进行回复，请不要发送询问内容",
        reminds: [
          {
            "time": "2018-09-07 18:11",
            "content": "推送内容息将通过公众号推送给患者，患者无法进行回复，请不要发送询问内容发送的消息将通过公众号推送给患者，患者无法进行回复，请不要发送询问内容发送的消息将通过公众号推送给患者",
            "sendStatus": SEND_STATUS_SUCCESS
          }
        ],
        msg: "",
        mescroll: null, //mescroll实例对象
        pageSize: 10,
        currentPage: 1,
      }
    },
    methods: {
      // 判断成功、失败、重新发送按钮是否显示
      checkShow: function (sendStatus, isSuccess) {
        if (sendStatus === SEND_STATUS_SUCCESS) {
          return isSuccess;
        } else if (sendStatus === SEND_STATUS_FAILURE) {
          return !isSuccess;
        } else {
          return false;
        }
      },
      // 发送消息
      onSendMsgClick: function () {
        if (this.msg != null && this.msg.length !== 0) {
          let data = {
            "time": "2018-09-07 18:11",
            "content": this.msg,
            "sendStatus": SEND_STATUS_SUCCESS
          }
          this.reminds.push(data);
          this.msg = "";
          let container = document.querySelector(".containerMsgItem");
          let timer = setInterval(function () {
            container.scrollTo(0, container.scrollHeight); // 发送成功后滚动消息到最底部
            clearInterval(timer);
          }, 500);
        }
      },
      downCallback: function () {
        let timer = setInterval(() => {
          let arr = []
          for (let i = 0; i < 10; i++) {
            var obj = {};
            obj.time = "2018-09-07 18:11";
            obj.content = i;
            obj.sendStatus = SEND_STATUS_SUCCESS;
            arr.push(obj)
          }
          for (let i = arr.length - 1; i >= 0; i--) {
            this.reminds.splice(0, 0, arr[i]);
          }
          this.mescroll.endSuccess();
          clearInterval(timer);
          // this.mescroll.lockDownScroll(true);  // 无数据禁用
        }, 1000);
      }
    },
    components: {
      commomHeader
    },
    mounted() {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {
          callback: null
        },
        down: {
          use: true,
          callback: this.downCallback,
          auto: false,
          htmlContent: '<p class="downwarp-progress" style="font-size: 0.2rem"></p><p class="downwarp-tip" style="font-size: 0.2rem">下拉查看更多消息 </p>', //布局内容
          inited: function (mescroll, downwarp) {
            //初始化完毕的回调,可缓存dom
            mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
            mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
          },
          inOffset: function (mescroll) {
            //进入指定距离offset范围内那一刻的回调
            if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = "下拉查看更多消息";
            if (mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
          },
          outOffset: function (mescroll) {
            //下拉超过指定距离offset那一刻的回调
            if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = "释放查看更多消息";
          }
        }
      });
    },
  }
</script>
