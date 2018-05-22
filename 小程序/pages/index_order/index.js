//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isKy: true,
    orderId: null,
    shopId: '',   //门店id
    hidelistBox: true, //设置底部购物车栏是否显示
    isShowDown: "",
    togon: "",
    hideguigeAlert: true, //设置是否规格弹窗显示
    toViewItem: "",
    sizeData: {},  //规格数据展示
    cartData: {},  //购物车数据(需要传给后台的数据)
    gudingTit: "",
    rightBox_H: '',  //获取rightBox的高度
    userInfo: '',  //用户信息
    mdFlag: true,   //是否显示门店信息
    cFlag: true,   //是否显示菜信息
    hideyhq: true,
    pageData: {
      setting: {},
      leftList: [
        // { name: "爆炒", id: "04304daa09fe4211994de9062ba9326d", isclass: "on" },
        // { name: "112", id: "0ab48afbe1e2419f8528f8d5b138dc7b", isclass: "" },
        // { name: "热门", id: "12ab7f188e8e4a4a9b81f0b4c8afebcd", isclass: "" },
        // { name: "加培根", id: "21424897d5324288b0dec4332b78be28", isclass: "" },
        // { name: "热门", id: "2414932c60f643b9a147fc0dae883748", isclass: "" },
      ],
      "rightList": [
      //   {
      //   "foodsData": [{
      //     "briefCode": "QCBLB",
      //     "foodsId": "402880ed60719fa2016071a77dd30002",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_define46211175d1403c102a474e3",
      //     "foodsName": "清炒白萝卜",
      //     "foodsPrice": 1,
      //     "guige": false,
      //     "num": "0"
      //   }, {
      //     "briefCode": "XJDPJ",
      //     "foodsId": "8a984c61604f338901604f5dc8a1005c",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_defineb2d383a9ad4d7f926148b91",
      //     "foodsName": "新疆大盘鸡",
      //     "guige": true,
      //     "guigeList": [{
      //       "guigeId": "8a984c61604f338901604f5dc8a1005c",
      //       "guigeName": "大份",
      //       "guigePrice": 2,
      //       "num": "0"
      //     }, {
      //       "guigeId": "8a984c61604f338901604f5dc8a2005e",
      //       "guigeName": "小份",
      //       "guigePrice": 1,
      //       "num": "0"
      //     }],
      //     "num": "0"
      //   }, {
      //     "briefCode": "YMDX",
      //     "foodsId": "8a984c61601193a801601199e68e0013",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_define65941c1da84031b41b2a3e4",
      //     "foodsName": "油焖大虾",
      //     "guige": true,
      //     "guigeList": [{
      //       "guigeId": "8a984c61601193a801601199e68e0013",
      //       "guigeName": "大份",
      //       "guigePrice": 100,
      //       "num": "0"
      //     }, {
      //       "guigeId": "8a984c61601193a801601199e68e0015",
      //       "guigeName": "小份",
      //       "guigePrice": 50,
      //       "num": "0"
      //     }],
      //     "num": "0"
      //   }, {
      //     "briefCode": "SLFC",
      //     "foodsId": "8a984c61601193a80160119a19130017",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_definee0ae31b398466d8b2423d8a",
      //     "foodsName": "酸辣肥肠",
      //     "foodsPrice": 35,
      //     "guige": false,
      //     "num": "0"
      //   }, {
      //     "briefCode": "LDY",
      //     "foodsId": "8a984c61604a725d01604a9e6c780034",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_define368a6b397a43404ff10716d",
      //     "foodsName": "蓝豆芽",
      //     "foodsPrice": 10,
      //     "guige": false,
      //     "num": "0"
      //   }],
      //   "typeId": "8a984c615f0423c6015f046a9f38004f",
      //   "typeName": "川菜"
      // }, {
      //   "foodsData": [{
      //     "briefCode": "LDY",
      //     "foodsId": "8a984c61604a725d01604a9df9ca002f",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_definef3955fe38f4d581378d2b86",
      //     "foodsName": "绿豆芽",
      //     "guige": true,
      //     "guigeList": [{
      //       "guigeId": "8a984c61604a725d01604a9df9ca002f",
      //       "guigeName": "大份",
      //       "guigePrice": 30,
      //       "num": "0"
      //     }, {
      //       "guigeId": "8a984c61604a725d01604a9df9cb0031",
      //       "guigeName": "小份",
      //       "guigePrice": 15,
      //       "num": "0"
      //     }],
      //     "num": "0"
      //   }, {
      //     "briefCode": "HDY",
      //     "foodsId": "8a984c61601193a8016011992535000a",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_defineda1812494944b410c96bb3a",
      //     "foodsName": "黄豆芽",
      //     "foodsPrice": 1,
      //     "guige": false,
      //     "num": "0"
      //   }, {
      //     "briefCode": "PHG",
      //     "foodsId": "8a984c61601193a80160119cd8d90023",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_food_define/img/od_define1bb66abab54d2a33bf14379",
      //     "foodsName": "拍黄瓜",
      //     "guige": true,
      //     "guigeList": [{
      //       "guigeId": "8a984c61601193a80160119cd8d90023",
      //       "guigeName": "大份",
      //       "guigePrice": 2,
      //       "num": "0"
      //     }, {
      //       "guigeId": "8a984c61601193a80160119cd8d90025",
      //       "guigeName": "小份",
      //       "guigePrice": 1,
      //       "num": "0"
      //     }],
      //     "num": "0"
      //   }],
      //   "typeId": "8a984c615f0423c6015f046b391e0051",
      //   "typeName": "粤菜"
      // }, {
      //   "foodsData": [{
      //     "briefCode": "WW",
      //     "foodsId": "402880ed60719fa2016071a902790005",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_suite_define/img/ite_define74fbaaf9624ecf0183389e",
      //     "foodsName": "文物",
      //     "foodsPrice": 111,
      //     "num": "0"
      //   }, {
      //     "briefCode": "LBKH",
      //     "foodsId": "8a984c615f0423c6015f04d973ab0073",
      //     "foodsImg": "http://op.eaqul.com/easy-quick-operation/rest/file/export/cy_suite_define/img/ite_define436646dff54f7d3d153042",
      //     "foodsName": "萝卜开会",
      //     "foodsPrice": 3,
      //     "num": "0"
      //   }],
      //   "typeId": "8a984c615f0423c6015f04d8b7d80072",
      //   "typeName": "萝卜全家桶"
      // }
      ],
    }


  },

  //事件处理函数
  onLoad: function (options) {
    var that = this;
    this.setData({
      shopId: options.shopId,  //门店id(首页传过来的值)
      jsRightList: 'rightList' + options.shopId,
      jsCartrightList: 'cartrightList' + options.shopId,
      distinces: options.distinces * 1000,
    })
    if (options.orderId != null) {
      that.setData({
        orderId: options.orderId  //再来一单时用到
      })
    };
  },
  onUnload: function () {
    var that = this;
    wx.removeStorage({
      key: that.data.jsCartrightList,
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  onShow: function () {
    wx.hideLoading();
    this.pageTab();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('storage_bg'),
    })
    //this.setViewData();
  },
  //页面标签切换及数据加载基础
  pageTab: function (params) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo_'); //获取用户信息
    that.setData({
      userInfo: userInfo
    })
    if (userInfo != null && userInfo.openId != null) { //判断有用户信息（进行请求数据渲染）
      this.takeOutPageData()
    } else {
      app.getUserInfo(function (userInfo) {  //若无用户信息(更新用户信息)
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
    }
  },
  takeOutPageData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var orderId = 'null'
    if (that.data.orderId != null) {
      orderId = that.data.orderId
    }
    wx.request({
      url: getApp().data.pathApi + '/utils/toTakeOut.do',//自己的服务接口地址
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        openId: that.data.userInfo.openId,
        shopId: that.data.shopId,
        orderId: orderId
      },
      success: function (data) {
        console.log(data.data)
        wx.hideLoading()
        if (data.data.status == 500) {
          wx.hideLoading();
          that.interation()
        }
        var pageData = data.data;
        that.setData({
          isKy: pageData.isKy,
          boxFee: pageData.boxFee
        })
        var tempCartData = {};
        var tit;
        // for (var i = 0; i < pageData.leftList.length; i++) {
        //   pageData.leftList[i].isclass = i == 0 ? 'on' : '';
        // }
        var newLeftList=[];
        for (var j = 0; j < pageData.rightList.length; j++) {
          var temid = pageData.rightList[j].typeId;
            for (var i = 0; i < pageData.leftList.length; i++) {
              pageData.leftList[i].isclass = i == 0 ? 'on' : '';
              if (temid == pageData.leftList[i].id){
                newLeftList.push(pageData.leftList[i]);
                //continue ;
              }              
            }
        }
        pageData.leftList = newLeftList;
        pageData.shop.imgUrl = pageData.shop.imgUrl.split(',');
        var newPageData = {};
        newPageData = pageData;


        wx.setStorageSync(that.data.jsRightList, JSON.stringify(pageData.rightList));
        var ishavecartrightList = JSON.parse(wx.getStorageSync(that.data.jsCartrightList) || '[]');
        if (ishavecartrightList.length > 0 && orderId == "null") { //如果本地有数据
          pageData.rightList = ishavecartrightList;
          tempCartData = that.getCartData();
          console.log(tempCartData);
        } else { //如果本地没有数据
          wx.setStorageSync(that.data.jsCartrightList, JSON.stringify(pageData.rightList));
        }
        if (orderId != null && orderId != "null") {
          wx.setStorageSync(that.data.jsCartrightList, JSON.stringify(pageData.rightList));
          tempCartData = that.getCartData();
        }

        that.setData({
          pageData: newPageData,
          cartData: tempCartData,
          gudingTit: tit,
          topBackgroundColor: pageData.backgroundColor
        })
        wx.createSelectorQuery().selectAll('.rightBox').boundingClientRect(function (rects) {
          rects.forEach(function (rect) {
            that.setData({
              rightBox_H: rect.height  //获取rightBox的高度
            })
          })
        }).exec()

        wx.hideLoading();
      },
      fail: function () {

      }
    })
  },
  interation: function () {  //请求数据失败
    var that = this
    that.setData({
      pageTF: true,
      pageTF_other: false
    })
    console.log('状态码非200，数据请求失败');
  },


  reload: function (e) {
    var that = this
    that.setData({
      location: null,
      pageTF: '',
      pageTF_other: 'true'
    })
    that.onShow()

  },
  hideByList: function () {  //隐藏底部购物篮
    var that = this;
    this.setData({ "isShowDown": "andown" });
    setTimeout(function () {
      that.setData({ "hidelistBox": true });
    }, 300)
  },
  showListBox: function () { //显示底部购物篮
    console.log(this.data.cartData)
    var that = this;
    this.setData({ "isShowDown": "anup" });
    that.setData({ "hidelistBox": false });
  },
  tobussInfo: function () {
    wx.navigateTo({   //跳转到商家信息页面
      url: '/pages/bussinessInfo/bussinessInfo?shopId=' + this.data.shopId,
    })
  },
  tosureOrder: function () { //跳转到订单页面
    var tempCartData = this.getCartData();
    console.log(tempCartData);
    wx.navigateTo({
      url: '/pages/sureOrder/sureOrder?shopId=' + this.data.shopId + '&latitude=' + this.data.pageData.shop.latitude + '&longitude=' + this.data.pageData.shop.longitude + '&startingPrice=' + this.data.pageData.setting.startingPrice + '&takeOutAmount=' + this.data.pageData.setting.takeOutAmount + '&business_name=' + this.data.pageData.shop.business_name + '&branch_name=' + this.data.pageData.shop.branch_name,
    })
  },
  setThisItemAddClassOn: function (ind) { //左侧菜品点击的tab切换
    var pageData = this.data.pageData;
    for (var i = 0; i < pageData.leftList.length; i++) {
      pageData.leftList[i].isclass = "";
    }
    pageData.leftList[ind].isclass = "on";
    this.setData({ "pageData": pageData });
    return pageData.leftList[ind].typeName;
  },
  move: function () {//右侧菜品滑动对应左侧菜品分类显示
    var that = this;
    wx.createSelectorQuery().selectAll('.rBoxItem').boundingClientRect(function (rects) {
      for (var i = 0; i < rects.length; i++) {
        var calc = rects[i].height + rects[i].top - 129;
        if (calc > 200 && calc < that.data.rightBox_H + rects[i].height - 200) {
          var tit = that.setThisItemAddClassOn(i);
          that.setData({
            "gudingTit": tit
          })
        }

      }
      console.log(rects);
    }).exec(function () {

    })
  },

  rBoxItemToView: function (e) { //左侧菜品点击对应右侧菜品划到可视区
    var thisInd = e.target.dataset.indx;
    var tit = e.target.dataset.tit;

    this.setThisItemAddClassOn(thisInd);
    this.setData({
      "gudingTit": tit,
      "toViewItem": 'rBoxItem' + thisInd
    })
    this.getCartData();
  },
  showSizeAlert: function (e) {   //显示规格弹窗
    var foodsId = e.target.dataset.foodsid;
    var sizeData = this.chazhaoSizeData(foodsId);
    this.setData({
      hideguigeAlert: false,
      sizeData: sizeData
    })
    console.log(this.data.sizeData);
  },
  hideSizeAlert: function (e) {  //隐藏规格弹窗
    this.setData({
      hideguigeAlert: true
    })
  },
  showMDInfo: function () {  //显示门店信息
    console.log(this.data.pageData)
    this.setData({
      mdFlag: false
    })
  },
  hideMDInfo: function () {  //隐藏门店信息
    this.setData({
      mdFlag: true
    })
  },
  hideCInfo: function () {  //隐藏菜品信息
    this.setData({
      cFlag: true
    })
  },
  showCInfo: function (e) {  //显示菜品信息
    var foodsid = e.target.dataset.foodsid;
    var showThisCInfo=this.getfoodInfoByid(foodsid);
    this.setData({
      cFlag: false,
      showThisCInfo: showThisCInfo
    })
  },

  chazhaoSizeData: function (foodsId) {  //根据foodid查找对应的规格数据
    var rightList = JSON.parse(wx.getStorageSync(this.data.jsRightList));
    var obj = {};
    for (var i = 0; i < rightList.length; i++) {
      for (var j = 0; j < rightList[i].foodsData.length; j++) {
        console.log(rightList[i]);
        if (rightList[i].foodsData[j].foodsId == foodsId) {
          obj.foodsName = rightList[i].foodsData[j].foodsName;
          obj.thePrice = 0;
          if (rightList[i].foodsData[j].guige) {
            for (var k = 0; k < rightList[i].foodsData[j].guigeList.length; k++) {
              var isClass = k == 0 ? "ggsizeon" : ""
              //obj.thePrice += rightList[i].foodsData[j].guigeList[0].guigePrice;
              obj.guigeId = rightList[i].foodsData[j].guigeList[0].guigeId;
              rightList[i].foodsData[j].guigeList[k].isClass = isClass;
            }
            obj.thePrice += rightList[i].foodsData[j].guigeList[0].guigePrice;
          }
          if (rightList[i].foodsData[j].practice) {
            for (var k = 0; k < rightList[i].foodsData[j].practiceList.length; k++) {
              var isClass = k == 0 ? "ggsizeon" : ""
              //obj.thePrice += rightList[i].foodsData[j].practiceList[0].price;
              obj.practiceId = rightList[i].foodsData[j].practiceList[0].proId;
              rightList[i].foodsData[j].practiceList[k].isClass = isClass;
            }
            obj.thePrice += rightList[i].foodsData[j].practiceList[0].price;
          }

          console.log(rightList[i].foodsData[j])
          obj.guigeList = rightList[i].foodsData[j].guigeList; //处理规格数据
          obj.ingredientsList = rightList[i].foodsData[j].ingredientsList;
          obj.practiceList = rightList[i].foodsData[j].practiceList;
          obj.remarkList = rightList[i].foodsData[j].remarkList;
          obj.guige = rightList[i].foodsData[j].guige;
          obj.ingredients = rightList[i].foodsData[j].ingredients;
          obj.isremark = rightList[i].foodsData[j].isremark;
          obj.practice = rightList[i].foodsData[j].practice;
          obj.foodsId = rightList[i].foodsData[j].foodsId;
          return obj;
        }
      }
    }
    console.log(obj);
    return obj;
  },
  subcrtDataByfoodId: function (e) { //购物车减数据
    var foodsid = e.target.dataset.foodsid;
    var rightList = JSON.parse(wx.getStorageSync(this.data.jsCartrightList));
    for (var i = 0; i < rightList.length; i++) {
      for (var j = 0; j < rightList[i].foodsData.length; j++) {
        if (!rightList[i].foodsData[j].guige) {//没有规格
          if (rightList[i].foodsData[j].foodsId == foodsid) {
            if (rightList[i].foodsData[j].num <= 0) {

            } else {
              rightList[i].foodsData[j].num--
            }
          }
        } else { //有规格
          for (var k = 0; k < rightList[i].foodsData[j].guigeList.length; k++) {
            var add_food = rightList[i].foodsData[j];
            var add_guige = add_food.guigeList[k];
            var pros = this.handlesizeData();
            var foodsid_;
            if (foodsid.indexOf("_") > 0) {
              foodsid_ = foodsid.split("_")[0];
            }
            if (undefined == foodsid_ ? add_food.foodsId == foodsid : add_food.foodsId == foodsid_) {
              //循环查找是否有匹配的属性
              //是否没有匹配的


              if (undefined == add_food.selpro) {
                add_food.selpro = [];
              }
              for (var z = 0; z < add_food.selpro.length; z++) {
                if (undefined == foodsid_) {
                } else {
                  if (foodsid == add_food.selpro[z].id) {

                    add_food.selpro[z].num--;
                    if (add_food.selpro[z].num == 0) {
                      add_food.selpro.splice(z, 1);
                    }
                    break;
                  }
                }
                if (add_food.selpro[z].pro == pros) {

                  add_food.selpro[z].num--;
                  if (add_food.selpro[z].num == 0) {
                    add_food.selpro.splice(z, 1);
                  }
                }
              }

              rightList[i].foodsData[j].num--;
              console.log("thisdata:");
              console.log(this.data.sizeData);
              break;
            }
          }
        }
      }
    }
    var pageData = this.data.pageData;
    pageData.rightList = rightList;
    wx.setStorageSync(this.data.jsCartrightList, JSON.stringify(pageData.rightList));
    var tempCartData = this.getCartData();
    this.setData({
      pageData: pageData,
      cartData: tempCartData
    })

  },
  addcrtDataByfoodId: function (e) { //购物车+数据
    var foodsid = e.target.dataset.foodsid;
    //单个添加
    var danFlag=false;
    var rightList = JSON.parse(wx.getStorageSync(this.data.jsCartrightList));
    for (var i = 0; i < rightList.length; i++) {
      for (var j = 0; j < rightList[i].foodsData.length; j++) {
        if (!rightList[i].foodsData[j].guige) {//没有规格
          if (rightList[i].foodsData[j].foodsId == foodsid) {
            // if(!danFlag){
            rightList[i].foodsData[j].num++;
            // danFlag = true;
            // break;
            // }
          }
          
        } else {  //有规格

          for (var k = 0; k < rightList[i].foodsData[j].guigeList.length; k++) {
            var add_food = rightList[i].foodsData[j];
            var add_guige = add_food.guigeList[k];
            var pros = this.handlesizeData();
            var foodsid_;
            if (foodsid.indexOf("_") > 0) {
              foodsid_ = foodsid.split("_")[0];
            }
            if (undefined == foodsid_ ? add_food.foodsId == foodsid : add_food.foodsId == foodsid_) {
              //循环查找是否有匹配的属性
              //是否没有匹配的
              if(!danFlag){
              var flag = true;
              if (undefined == add_food.selpro) {
                add_food.selpro = [];
              }
              for (var z = 0; z < add_food.selpro.length; z++) {
                if (undefined == foodsid_) {
                } else {
                  if (foodsid == add_food.selpro[z].id) {
                    flag = false
                    add_food.selpro[z].num++;
                    break;
                  }
                }
                if (add_food.selpro[z].pro == pros) {
                  flag = false;
                  add_food.selpro[z].num++;
                  
                }
              }
              if (flag) {
                //console.log(foodsid + "_" + Math.ceil(Math.random() * 10000)+new Date());
                var selpro = {
                  id: foodsid + "_" + new Date().getTime(),
                  num: 1, pro: pros
                }
                add_food.selpro.push(selpro);
              }
              }
              rightList[i].foodsData[j].num++;
              console.log("thisdata:");
              console.log(this.data.sizeData);
              danFlag = true;
              break;
            }
           
          }
          this.hideSizeAlert();
         
        }
       
      }

    }
    var pageData = this.data.pageData;
    pageData.rightList = rightList;
    wx.setStorageSync(this.data.jsCartrightList, JSON.stringify(pageData.rightList));
    var tempCartData = this.getCartData();
    console.log(tempCartData)
    this.setData({
      pageData: pageData,
      cartData: tempCartData
    })

  },
  sizeChoseThis_guige: function (e) {//有规格的tab切换（换规格）
    var idx = e.target.dataset.idx //获取该索引
    //var thePrice = e.target.dataset.sizeprice;//获取该规格的价格
    //var guigeId = e.target.dataset.guigeid;//获取该规格的foodsid
    var sizeData = this.data.sizeData;
    //sizeData.guigeId = guigeId;
    //sizeData.thePrice = thePrice;
    for (var i = 0; i < sizeData.guigeList.length; i++) {
      sizeData.guigeList[i].isClass = ""
    }
    sizeData.guigeList[idx].isClass = "ggsizeon";
    sizeData.thePrice = this.calcSizeChosePrice(sizeData);
    this.setData({
      sizeData: sizeData
    })
  },
  sizeChoseThis_jialiao: function (e) {  //加料
    var idx = e.target.dataset.idx //获取该索引
    var sizeData = this.data.sizeData;
    //for (var i = 0; i < sizeData.ingredientsList.length; i++) {
    sizeData.ingredientsList[idx].isClass = sizeData.ingredientsList[idx].isClass == 'ggsizeon' ? '' : 'ggsizeon';
    //}
    sizeData.thePrice = this.calcSizeChosePrice(sizeData);
    this.setData({
      sizeData: sizeData
    })
  },
  sizeChoseThis_zuofa: function (e) { //做法
    var idx = e.target.dataset.idx //获取该索引
    var sizeData = this.data.sizeData;
    for (var i = 0; i < sizeData.practiceList.length; i++) {
      sizeData.practiceList[i].isClass = ""
    }
    sizeData.practiceList[idx].isClass = sizeData.practiceList[idx].isClass == 'ggsizeon' ? '' : 'ggsizeon';
    sizeData.thePrice = this.calcSizeChosePrice(sizeData);
    this.setData({
      sizeData: sizeData
    })
  },
  sizeChoseThis_beizu: function (e) { //备注
    var idx = e.target.dataset.idx //获取该索引
    var sizeData = this.data.sizeData;
    // for (var i = 0; i < sizeData.remarkList.length; i++) {
    //   sizeData.remarkList[i].isClass = ""
    // }
    sizeData.remarkList[idx].isClass = sizeData.remarkList[idx].isClass == 'ggsizeon' ? '' : 'ggsizeon';
    sizeData.thePrice = this.calcSizeChosePrice(sizeData);
    this.setData({
      sizeData: sizeData
    })
  },
  calcSizeChosePrice: function (sizeData) { //计算有规格的总价格
    var thePrice = 0;
    if (sizeData.guige) { //查找规格价格
      for (var i = 0; i < sizeData.guigeList.length; i++) {
        if (sizeData.guigeList[i].isClass == 'ggsizeon') {
          thePrice += sizeData.guigeList[i].guigePrice;
        }
      }
    }
    if (sizeData.ingredients) { //查找加料价格
      for (var i = 0; i < sizeData.ingredientsList.length; i++) {
        if (sizeData.ingredientsList[i].isClass == 'ggsizeon') {
          thePrice += sizeData.ingredientsList[i].price;
        }
      }
    }
    if (sizeData.practice) { //查找做法价格
      for (var i = 0; i < sizeData.practiceList.length; i++) {
        if (sizeData.practiceList[i].isClass == 'ggsizeon') {
          thePrice += sizeData.practiceList[i].price;
        }
      }
    }
    if (sizeData.isremark) { //查找备注价格
      console.log(sizeData.remarkList)
      for (var i = 0; i < sizeData.remarkList.length; i++) {
        if (sizeData.remarkList[i].isClass == 'ggsizeon') {
          thePrice += sizeData.remarkList[i].price||0;
        }
      }
    }
    return thePrice;
  },
  getCartData: function () {
    var that = this
    var cartData = JSON.parse(wx.getStorageSync(that.data.jsCartrightList) || '[]');
    console.log(cartData);
    var obj = {};
    obj.totnum = 0;
    obj.totprice = 0;
    obj.boxNum = 0;
    obj.totMealsPrice = 0;
    obj.cartdata = [];
    for (var i = 0; i < cartData.length; i++) {
      for (var j = 0; j < cartData[i].foodsData.length; j++) {
        if (!cartData[i].foodsData[j].guige) { //无规格
          if (cartData[i].foodsData[j].num > 0) {
            //判断是否有重复的
            var flag = this.checkDanFood(obj.cartdata,cartData[i].foodsData[j].foodsId);
            if(flag){
              continue;
            }
            var oobj = {};
            oobj.foodsId = cartData[i].foodsData[j].foodsId;
            oobj.foodsName = cartData[i].foodsData[j].foodsName;
            oobj.foodsPrice = cartData[i].foodsData[j].foodsPrice;
            oobj.foodsnum = cartData[i].foodsData[j].num;
            oobj.strArr=[];
            obj.cartdata.push(oobj);
          }
        } else { //有规格
          if (undefined == cartData[i].foodsData[j].selpro) {
            cartData[i].foodsData[j].selpro = [];
          }
          for (var k = 0; k < cartData[i].foodsData[j].selpro.length; k++) {
            var cardfood_ = cartData[i].foodsData[j].selpro[k];
            var pro = JSON.parse(cardfood_.pro);
            var guige = pro[0];
            var oobj = {};
            oobj.foodsId = cardfood_.id;
            oobj.foodsName = cartData[i].foodsData[j].foodsName + '(' + guige.name + ')';
            var price = 0;
            price = guige.price;
            var strArr=[];
            for (var z = 1; z < pro.length; z++) {
              price += pro[z].price;
              strArr.push(pro[z].name);
            }
            oobj.foodsPrice = price ;
            oobj.foodsnum = cardfood_.num;
            oobj.strArr=strArr;
            obj.cartdata.push(oobj);

          }
        }
        //console.log(obj);
        obj.totMealsPrice += cartData[i].foodsData[j].mealsPrice * 100 * cartData[i].foodsData[j].num
      }

      //obj.totMealsPrice = obj.boxNum * getApp().data.ppp;
      //getApp().data.ppp=9;
      //console.log(getApp().data.ppp);
      //(parseFloat(this.data.pageData.boxFee.content) * 100);//计算餐盒费
      //obj.totMealsPrice = obj.boxNum * (parseFloat(this.data.pageData.boxFee.content) * 100);//计算餐盒费
      // obj.totMealsPrice = obj.boxNum * (parseFloat(that.data.boxFee.content) * 100);//计算餐盒费
    }
    for (var m = 0; m < obj.cartdata.length; m++) {
      obj.totnum += obj.cartdata[m].foodsnum * 1;
      obj.totprice += obj.cartdata[m].foodsnum * obj.cartdata[m].foodsPrice;
    }
    obj.totprice += obj.totMealsPrice;  //总价格时将餐盒费算进去
    return obj;
  },
  clearCartData: function () {//清除购物车数据
    var rightList = JSON.parse(wx.getStorageSync(this.data.jsCartrightList));
    for (var i = 0; i < rightList.length; i++) {
      for (var j = 0; j < rightList[i].foodsData.length; j++) {
        if (!rightList[i].foodsData[j].guige) {//没有规格
          rightList[i].foodsData[j].num = 0;
        } else {  //有规格
          for (var k = 0; k < rightList[i].foodsData[j].guigeList.length; k++) {
            rightList[i].foodsData[j].guigeList[k].num = 0;
            rightList[i].foodsData[j].selpro = [];
            rightList[i].foodsData[j].num = 0;
          }
          this.hideSizeAlert();
        }
      }
    }
    var pageData = this.data.pageData;
    pageData.rightList = rightList;
    wx.setStorageSync(this.data.jsCartrightList, JSON.stringify(pageData.rightList));
    var tempCartData = this.getCartData();
    this.setData({
      pageData: pageData,
      cartData: tempCartData
    })
    this.hideByList();
    console.log(this.data.pageData);
  },
  search_href: function () {
    var that = this;
    console.log(that.data)
    wx.navigateTo({   //跳转到搜索页面
      url: '/pages/index_order/index/search/search?shopId=' + this.data.shopId + '&latitude=' + this.data.pageData.shop.latitude + '&longitude=' + this.data.pageData.shop.longitude + '&startingPrice=' + this.data.pageData.setting.startingPrice + '&takeOutAmount=' + this.data.pageData.setting.takeOutAmount + '&business_name=' + this.data.pageData.shop.business_name + '&branch_name=' + this.data.pageData.shop.branch_name + '&getdata=' + this.data.jsCartrightList + '&boxFee=' + that.data.boxFee.content,
    })
  },

  //判断是否在营业时间
  isyinye: function () {
    var takeOutDate = this.data.pageData.setting.takeOutDate.split(",");
    var date = new Date();
    var weekDay = date.getDay() - 1 < 0 ? 6 : date.getDate();
    var flag = false;
    for (var i = 0; i < takeOutDate.length; i++) {
      if (takeOutDate[i] == weekDay) {
        flag = true;
        return flag;
      }
    }
    return flag;
  },
  //加规格
  addguige: function (foodid) {
    foodid
  },
  handlesizeData: function () {
    var oobj = {
      guige: [],
      jialiao: [],
      zuofa: [],
      beizu: []
    };
    var _obj = [];
    var guigeList = this.data.sizeData.guigeList;
    var ingredientsList = this.data.sizeData.ingredientsList;
    var practiceList = this.data.sizeData.practiceList;
    var remarkList = this.data.sizeData.remarkList;
    if (guigeList){
        for (var i = 0; i < guigeList.length; i++) {
          if (guigeList[i].isClass && guigeList[i].isClass == 'ggsizeon') {
            var obj = {};
            obj.id = guigeList[i].guigeId;
            obj.name = guigeList[i].guigeName;
            obj.price = guigeList[i].guigePrice;
            //oobj.guige.push(obj);
            _obj.push(obj);
          }
        }
    }
    if (ingredientsList){
        for (var i = 0; i < ingredientsList.length; i++) {
          if (ingredientsList[i].isClass && ingredientsList[i].isClass == 'ggsizeon') {
            var obj = {};
            obj.id = ingredientsList[i].proId;
            obj.name = ingredientsList[i].proName;
            obj.price = ingredientsList[i].price;
            //oobj.ingredientsList.push(obj);
            _obj.push(obj);
          }
        }
    }
    if (practiceList){
        for (var i = 0; i < practiceList.length; i++) {
          if (practiceList[i].isClass && practiceList[i].isClass == 'ggsizeon') {
            var obj = {};
            obj.id = practiceList[i].proId;
            obj.name = practiceList[i].proName;
            obj.price = practiceList[i].price;
            //oobj.practiceList.push(obj);
            _obj.push(obj);
          }
        }
    }
    if (remarkList){
        for (var i = 0; i < remarkList.length; i++) {
          if (remarkList[i].isClass && remarkList[i].isClass == 'ggsizeon') {
            var obj = {};
            obj.id = remarkList[i].proId;
            obj.name = remarkList[i].proName;
            obj.price = remarkList[i].price||0;
            //oobj.remarkList.push(obj);
            _obj.push(obj);
          }
        }
    }

    //console.log(this.data.sizeData)
    //console.log(_obj);
    return JSON.stringify(_obj);

  },
  getfoodInfoByid:function(foodsid){
     var rightList = JSON.parse(wx.getStorageSync(this.data.jsCartrightList));
     var temObj={};
     for (var i = 0; i < rightList.length;i++){
       if (rightList[i].foodsData.length>0){
         var foodsData = rightList[i].foodsData;
         for (var j = 0; j < foodsData.length;j++){
           if (foodsid == foodsData[j].foodsId){
             return temObj=foodsData[j];
           }
         }
       }
     }
  },
  hideyhq:function(){
    this.setData({
      hideyhq:true
    })
  },
  showyhq:function(){
    this.setData({
      hideyhq: false
    })
  },
  getCoupons:function(e){ //领取优惠券
    console.log(e);
    var couponsId = e.target.dataset.couponsid;
    var that=this;
    wx.showLoading({
      title: '领取中',
    })
    wx.request({
      url: getApp().data.pathApi + '/utils/receiveCoupons',//自己的服务接口地址
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        openId: that.data.userInfo.openId,
        couponId: couponsId
      },
      success: function (data) {
        console.log(data);
        if (data.data.type=='success'){ //领取成功
          that.setcouponStatusTrueByid(couponsId);
        }
        wx.hideLoading()
      },
      fail: function () {
          
      }
    })

  },
  setcouponStatusTrueByid:function(id){  //根据优惠券id查找对应的优惠券，并让其状态改变为不可领取状态
    var pageData = this.data.pageData;
    var coupons = pageData.coupons;
     for (var i = 0; i < coupons.length;i++){
       if (id == coupons[i].id){
         coupons[i].isReceive='true';        
       }
     }
     pageData.coupons = coupons;
     this.setData({
       pageData: pageData,
       hideyhq:false
     })
  },
  callPhone:function(e){  //打电话
    var userPhone = e.target.dataset.phone; //获取该索引
    wx.makePhoneCall({
      phoneNumber: userPhone
    })
  },
  scroll: function () {
    console.log(78989);
    //this.move();
  },
  checkDanFood: function (cartData,foodsId){ //判断单规格查找是否有重复的
    for (var i = 0; i < cartData.length;i++){
      
            if (cartData[i].foodsId==foodsId){
              //存在返回true
               return true;
            }
      }
      return false;
  }
})


