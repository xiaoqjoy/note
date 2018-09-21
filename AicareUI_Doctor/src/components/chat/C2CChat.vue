<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-gallery="http://www.w3.org/1999/xhtml">
  <div class="fullPage">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="true"
                  :rightText="rightText"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerMsgItem">
      <div class="item" v-for="item in msgs">
        <label class="time">{{parseTime(item.MsgTimeStamp)}}</label>
        <div class="containerItemLeft" v-if="checkIsLeft(item)">
          <img class="imgLeft" src="../../assets/logo.png" />
          <div class="containerDisease" v-if="checkMsgTypeIsImageAndText(item)">
            <div style="display: inline-block;"
                 v-for="(imgAndTextItem, index) in item.MsgBody">
              <div v-if="index===0">
                <label class="labelDisease0">疾病名称</label>
                <label class="labelDisease1">{{imgAndTextItem.MsgContent.Text}}</label>
              </div>
              <div v-if="index===1">
                <label class="labelDisease0">咨询内容</label>
                <label class="labelDisease1">{{imgAndTextItem.MsgContent.Text}}</label>
                <label class="labelDisease0">病例/检查报告/照片</label>
              </div>
              <img v-if="index !==0 && index !==1" class="imgDisease"
                   v-bind:src="imgAndTextItem.MsgContent.ImageInfoArray[2].URL"
              />
            </div>
          </div>
        </div>
        <div class="containerItemRight" v-else>
          <img class="imgRight" src="../../assets/logo.png">
          <label class="labelMsgRight">{{item.MsgBody[0].MsgContent.Text}}</label>
        </div>
      </div>
    </div>
    <div class="containerBottom">
      <input class="inputMsg" placeholder="请输入内容..." v-model="sendTextContent"/>
      <div class="containerSendMsg" @click="onSendMsgClick">
        <img class="imgSendMsg" src="../../../static/images/remind/icon_send.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  import commomHeader from "../commomComponents/header";
  import {imModel} from "../../imModel/imModel"
  import {dateFormat} from "../../utils/dateFormat"

  export default {
    name: 'C2CChat', // 单聊页面
    data() {
      return {
        msgs: [],
        headerTitle: "赵忠",
        rightText: "结束咨询",
        receivedMsg: '',
        webim: require('../../../static/js/tencentIMJS/webim.js'),
        accountType: 37073,
        accountMode: 2,// 账号模式，1.托管，其他独立
        // sdkAppID: 1400121938,
        sdkAppID: 1400124203,
        toId: 'admin', // 接收方id
        identifier: 'test', // 当前登录用户id
        identifierNick: '', // 当前登录用户设置昵称
        // 登录用户签名
        userSig: 'eJxl0FFLwzAUBeD3-orQV0WTpl3HwIc6y1Cca3Fr615CTNKZjrUxzYat*N8dUTDgff0OHM799AAA-vrx*Yoy1h1bQ8yghA9mwIf*5R8qJTmhhmDN-6H4UFILQmsjtEWMIjyB53NCkovWyFr*RozojaM93xPbYRGFEKIgDCB2I3JncZlu5vcLOs0X7L1j7UWdlfqtEfSwMvPb3RZm5TY-jdf4WIfDpCrGRKZJTHlm8NO*HIbiQSQvDU-y-hXhihW8rfh6dTfSRqgSp8sbp9LIw88rznuiGKE4mjp6ErqXXWsDAUQRCjC0o70v7xuEzl4c',
        md5: require('../../../static/js/tencentIMJS/spark-md5.js'),
        selSess: null, // 单聊session
        images: null, // 上传成功后的图片对象
        sendTextContent: '',// 发送文本内容
      }
    },
    methods: {
      // IM登录
      onLoginIM: function () {
        imModel.login(this.sdkAppID, this.identifier, this.identifierNick, this.userSig, this.toId, (newMsgList) => {
          console.log("receiveMsg-->" + JSON.stringify(newMsgList));
          for (let j in newMsgList) {//遍历新消息
            const newMsg = newMsgList[j];
            console.log("receiveId" + newMsg.getSession().id());
            if (newMsg.getSession().id() === this.toId) {//为当前聊天对象的消息
              if (newMsg.elems != null && newMsg.elems.length > 0) {

              }
            }
          }
        }, (res) => {
          console.log(res);
          if (res.ActionStatus === "OK") {
            this.receivedMsg = '登录成功'
            this.selSess = imModel.initSession(this.toId);
          }
        });
      },

      // 发送文本消息
      onSendMsgClick: function () {
        const msgToSend = this.sendTextContent;//最大长度1200
        if (msgToSend.trim().length === 0 || msgToSend.trim().length > 1200) {
          return;
        }
        if (!this.selSess) {
          this.selSess = imModel.initSession(this.toId);
        }
        imModel.sendTextMsg(this.selSess, this.toId, this.identifier, this.identifierNick, this.sendTextContent, (resp) => {
          this.sendTextContent = "";
          this.msgs.push(webim.currentMsg);
          this.scrollToBottom();
        }, (err) => {
          console.log(err.ErrorInfo)
          this.receivedMsg = '发送失败';
        })
      },

      // 发送图片消息
      sendPic: function () {
        if (!this.selSess) {
          imModel.initSession(this.toId);
        }
        imModel.sendImageMsg(this.selSess, this.images, (resp) => {
          console.log("send pic result-->" + JSON.stringify(resp));
          this.receivedMsg = '发送图片成功';
        }, (err) => {
          console.log(err.ErrorInfo)
          this.receivedMsg = '发送图片失败';
        })
      },

      // 上传文件
      uploadFile: function () {
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        imModel.uploadFile(inputDOM, this.identifier, this.toId, (resp) => {
          console.log("uploadResult-->" + JSON.stringify(resp));
          this.images = resp;
          this.receivedMsg = '上传图片成功';
        }, (err) => {
          console.log(err.ErrorInfo)
        })
      },

      // 检测是否消息是否显示在左边
      checkIsLeft: function (item) {
        return item.From_Account !== this.identifier;// 发送方非当前登录用户，消息显示在左边
      },

      // 检测消息类型是否为图文消息
      checkMsgTypeIsImageAndText: function (item) {
        return item.MsgBody.length >= 3;
      },

      // 滚动条置于最低端
      scrollToBottom: function () {
        let container = document.querySelector(".containerMsgItem");
        let timer = setInterval(() => {
          // container.scrollTo(0, container.scrollHeight); // 发送成功后滚动消息到最底部
          container.scrollTop = container.scrollHeight;
          clearInterval(timer);
        }, 500);
      },

      // 解析时间
      parseTime: function (time) {
        return dateFormat.getFormatDateByLong(time * 1000, "yyyy-MM-dd hh:mm");
      },

    },
    components: {
      commomHeader,
    },
    mounted() {
      this.onLoginIM();
      this.msgs = [
        {
          "From_Account": "admin",
          "To_Account": "test",
          "MsgSeq": 6978504,
          "MsgRandom": 3138173870,
          "MsgTimeStamp": 1535702820,
          "NoticeSeq": 1,
          "MsgBody": [
            {
              "MsgType": "TIMTextElem",
              "MsgContent": {
                "Text": "糖尿病足"
              }
            },
            {
              "MsgType": "TIMTextElem",
              "MsgContent": {
                "Text": "医生，我最近脚一直感觉不舒服，有点浮肿，不知道是不是有糖......"
              }
            },
            {
              "MsgType": "TIMImageElem",
              "MsgContent": {
                "UUID": "731090_03537481E43ECBB250F4FBC5A79C9E5F",
                "ImageFormat": 255,
                "ImageInfoArray": [
                  {
                    "Type": 1,
                    "Size": 731090,
                    "Width": 1080,
                    "Height": 1440,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/0"
                  },
                  {
                    "Type": 2,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/720"
                  },
                  {
                    "Type": 3,
                    "Size": 12833,
                    "Width": 198,
                    "Height": 264,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/198"
                  }
                ]
              }
            },
            {
              "MsgType": "TIMImageElem",
              "MsgContent": {
                "UUID": "731090_03537481E43ECBB250F4FBC5A79C9E5F",
                "ImageFormat": 255,
                "ImageInfoArray": [
                  {
                    "Type": 1,
                    "Size": 731090,
                    "Width": 1080,
                    "Height": 1440,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/0"
                  },
                  {
                    "Type": 2,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/720"
                  },
                  {
                    "Type": 3,
                    "Size": 12833,
                    "Width": 198,
                    "Height": 264,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/198"
                  }
                ]
              }
            },
            {
              "MsgType": "TIMImageElem",
              "MsgContent": {
                "UUID": "731090_03537481E43ECBB250F4FBC5A79C9E5F",
                "ImageFormat": 255,
                "ImageInfoArray": [
                  {
                    "Type": 1,
                    "Size": 731090,
                    "Width": 1080,
                    "Height": 1440,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/0"
                  },
                  {
                    "Type": 2,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/720"
                  },
                  {
                    "Type": 3,
                    "Size": 12833,
                    "Width": 198,
                    "Height": 264,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/198"
                  }
                ]
              }
            },
            {
              "MsgType": "TIMImageElem",
              "MsgContent": {
                "UUID": "731090_03537481E43ECBB250F4FBC5A79C9E5F",
                "ImageFormat": 255,
                "ImageInfoArray": [
                  {
                    "Type": 1,
                    "Size": 731090,
                    "Width": 1080,
                    "Height": 1440,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/0"
                  },
                  {
                    "Type": 2,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/720"
                  },
                  {
                    "Type": 3,
                    "Size": 12833,
                    "Width": 198,
                    "Height": 264,
                    "URL": "http://p.qpic.cn/opensdk_im/0/6993115784956933836_0_03537481E43ECBB250F4FBC5A79C9E5F/198"
                  }
                ]
              }
            }
          ]
        },
        {
          "From_Account": "test",
          "To_Account": "admin",
          "MsgSeq": 1678058,
          "MsgRandom": 579465565,
          "MsgTimeStamp": 1535708667,
          "NoticeSeq": 5,
          "MsgBody": [
            {
              "MsgType": "TIMTextElem",
              "MsgContent": {
                "Text": "推送内容息将通过公众号推送给患者，患者无法进行回复，请不要发送询问内容发送的消息将通过公众号推送给患者，患者无法进行回复，请不要发送询问内容发送的消息将通过公众号推送给患者"
              }
            }
          ]
        },
        {
          "From_Account": "test",
          "To_Account": "admin",
          "MsgSeq": 1678058,
          "MsgRandom": 579465565,
          "MsgTimeStamp": 1535708667,
          "NoticeSeq": 5,
          "MsgBody": [
            {
              "MsgType": "TIMTextElem",
              "MsgContent": {
                "Text": "阿道夫"
              }
            }
          ]
        }
      ];
      this.scrollToBottom();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .fullPage {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerMsgItem {
    width: 100%;
    height: 85%;
    padding: 0.3rem 0 0.3rem 0;
    overflow-y: scroll;
  }

  .item {
    width: 100%;
    float: left;
    padding: 0.3rem 0 0.3rem 0;
  }

  .time {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 0.28rem;
    color: #999999;
  }

  .containerItemLeft {
    width: 88%;
    margin: 0.33rem;
  }

  .imgLeft {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    float: left;
    margin: 0 0.36rem 0 0;
  }

  .containerDisease {
    display: inline-block;
    max-width: 78%;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 0.3rem 0.3rem 0.2rem 0.3rem;
    float: left;
    text-align: left;
  }

  .labelDisease0 {
    display: block;
    font-size: 0.26rem;
    color: #999999;
    margin: 0 0 0.1rem 0;
  }

  .labelDisease1 {
    display: block;
    font-size: 0.3rem;
    color: #333333;
    margin: 0 0 0.3rem 0;
  }

  .imgDisease {
    display: inline-block;
    width: 1.11rem;
    height: 1.11rem;
    background-color: #f4f4f4;
    border-radius: 0.04rem;
    margin: 0 0.3rem 0.1rem 0;
  }

  .containerItemRight {
    width: 100%;
    padding: 0.33rem 0.36rem;
  }

  .labelMsgRight {
    display: inline-block;
    max-width: 78%;
    float: right;
    margin-right: 0.3rem;
    background-color: #78adf7;
    border-radius: 0.06rem;
    font-size: 0.30rem;
    color: #fefefe;
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    text-align: left;
  }

  .imgRight {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    float: right;
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
