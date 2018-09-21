<template>
    <div class="record">
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <ul>
        <li class="tip">基本信息</li>
        <li>
          <i class="name"></i>姓名
          <input type="text" value="" placeholder="赵某某">
        </li>
        <li>
          <i class="id"></i>身份证号
          <input type="text" value="" placeholder="未填写">
        </li>
        <li>
          <i class="birthday"></i>出生日期
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="sex"></i>性别
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="phone"></i>手机号
          <input type="text" value="" placeholder="未填写">
        </li>

        <li>
          <i class="marry"></i>婚姻状态
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="job"></i>职业
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="address"></i>家庭住址
          <span>请选择地址<i></i></span>
        </li>
        <li class="btn">
          <textarea placeholder="请填写详细地址"></textarea>
        </li>
        <li class="tip">病例信息</li>
        <li>
          <i class="sugerType"></i>糖尿病类型
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="date"></i>确诊日期
          <span>未选择<i></i></span>
        </li>

        <li>
          <i class="height"></i>身高
          <input type="text" value="" placeholder="未填写">
        </li>
        <li>
          <i class="weight"></i>体重
          <input type="text" value="" placeholder="未填写">
        </li>
        <li>
          <i class="bmi"></i>BMI
          <input type="text" value="" placeholder="自动计算">
        </li>

        <li>
          <i class="complication"></i>并发症
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="treat"></i>治疗方式
          <input type="text" value="" placeholder="未填写">
        </li>

        <li>
          <i class="doctor"></i>就诊医生
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="nurse"></i>教育护士
          <span>未选择<i></i></span>
        </li>
        <li class="tip">生活习惯</li>

        <li>
          <i class="labour"></i>劳动强度
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="exercise"></i>锻炼情况
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="sleep"></i>夜间睡眠时间
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="emotion"></i>平时情绪
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="food"></i>饮食偏好
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="smoke"></i>吸烟情况
          <span>未选择<i></i></span>
        </li>
        <li class="btn">
          <textarea placeholder="请输入戒烟前吸烟情况"></textarea>
        </li>
        <li>
          <i class="drink"></i>饮酒情况
          <span>未选择<i></i></span>
        </li>
        <li>
          <i class="type"></i>类型
          <span>白酒<i></i></span>
        </li>
        <li class="btn">
          <textarea placeholder="请输入每天摄入量(毫升/天)"></textarea>
        </li>
        <li class="tip">健康综述</li>
        <li class="btn">
          <textarea placeholder="请填写详细内容"></textarea>
        </li>
        <li class="tip">备注</li>
        <li class="btn">
          <textarea placeholder="请填写详细内容"></textarea>
        </li>
        <li class="btn">
          <button>提交</button>
        </li>
      </ul>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
              headerTitle: '健康档案'
            }
        },
        methods: {}
    }
</script>
<style lang="less" scoped type="text/less">
  .record{
    ul{
      li{
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.36rem;
        text-align: left;
        color: #333333;
        border-bottom: 1px solid #f4f4f4;
        button{
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          width: 90%;
          background-color: #78adf7;
          border-radius: 0.08rem;
          color: white;
          margin: 0.5rem 5%;
          outline: none;
        }
        textarea{
          height: 1.7rem;
          width: 100%;
          border-bottom: 1px solid #f4f4f4;
          border-top: none;
          border-right: none;
          border-left: none;
          text-align: right;
          padding-right: 0.33rem;
        }
        input{
          float: right;
          height: 1rem;
          margin: 0.1rem 0.6rem 0.1rem 0;
          text-align: right;
        }
        span{
          float: right;
          i{
            width: 0.15rem;
            height: 0.2rem;
            background-position: 0 -1.28rem;
          }
        }
        i{
          display: inline-block;
          width: 0.36rem;
          height: 0.36rem;
          background: url("../../../static/images/icon.png") no-repeat;
          zoom: 0.5;
          margin-left: 0.3rem;
          margin-right: 0.2rem;
          background-size: 7.52rem 38rem;
        }
        i.name{
          background-position: 0 -6.8rem;
        }
        i.id{
          background-position: 0 -8.96rem;
        }
        i.birthday{
          background-position: 0 -10.04rem;
        }
        i.sex{
          background-position: 0 -9.69rem;
        }
        i.phone{
          background-position: 0 -7.52rem;
        }
        i.marry{
          background-position: 0 -5.36rem;
        }
        i.job{
          background-position: 0 -8.61rem;
        }
        i.address{
          background-position: 0 -5.01rem;
        }
        i.sugerType{
          background-position: 0 -6.45rem;
        }
        i.date{
          background-position: 0 -8.25rem;
        }
        i.height{
          background-position: 0 -7.89rem;
        }
        i.weight{
          background-position: 0 -5.72rem;
        }
        i.bmi{
          background-position: 0 -11.12rem;
        }
        i.complication{
          background-position: 0 -10.4rem;
        }
        i.treat{
          background-position: 0 -3.2rem;
        }
        i.doctor{
          background-position: 0 -3.93rem;
        }
        i.nurse{
          background-position: 0 -4.29rem;
        }
        i.labour{
          background-position: 0 -3.56rem;
        }
        i.exercise{
          background-position: 0 -6.08rem;
        }
        i.sleep{
          background-position: 0 -9.32rem;
        }
        i.emotion{
          background-position: 0 -11.48rem;
        }
        i.food{
          background-position: 0 -7.16rem;
        }
        i.smoke{
          background-position: 0 -12.2rem;
        }
        i.drink{
          background-position: 0 -4.64rem;
        }
        i.type{
          background-position: 0 -11.85rem;
        }
      }
      li.btn{
        border-bottom: none;
        height: 1.7rem;
        line-height: 0.8rem;
      }
      li.tip{
        height: 0.8rem;
        background: #f4f4f4;
        color: #666666;
        text-indent: 0.3rem;
        text-align: left;
        font-size: 0.32rem;
        line-height: 0.8rem;
        display: inline-block;
      }
    }
  }
</style>
