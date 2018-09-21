<template>
  <div class="tablePage">
       <table class="reportTable">
              <thead>
                  <tr>
                    <th rowspan="2" class="gray line">
                      <p class="time">时段</p>
                      <p class="date">日期</p>
                    </th>
                    <th rowspan="2">凌 晨</th>
                    <th colspan="2" class="gray">早餐</th>
                    <th colspan="2">午餐</th>
                    <th colspan="2" class="gray">晚餐</th>
                    <th rowspan="2">睡 前</th>
                  </tr>
                  <tr>
                    <th class="gray">空腹</th>
                    <th class="gray">后</th>
                    <th>前</th>
                    <th>后</th>
                    <th class="gray">前</th>
                    <th class="gray">后</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="(item,index) in sugerTestList" :key="index">
                    <td colspan="2"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                 </tr>
              </tbody>
              <tfoot v-show="tfootIsShow">
                  <tr><td colspan="10">没有数据了</td></tr>
              </tfoot>
          </table>
  </div>
</template>

<script>
    export default {
        name:"myTable",
        data (){
          return {}
        },
        methods: {
            // clickSugarValue: function (date, item, index) {
            //     // flag为true , 代表同一时段有多条数据 , 有三角标 , 展开一天多条的数据框
            //     if(this.toStr(this.$parent.$route.query.isWeekDate) == ''){ // 通过判断isWeekDate参数是否为空字段来判断是血糖表格页还是周报月报页
            //         console.log(item);
            //         this.ajax('get', '/sugarTest/v1/queryDayData', {timeType: index, dateTime:date}, function (res) {
            //             console.log(res);
            //         })
            //     }
            // }
        },
        props: ['sugerTestList','toThisDayDetail','tfootIsShow','clickSugarValue']
    }
</script>

<style lang="less" scoped type="text/less">
  .tablePage{
    width: 100%;
    margin-bottom: 1rem;
    .gray{
      background-color: #fbfbfb;
    }
  }
  .reportTable .line{
    position: relative;
    background: linear-gradient(45deg, transparent 49.5%, #e9ebef 49.5%, #e9ebef 50.5%, transparent 50.5%);
  }
  .reportTable .line .time{
    position: absolute;
    top: 0;
    right: 0;
  }
  .reportTable .line .date{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .reportTable{
    width: 100%;
    font-size: 0.36rem;
    border-collapse: collapse;
  }
  .reportTable th{
    height: 0.4rem;
    border: 1px solid #e9ebef;
    width: 2em;
    font-weight: normal;
    font-size: 0.28rem;
  }
  .reportTable .time{
    height: 0.4rem;
  }
  .reportTable .date{
    height: 0.4rem;
  }
  .reportTable td{
    border: 1px solid #d4d4d4;
  }
  .bgGray{
    background-color: #f9f9f9;
  }
</style>
