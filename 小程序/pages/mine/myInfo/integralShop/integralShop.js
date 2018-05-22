/* pages/mine/score */
var app = getApp()

Page({
  data: {
    hidden: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  change: function(){
    console.log('弹窗！')
    this.setData({
      hidden: 'block'
    })
  },
  close: function(){
    this.setData({
      hidden: 'none'
    })
  },
  changeIntegral: function(){
    console.log(this.dialog)
    //this.dialog.showDialog();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})