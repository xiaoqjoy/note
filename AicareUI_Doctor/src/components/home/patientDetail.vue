<template>
    <div class="patient_detail">
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <div class="patient_info">
        <ul>
          <li class="sick">
            <img src="../../../static/images/female_b.png">
            <div class="info">
              <span>小丽<i class="female">1型</i></span>
              <span>女<b>18岁</b></span>
            </div>
          </li>
          <li class="param">
            <div class="measure">
              <i></i>累计测量 <b>300</b>次
            </div>
            <div class="paper">
              <i></i>购买试纸 <b>60</b>盒
            </div>
          </li>
          <li class="param">
            <div class="equipment">
              <i></i>设备
            </div>
            <div class="number">
              <b>568953458526</b>
              <b>568953458526</b>
              <b>568953458526</b>
              <b>568953458526</b>
            </div>
          </li>
        </ul>
      </div>
      <ul class="edit">
        <li>
          <i class="group"></i>分组
          <div class="open">
            特别关注<i></i>
          </div>
        </li>
        <li @click="openRecord">
          <i class="record"></i>健康档案
          <div class="open"><i></i></div>
        </li>
        <li @click="openSugerData">
          <i class="suger"></i>血糖数据
          <div class="open"><i></i></div>
        </li>
      </ul>
      <div class="footer">发送提醒</div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
              headerTitle: '患者详情'
            }
        },
        methods: {
          openRecord: function(){
            this.$router.push("/home/record");
          },
          openSugerData: function(){
            this.$router.push('/home/sugerData')
          }
        }
    }
</script>
<style lang="less" scoped type="text/less">
  .patient_detail{
    background: #F3F3F3;
    .patient_info{
      height: 3.4rem;
      width: 100%;
      background: #94BFFB;
      ul li.param{
        display: block;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        color: white;
        i{
          display: inline-block;
          width: 0.18rem;
          height: 0.24rem;
          background: url("../../../static/images/icon.png") no-repeat;
          zoom: 0.5;
          text-align: center;
          line-height: 1rem;
          color: white;
          font-size: 0.5rem;
          margin-right: 15px;
          margin-left: 0.5rem;
          background-size: 7.52rem 38rem;
        }
        .info{
          margin-top: 0.2rem;
        }
        .measure{
          float: left;
          i{
            background-position: 0rem -1.74rem;
          }
        }
        .equipment{
          float: left;
          text-align: center;
          height: 0.87rem;
          i{
            background-position: -0.02rem -0.57rem;
          }
        }
        .number{
          text-align: left;
          b{
            margin-left: 0.3rem;
          }
        }
        .paper{
          i{
            width: 0.22rem;
            background-position: -0.02rem -1rem;
          }
        }
        img{
          height: 1.2rem;
          width: 1.2rem;
        }
      }
      li.sick{
        height: 1.6rem!important;
        background: none;
        border-bottom: none;
        color: white;
      }
    }
    ul.edit{
      width: 100%;
      background: #ffffff;
      font-size: 0.34rem;
      margin-top: 0.2rem;
      li{
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #F3F3F3;
        text-align: left;
        span{
          float: right;
          margin-right: 0.3rem;
          color: #619aeb;
        }
        i{
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background: url("../../../static/images/icon.png") no-repeat;
          zoom: 0.5;
          margin-left: 0.5rem;
          margin-right: 0.3rem;
          vertical-align: text-bottom;
          background-size: 7.52rem 38rem;
        }
        i.group{
          background-position: -0.01rem -13.32rem;
        }
        i.record{
          background-position: -0.01rem -12.55rem;
        }
        i.suger{
          background-position: -0.01rem -14.98rem;
        }
        .open{
          float: right;
          i{
            width: 0.2rem;
            height: 0.2rem;
            background-position: -0.01rem -1.27rem;
            vertical-align: baseline;
          }
        }
      }
    }
    .footer{
      background: #FB789A;
    }
  }

</style>
