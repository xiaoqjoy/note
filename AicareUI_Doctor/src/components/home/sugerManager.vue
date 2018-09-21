<template>
    <div class="sugerManager">
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <div class="nav" ref="tab">
        <ul ref="tabWrapper">
          <li ref="tabitem" :class="{'active': nowTab == index}" @click="changeTab(index)" v-for="(item,index) in itemList">
            {{ item.title }}
          </li>
        </ul>
      </div>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul>
          <!--<li class="sick" @click="goDetail">
            <img src="../../../static/images/female_s.png">
            <div class="info">
              <span>小丽<i class="female">1型</i></span>
              <span>女<b>18岁</b></span>
            </div>
            <div class="info data">
              <span>12.2 mmol/L</span>
              <span>晚餐后 18:00</span>
            </div>
          </li>
          <li class="sick">
            <img src="../../../static/images/male_s.png">
            <div class="info">
              <span>老王<i>1型</i></span>
              <span>男<b>58岁</b></span>
            </div>
            <div class="info data">
              <span>12.2 mmol/L</span>
              <span>晚餐后 18:00</span>
            </div>
          </li>-->
          <li class="sick" v-for="item in list" @click="goDetail">
            {{ item }}
          </li>
        </ul>
      </mt-loadmore>
      <!--<div v-if="loadingDom" class="over_data">
        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
        <span>没有数据了</span>
        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
      </div>-->
    </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
        name: '',
        data() {
            return {
              headerTitle: '血糖管理',
              list: [],
              nowTab: 0,
              itemList: [
                {
                  'title':'今日测量(66次)'
                },
                {
                  'title':'3天未测量(80人)'
                },
                {
                  'title':'7天未测量(8人)'
                },
                {
                  'title':'今日新增(18人)'
                },
                {
                  'title':'总患者(56人)'
                }
              ],
              list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              //loadingDom: true
              allLoaded: false
            }
        },
        methods: {
          loadBottom:function() {
            // 上拉加载
            console.log('在上拉！')
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          },
          changeTab: function(index){
            this.nowTab = index;
          },
          goDetail: function(){
            this.$router.push("/home/patientDetail");
          },
          InitTabScroll(){
            let width = 0;
            for (let i = 0; i < this.itemList.length; i++) {
              width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
            }
            this.$refs.tabWrapper.style.width = width + 'px'
            this.$nextTick(()=>{
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.tab, {
                  startX: 0,
                  click: true,
                  scrollX: true,
                  scrollY: false,
                  eventPassthrough: 'vertical'
                });
              }else{
                this.scroll.refresh()
              }
            });
          }
        },
      created(){
        this.$nextTick(() => {
          this.InitTabScroll();
        });
      }
    }
</script>
<style lang="less" scoped type="text/less">
  .sugerManager{
    background: #F3F3F3;
    .nav{
      height: 1rem;
      width: 100%;
      background: #ffffff;
      overflow: hidden;
      margin-bottom: 0.2rem;
      ul{
        width: 90rem;
        display: flex;
        li{
          float: left;
          height: 1rem;
          width: 3rem;
          font-size: 0.3rem;
          line-height: 1rem;
          margin: 0 0.3rem;
        }
        li.active{
          color: #619aeb;
          border-bottom: 0.04rem solid #619aeb;
        }
      }

    }
    .data{
      float: right;
    }
    .over_data{
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      width: 100%;
      background: #F3F3F3;
      position: fixed;
      bottom: 0px;
      letter-spacing: -1px;
      color: #ddd;
      span{
        letter-spacing: 0;
        color: #ddd;
        margin: 0 10px;
      }
    }
  }
</style>



