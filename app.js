//app.js
import {
  getopenId
} from './utils/api'
import {
  req_ok
} from './utils/common'
import {
  EncryptContent
} from './utils/aes'


App({
  onLaunch: async function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const re = await wx.login({
      timeout: 3000,
    })
    if (re.code) {
      const a = await getopenId({
        wxCode: re.code
      })
      if (a.code === req_ok) {
        console.log('获取成功:', a)
        const id = a.data.userId;
        this.globalData.openid = a.data.openId
        this.globalData.userId = id
        this.globalData.wxInfo = a.data.infojson
        
        if(id === null || id === ''){
          wx.navigateTo({
            url: '/login/index'
          })
        }
        const str = EncryptContent(JSON.stringify(a.data))
        this.globalData.userInfo = str
      } else {
        console.log('获取失败:', a)
        wx.navigateTo({
          url: '/login/index'
        })
      }
      console.log('获取openid返回:', a);
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('用户微信信息:', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('用户微信信息2:', res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    wxInfo: null,
    userId:null,
    userInfo:null,
    costType: [] //类型
  }
})