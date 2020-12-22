//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    table:[
      {
        image:'',
        bindtap:'bookkeeping',
        text:'记一笔'
    },{
      image:'search',
      bindtap:'search',
      text:'查询'
    }
    ,{
      image:'search',
      bindtap:'countEchart',
      text:'统计'
    }
    ,{
      image:'search',
      bindtap:'alert',
      text:'弹窗'
    }
    ,{
      image:'search',
      bindtap:'makePhoneCall',
      data:null,
      text:'打电话'
    }
    ,{
      image:'search',
      bindtap:'login',
      text:'绑定'
    }
    ,{
      image:'search',
      bindtap:'location',
      text:'位置'
    }
    ,{
      image:'search',
      bindtap:'opentable',
      data:{
        url:'https://github.com/habc0807/miniprogram-table-component'
      },
      text:'表格组件'
    }
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bookkeeping:function(){
    wx.navigateTo({
      url: '../bookkeeping/index'
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  countEchart:function(){
    wx.navigateTo({
      url: '../count/index'
    })
  },
  alert:function(){
    wx.navigateTo({
      url: '../alert/index'
    })
  },
  login:function(){
    wx.navigateTo({
      url: '../login/index'
    })
  },
  location:function(){
    wx.navigateTo({
      url: '../location/index'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //console.log('用户信息：',app.globalData.userInfo)
  },
  opentable:function(e){
   const data = e.currentTarget.dataset.num
   wx.request({
     url: data,
   })
  },
  makePhoneCall:function( e){
    wx.makePhoneCall({
      phoneNumber: '1234567910',
      success:function(){
        console.log('拨打成功')
      },
      fail:function(){
        console.log('拨打失败')
      }
    })
  },
 
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
