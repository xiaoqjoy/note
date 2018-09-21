<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    ></commomHeader>
    <div class="containerRemind">
      <div class="imgRemind"></div>
      <label class="labelTitle">提醒消息</label>
      <label class="labelTime">11:00</label>
      <label class="labelContent">后一条消息显示一行就好，其他的省略其他的省略其他的省略...</label>
    </div>
    <div v-for="item in sessions">
      <div class="containerRemind">
        <img class="imgHeader" src="../../assets/logo.png"/>
        <label class="labelUnreadCount" v-if="item.unreadCount > 0">{{item.unreadCount}}</label>
        <label class="labelTitle">{{item.nickname}}</label>
        <label class="labelTime">{{item.time}}</label>
        <label class="labelContent">{{item.lastMessage}}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .containerRoot {
    width: 100%;
    height: 100%;
    background-color: #f3f3f7;
  }

  .containerRemind {
    position: relative;
    width: 100%;
    height: 1.4rem;
    padding: 0.3rem;
    text-align: left;
    border-bottom: 1px solid #CECECE;
    background: white;
  }

  .imgRemind {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background-image: url("../../../static/images/icon.png");
    background-repeat: no-repeat;
    background-position: -0.02rem -19.83rem;
    background-size: 7.52rem 38rem;
  }

  .imgHeader {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid #f4f4f4;
    border-radius: 0.8rem;
  }

  .labelTitle {
    position: absolute;
    top: 0.2rem;
    margin-left: 0.4rem;
    font-size: 0.34rem;
    color: #333333;
    text-align: left;
  }

  .labelContent {
    display: inline-block;
    width: 76%;
    position: absolute;
    bottom: 0.25rem;
    margin-left: 0.4rem;
    font-size: 0.3rem;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .labelTime {
    position: absolute;
    right: 0.3rem;
    top: 0.25rem;
    font-size: 0.26rem;
    color: #999999;
  }

  .labelUnreadCount {
    display: inline-block;
    position: absolute;
    left: 0.8rem;
    top: 0.25rem;
    width: 0.32rem;
    height: 0.32rem;
    background-color: #ff2e33;
    font-size: 0.22rem;
    color: #ffffff;
    border-radius: 0.32rem;
    text-align: center;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";

  export default {
    name: "messageList",  // 首页消息列表

    data() {
      return {
        headerTitle: "消息",
        sessions: [
          {
            "nickname": "王大拿", "lastMessage": "后一条消息显示一行就好，其他的省略其他的省略其他的省略...", "time": "2018-09-10", "unreadCount": "1"
          },
          {
            "nickname": "李芳菲", "lastMessage": "后一条消息显示一行就好，其他的省略其他的省略其他的省略...", "time": "2018-09-10", "unreadCount": "0"
          },
          {
            "nickname": "赵美丽", "lastMessage": "后一条消息显示一行就好，其他的省略其他的省略其他的省略...", "time": "2018-09-10", "unreadCount": "0"
          }
        ],
      }
    },
    methods: {},
    components: {
      commomHeader
    },
  }
</script>
