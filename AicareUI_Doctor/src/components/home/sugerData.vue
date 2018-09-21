<template>
    <div class="suger_data">
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <div class="suger_chart">

        <div id="myChart"></div>
        <ul>
          <li class="normal">
            <span><b>50</b>次</span>
            <span><i></i>正常</span>
          </li>
          <li class="high">
            <span><b>30</b>次</span>
            <span><i></i>偏高</span>
          </li>
          <li class="low">
            <span><b>20</b>次</span>
            <span><i></i>偏低</span>
          </li>
        </ul>
      </div>

      <div v-if="tip">
        <myTips></myTips>
      </div>

      <div class="tableBox">
        <myTable :sugerTestList="sugerTestList" :toThisDayDetail="toThisDayDetail" :clickSugarValue="clickSugarValue" :tfootIsShow = "tfootIsShow"></myTable>
      </div>

    </div>
</template>
<script>
  var echarts = require('echarts/lib/echarts');
  var pie = require("echarts/lib/chart/pie");

  import myTable from '../chat/myTable'
  import myTips from '../chat/tips'

    export default {
        name: '',
        data() {
            return {
              headerTitle: '血糖数据',
              sugerTestList: '',
              toThisDayDetail: '',
              clickSugarValue: '',
              tfootIsShow: false,
              tip: false
            }
        },
        mounted: function(){
          this.drawLine();
        },
        methods: {
          drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
              color: ['#71debf',  '#fb789a', '#f3b88c'],
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['正常','偏高','偏低']
              },
              series: [
                {
                  type:'pie',
                  radius: ['50%', '100%'],
                  avoidLabelOverlap: false,
                  hoverAnimation: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:50},
                    {value:30},
                    {value:20}
                  ]
                }
              ]
            });
          }
        },
        created: function(){
          console.log(echarts);
          console.log(pie);
        },
        components:{
          myTable,
          myTips
        }
    }
</script>
<style lang="less" scoped type="text/less">
  .suger_data{
    .suger_chart{
      #myChart{
        width: 0.9rem;
        height: 0.9rem;
        display: inline-block;
        float: left;
        margin-top: 0.56rem;
        margin-left: 1.11rem;
      }
      height: 2.02rem;
      line-height: 2.02rem;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      ul{
        display: inline-block;
        float: left;
        margin-left: 0.6rem;
        margin-top: 0.5rem;
        li{
          float: left;
          height: 1rem;
          line-height: 1rem;
          width: 1rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          flex: 1;
          margin-left: 0.2rem;
          span{
            height: 0.5rem;
            line-height: 0.5rem;
            b{
              font-size: 0.38rem;
              margin-right: 0.1rem;
            }
            i{
              width: 0.12rem;
              height: 0.12rem;
              border-radius: 50%;
              margin-right: 0.1rem;
            }
          }
        }
        li.normal b{
          color: #71debf;
        }
        li.normal i{
          background-color: #71debf;
        }
        li.high b{
          color: #fb789a;
        }
        li.high i{
          background-color: #fb789a;
        }
        li.low b{
          color: #f3b88c;
        }
        li.low i{
          background-color: #f3b88c;
        }
      }
    }
    .tableBox{
      width: 100%;
    }
  }
</style>
