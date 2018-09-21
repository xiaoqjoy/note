<template>
    <div>
      <header-nav :headerTitle="headerTitle" :goBackTwo='true'></header-nav>
      <ul class="edit">
        <li>
          <i class="group"></i>未分组
        </li>
        <li>
          <i class="group1"></i>特别关注1
          <span @click="editName">编辑</span>
        </li>
        <li>
          <i class="group2"></i>特别关注2
          <span @click="editName">编辑</span>
        </li>
      </ul>

      <div v-if="edit">
        <myEdit></myEdit>
      </div>

      <div class="footer">添加分组</div>
    </div>
</template>
<script>
  import myEdit from '../chat/myEdit'
    export default {
        name: '',
        data() {
            return {
              edit: false,
              headerTitle: '编辑分组'
            }
        },
        methods: {
          editName: function(){
            this.edit = true;
          }
        },
        components: {
          myEdit
        }
    }
</script>
<style lang="less" scoped type="text/less">
  ul.edit{
    width: 100%;
    background: #ffffff;
    font-size: 0.34rem;
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
        background-position: -0.01rem -12.94rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        background-size: 7.52rem 38rem;
      }
    }
  }
</style>
