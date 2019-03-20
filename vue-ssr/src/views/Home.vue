<template>
  <section class="home">
    <div class="inform-table">
      <q-item :params="v" v-for="(v, k) in informData" :key="k" />
      <!-- <table>
        <tr v-for="(v, k) in informData" :key="k">
          <td>{{v.context}}</td>
        </tr>
      </table> -->
      <el-table :data="informData" header-align="center" ref="informTable" size="small" @selection-change="handleSelectionChange" class="talbe-box" v-loading="loading">
        <el-table-column label="内容" :min-width="200" align="left">
          <template slot-scope="scope">
            <div class="info-content">
              <i class="inform-icon icon iconfont icon-shenhe"></i>
              <div class="inb inform-info ellips">
                <p class="inform-info-item font-14 ellips">{{scope.row.title}}</p>
                <p class="inform-info-item c-9 ellips">{{activeIndex === 'backlog'? scope.row.context : scope.row.content}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <slot v-if="activeIndex === 'backlog'">
          <el-table-column label="时间" :min-width="100" align="center" class-name="columSimple">
            <template slot-scope="scope">
              {{scope.row.createTimeDesc}}
            </template>
          </el-table-column>
          <el-table-column label="发起人" :min-width="100" align="center" class-name="columSimple">
            <template slot-scope="scope">
              {{scope.row.initiatorName}}
            </template>
          </el-table-column>
        </slot>
        <slot v-else>
          <el-table-column label="时间" :min-width="100" align="center" class-name="columSimple">
            <template slot-scope="scope">
              {{scope.row.notifyTimeDesc}}
            </template>
          </el-table-column>
        </slot>
        <el-table-column label="操作" :min-width="100" align="center">
          <template slot-scope="scope">
            <slot v-if="activeIndex === 'backlog'">
              <el-button size="small" v-if="scope.row.type === 'ROOM'" plain @click="handleTransact(scope.$index, scope.row)">立刻办理
              </el-button>
              <el-button size="small" v-else-if="scope.row.type === 'ROOM_REAUDIT'" plain @click="handleTransact(scope.$index, scope.row)">立刻办理
              </el-button>
              <el-button size="small" v-else-if="scope.row.type === 'CONTRACT'" plain @click="handleTransact(scope.$index, scope.row)">立刻办理
              </el-button>
              <el-button size="small" v-else-if="scope.row.type === 'LEAD'" plain @click="handleTaking(scope.row)">查看
              </el-button>
            </slot>
            <slot v-else-if="scope.row.type === 'BILL_PAY'">
              <el-button size="small" @click="handlePayBill(scope.row)">查看
              </el-button>
            </slot>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-pagination">
      <el-pagination class="user-page" @size-change="oRhandleSizeChange" @current-change="oRhandlePageChange" :current-page.sync="orcurrentPage" :page-sizes="[5, 10, 20]" :page-size="orpageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="orpageCount" :total="ortotal">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import QItem from '../components/QItem.vue';
export default {
  name: 'Home',
  data() {
    const queryUserScheduleData = this.$store.state.queryUserScheduleData;
    return {
      informData: queryUserScheduleData.items,
      ortotal: queryUserScheduleData.recordCount, // 数据总数
      orpageSize: 20, // 每页的数据量
      orcurrentPage: queryUserScheduleData.currentPage,
      orpageCount: queryUserScheduleData.pageCount, /// 总页数
      loading: false,
      activeIndex: 'backlog'
    };
  },
  asyncData({ store, route }) {
    let pageSize = route.query.pageSize || 20;
    let currentPage = route.query.currentPage || 1;
    return store.dispatch('getUserSchedule', { pageSize, currentPage });
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  components: {
    QItem
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.loading = true;
      this.$store.dispatch('getUserSchedule', { pageSize: this.orpageSize, currentPage: this.orcurrentPage }).then(data => {
        this.loading = false;
        this.informData = data.items;
        this.num = data.recordCount;
        this.orpageCount = data.pageCount;
        this.ortotal = data.recordCount;
      });
    },

    handleSelect(key, keyPath) {
      this.activeIndex = key;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleTransact(index, row) {
      if (row.type === 'ROOM') {
        this.roomId = row.toAuditInfoId;
        this.auditState = 'firstReview';
        this.HouseTitle = '初审房源';
        this.houseDialog = true;
      } else if (row.type === 'ROOM_REAUDIT') {
        this.roomId = row.toAuditInfoId;
        this.auditState = 'review';
        this.HouseTitle = '复审房源';
        this.houseDialog = true;
      } else if (row.type === 'CONTRACT') {
        this.contractId = row.toAuditInfoId;
        this.roomId = row.contractRoomId;
        this.contractDialog = true;
      }
    },

    openNoticeDetail(id) {
      this.currentNoticeId = id;
      this.noticeDetailDialog = true;
    },

    handleTaking(row) {
      this.leadLookNo = row.toAuditInfoId;
      // this.myLeadLookStatusEnum = row.leadLookStatusEnum;
      this.takingDetailDialogVisible = true;
    },

    handlePayBill(row) {
      this.rentBillDialog = true;
      let { relateInfoDetail } = row;

      if (relateInfoDetail.relateInfoDetail) {
        this.billNo = relateInfoDetail.relateInfoDetail.billNo;
      } else {
        this.billNo = relateInfoDetail.billNo;
      }
    },

    // 分页每页几条
    oRhandleSizeChange(val) {
      this.orpageSize = val;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    },

    // 跳到第几页
    oRhandlePageChange(val) {
      this.orcurrentPage = val;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    }
  }
};
</script>

<style>
.flex-start-grow-c {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.home {
  padding: 20px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
.image-box-w {
  display: block;
  width: 100%;
  height: 100px;
}
.image-box {
  display: block;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
  /* background: url("../../../static/img/logo.jpg") no-repeat center center; */
}
.logo-image {
  display: block;
  width: 100%;
  height: 100%;
}
.notice {
  margin-top: 20px;
  /* margin-bottom: 7px; */
  width: 100%;
  height: 50px;
  position: relative;
  border: 1px solid #dddddd;
}
.headline {
  height: 50px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  text-align: center;
  line-height: 50px;
  background-color: #fafafa;
  border-right: 1px solid #dddddd;
}
.notice-info {
  width: 100%;
  height: 50px;
  padding: 0 80px 0 120px;
  box-sizing: border-box;
  background-color: #fff;
}
.notice-button {
  width: 80px;
  height: 40px;
  margin: 5px 0;
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  font-size: 12px;
}
.message {
  width: 100%;
  height: 50px;
  font-size: 12px;
  line-height: 50px;
  cursor: pointer;
}

.message::before {
  content: "";
  background: #999;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 8px;
}
.commission {
  width: 100%;
  height: 61px;
  position: relative;
}
.inform {
  float: left;
  font-size: 14px;
  line-height: 50px;
}
.inform-button {
  width: 80px;
  height: 40px;
  margin: 5px 0;
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  line-height: 40px;
}
.inform-num {
  font-weight: 600;
  color: #d66666;
}
.inform-table {
  /* position: absolute;
  left: 20px;
  right: 20px;
  top: 252px;
  bottom: 20px; */
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
}
.inform-table >>> tr th .cell {
  padding-left: 20px;
}
.talbe-box {
  width: 100%;
  height: 100%;
}
.inform-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  color: #fff;
  background-color: #008842;
}
.info-content {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon-xiaoxi {
  padding-right: 10px;
}
.inform-info-item {
  line-height: 1.5;
}
.inform-info {
  flex: 1;
  height: 40px;
  vertical-align: top;
}
.user-pagination {
  /* display: none; */
  width: 100%;
  left: 0;
  bottom: 0;
  height: 50px;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fafafa;
}
.user-page {
  margin-top: 8px;
  float: left;
}
</style>
