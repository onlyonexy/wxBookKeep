import {
  userBind
} from '../../utils/api';
import {
  alertFail,
  req_ok,
  alertSu
} from "../../utils/common"
//获取应用实例
const app = getApp()

Page({
  data: {
    userName: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onClickIcon: function (e) {
    console.log('用户名图标', e);
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onLoad: function () {
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: async function () {
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      const res = await userBind({
        openid: app.globalData.openid,
        userName: this.data.userName,
        password: this.data.password
      });
      if (res.code === req_ok) {
        alertSu('绑定成功')
        app.globalData.userId = res.data.userID
        wx.navigateTo({
          url: '../index/index'
        })
      } else {
        alertFail(res.message);
      }
    }
  }
})