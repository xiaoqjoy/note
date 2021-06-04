const state = {
  quotationType: 'own',
  stockTabsHkType: 0,
  stockCode: undefined,
  stockSilderInfo: {},//右侧快照
  stockIndexObj: {},//指数的
  stockWsObj: {},//股票的
  subStockList: [],//订阅的股票列表
  fullScreenVis: false,
  isOwnList: 0,
  buyTenList: [],//买盘十档
  shellTenList: [],//卖盘十档
  IngreStock: [],//成分股列表
  groupList: [],   //分组列表
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGEQUOTATION_SET: (state, value) => {
    state.quotationType = value
  },
  STOCKTABSHK_SET: (state, value) => {
    state.stockTabsHkType = value
  },
  STOCKCODE_SET: (state, value) => {
    state.stockCode = value
  },
  STOCKSILDERINFO_SET: (state, value) => {
    state.stockSilderInfo = value
  },
  OWNLIST_SET: (state, value) => {
    state.isOwnList = state.isOwnList + 1;
  },
  GROUPLIST_SET: (state, value) => {
    state.groupList = value;
  },
  FULLSCREEN_SET: (state, value) => {
    state.fullScreenVis = value;
  },
  STOCKINDEXOBJ_SET: (state, value) => {
    state.stockIndexObj = value;
    // console.log(value,'STOCKINDEXOBJ_SET')
  },
  STOCKWSOBJ_SET: (state, value) => {
    state.stockWsObj = value;
  },
  SET_SETOCKLIST_SET: (state, value) => {
    state.subStockList = value;
  },
}

const actions = {

  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeQuotation({ commit }, data) {
    commit('CHANGEQUOTATION_SET', data)
  },
  setStockHKTabs({ commit }, data) {
    commit('STOCKTABSHK_SET', data)
  },
  setStockCode({ commit }, data) {
    commit('STOCKCODE_SET', data)
  },
  setStockSilderInfo({ commit }, data) {
    commit('STOCKSILDERINFO_SET', data)
  },
  setIsOwnList({ commit }, data) {
    commit('OWNLIST_SET', data)
  },
  setGroupList({ commit }, data) {
    commit('GROUPLIST_SET', data)
  },
  setFullScreen({ commit }, data) {
    commit('FULLSCREEN_SET', data)
  },
  setStockIndexObj({ commit }, data) {
    commit('STOCKINDEXOBJ_SET', data)
  },
  setStockList({ commit }, data) {
    commit('SET_SETOCKLIST_SET', data)
  },
  openWSCode({ commit }, data) {
    if (_.isEmpty(data)) return
    let concatCode = state.stockCode;
    let dataList = []
    if (data.type == 'silder') {
      dataList = [concatCode]
    } else if (data.type == 'ingre') {
      dataList = _.concat(state.subStockList, concatCode, state.IngreStock);
    } else if (data.type == 'messageTip') {//我的提醒
      //更新
      let lists = _.concat(state.subStockList, data.subCode)
      commit('SET_SETOCKLIST_SET', lists)
      // 订阅
      dataList = [data.subCode]
    } else {
      dataList = state.subStockList.concat(concatCode)
    }
    $WS('SUB', { event: 'STOCK_SNAPSHOT', codes: dataList }, data => {
      let wsData = JSON.parse(data);
      if (wsData.code == state.stockCode) {
        commit('STOCKSILDERINFO_SET', wsData)
      }
      commit('STOCKWSOBJ_SET', wsData)
    })
  },
  colseWSCode({ commit }, data) {
    if (_.isEmpty(data)) return
    let concatCode = state.stockCode;
    let dataList = [];
    if (data.type == 'silder') {//右侧快照
      if (state.subStockList.indexOf(data.colseStockCode) > -1) {
        return
      } else {
        dataList = [data.colseStockCode];
      }
    } else if (data.type == 'ingre') {//成分股
      dataList = _.concat(data.codes);
    } else if (data.type == 'messageTip') {//我的提醒
      dataList = [data.subCode]
    } else {
      dataList = state.subStockList.concat(concatCode)
    }
    $WS('CANCEL_SUB', { event: 'STOCK_SNAPSHOT', codes: dataList }, data => { })
  },
  openIngreStockWS({ commit }, data) {
    commit('CHANGE_SETTING', {
      key: 'IngreStock',
      value: data
    })
  },
  closeIngreStockWS({ commit }, data) {
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
