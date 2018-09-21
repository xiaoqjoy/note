<template>
  <div class="containerRoot">
    <commomHeader :headerTitle="headerTitle"
                  :rightIsShow="false"
                  :showAdd="false"
                  :goBackTwo="false"
    >
    </commomHeader>
    <div class="containerSessionItem" ref="meScroll">
      <div class="item" v-for="item in reminds">
        <img class="imgHeader" src="../../assets/logo.png"/>
        <label class="labelNickname">{{item.nickname}}</label>
        <label class="labelTime">{{item.time}}</label>
        <label class="labelContent">{{item.content}}</label>
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

  .containerSessionItem {
    width: 100%;
    overflow-y: scroll;
  }

  .item {
    width: 100%;
    height: 1.4rem;
    padding: 0.35rem 0.35rem 0.3rem 0.3rem;
    border-bottom: 0.01rem solid #e0e0e0;
    background-color: #ffffff;
  }

  .imgHeader {
    width: 0.80rem;
    height: 0.80rem;
    border: solid #f4f4f4;
    border-radius: 0.8rem;
    float: left;
  }

  .labelNickname {
    font-size: 0.34rem;
    color: #333333;
    float: left;
    padding-left: 0.44rem;
  }

  .labelTime {
    font-size: 0.26rem;
    color: #999999;
    float: right;
  }

  .labelContent {
    display: inline-block;
    width: 81%;
    white-space: nowrap;
    font-size: 0.30rem;
    color: #999999;
    float: left;
    margin-left: 0.44rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

</style>
<script>
  import commomHeader from "../commomComponents/header";
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  export default {

    name: "remindMsgList",  // 提醒消息列表

    data() {
      return {

        headerTitle: "提醒消息",
        reminds: [
          {
            "nickname": "王大拿",
            "time": "15:06",
            "content": "后一条消息显示一行就好，其他的省略11212121212...",
            "headUrl": ""
          },
          {
            "nickname": "李芳菲",
            "time": "2018-09-10",
            "content": "后一条消息显示一行就好，其他的省略...",
            "headUrl": ""
          },
          {
            "nickname": "赵美丽",
            "time": "2017-09-10",
            "content": "后一条消息显示一行就好，其他的省略...",
            "headUrl": ""
          }

        ],
        meScroll: null, //mescroll实例对象
        pageSize: 10,
        currentPage: 1,
      }
    },
    methods: {
      downCallback: function () {
        let timer = setInterval(() => {
          this.meScroll.endSuccess();
          clearInterval(timer);
          // this.mescroll.lockDownScroll(true);  // 无数据禁用
        }, 1000);
      }
    },
    components: {
      commomHeader
    },
    mounted() {
      this.meScroll = new MeScroll(this.$refs.meScroll, {
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
