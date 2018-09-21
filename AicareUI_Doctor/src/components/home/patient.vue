<template>
    <div>
      <header-nav :headerTitle="headerTitle" @click="add" :rightHandle="rightHandle" :goBackTwo='true'></header-nav>
      <div class="patient_detail">
        <ul class="data">
          <li @click="sugerManager">
            <i class="check">22</i><span>今日测量</span>
          </li>
          <li>
            <i class="tcheck">225</i><span>3天未测</span>
          </li>
          <li>
            <i class="scheck">212</i><span>7天未测</span>
          </li>
          <li>
            <i class="add">322</i><span>今日新增</span>
          </li>
          <li>
            <i class="total">242</i><span>总患者</span>
          </li>
        </ul>
        <ul class="group">
          <li>
            <i class="patient_group"></i>患者分组
            <button @click="edit">编辑分组</button>
          </li>
          <li>
            <i class="no_group"></i>未分组 (60)
          </li>
          <li>
            <i class="open_group"></i>特别关注 (6)
          </li>
          <li class="sick">
            <img src="../../../static/images/female_s.png">
            <div class="info">
              <span>小丽<i class="female">1型</i></span>
              <span>女<b>18岁</b></span>
            </div>
          </li>
          <li class="sick">
            <img src="../../../static/images/male_s.png">
            <div class="info">
              <span>老王<i>1型</i></span>
              <span>男<b>58岁</b></span>
            </div>
          </li>
        </ul>
      </div>
      <footer-nav></footer-nav>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
              headerTitle: '我的患者',
              rightHandle: '添加'
            }
        },
        methods: {
          add: function(){
            this.$emit("handle")
          },
          edit: function(){
            this.$router.push("/home/edit");
          },
          sugerManager: function(){
            console.log('血糖管理')
            this.$router.push("/home/sugerManager");
          }
        },
        components: {
        },
    }
</script>
<style lang="less" scoped type="text/less">
  .patient_detail{
    width: 100%;
    height: 100%;
    background: #F3F3F3;
    ul.data{
      display: inline-block;
      height: 2rem;
      background: #ffffff;
      width: 100%;
      li{
        float: left;
        width: 20%;
        margin-top: 0.28rem;
        span{
          width: 100%;
          display: inline-block;
          font-size: 0.28rem;
          color: #666666;
        }
        i{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: url("../../../static/images/icon.png") no-repeat;
          zoom: 0.5;
          text-align: center;
          line-height: 1rem;
          color: white;
          font-size: 0.5rem;
          background-size: 7.52rem 38rem;
        }
        i.check{
          background-position: -0.06rem -25.95rem;
        }
        i.tcheck{
          background-position: -0.06rem -22.64rem;
        }
        i.scheck{
          background-position: -0.06rem -24.84rem;
        }
        i.add{
          background-position: -0.06rem -23.73rem;
        }
        i.total{
          background-position: -0.06rem -21.55rem;
        }
    }
    }
    ul.group{
      margin-top: 0.3rem;
      width: 100%;
      background: #ffffff;
      font-size: 0.34rem;
      li{
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #F3F3F3;
        text-align: left;
        button{
          height: 0.5rem;
          width: 1.5rem;
          border-radius: 0.25rem;
          border: 1px solid #78adf7;
          line-height: initial;
          background: transparent;
          color: #78adf7;
          float: right;
          margin-top: 0.25rem;
          margin-right: 0.29rem;
          font-size: 0.28rem;
        }
        i.no_group{
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          zoom: 0.5;
          background: url("../../../static/images/icon.png") no-repeat;
          background-size: 7.52rem 38rem;
          background-position: 0 -1.28rem;
        }
        i.open_group{
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          zoom: 0.5;
          background: url("../../../static/images/icon.png") no-repeat;
          background-size: 7.52rem 38rem;
          background-position: 0 0.04rem;
        }
        i.patient_group{
          width: 0.05rem;
          height: 0.36rem;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          display: inline-block;
          background: #78adf7;
          vertical-align: middle;
        }
      }
    }
  }
</style>
