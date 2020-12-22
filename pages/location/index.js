const common = require('../../utils/common');
const api = require('../../utils/api');
import {
  type,
  monthArr
} from '../../utils/constant';
var util = require('../../utils/util');
//导入验证js
import WxValidate from "../../utils/WxValidate";
import {
  alertConfirmation,
  alertSu
} from '../../utils/common'
//异步返回 await
// import regeneratorRuntime from 'regenerator-runtime'
const app = getApp();

// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nation: '',
    province: '',
    city: '',
    district: '',
    street: '',
    latitude: '',
  longitude: '',
  speed: '',
  accuracy: '',
  altitude:'',
  verticalAccuracy: '',
  horizontalAccuracy:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressDetail();
  },
  getLocationButton:function(){
    var _this=this;
    wx.getLocation({
     type: 'wgs84',
     success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var altitude = res.altitude
      var verticalAccuracy = res.verticalAccuracy
      var horizontalAccuracy = res.horizontalAccuracy
      _this.setData({
       latitude: latitude,
       longitude: longitude,
       speed: speed,
       accuracy: accuracy,
       altitude: altitude,
       verticalAccuracy: verticalAccuracy,
       horizontalAccuracy: horizontalAccuracy
      })
     }
    })
   },
  
  getLocation:function(){
    var _this=this;
    wx.chooseLocation({
     success: function (res) {
      var name = res.name
      var address = res.address
      var latitude = res.latitude
      var longitude = res.longitude
      _this.setData({
       name: name,
       address: address,
       latitude: latitude,
       longitude: longitude
      })
     }
    })
   },
  
  /**
     * 获取地理位置信息详情
     */
  getAddressDetail: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',// 参考系
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("纬度=" + latitude + " 经度=" + longitude);

        // 构建请求地址
        var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
          longitude + "&key=" + 'XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M' + "&get_poi=1";

        that.sendRequest(qqMapApi);
      }
    })
  },

/**
 * 发送请求获取地图接口的返回值
 */
  sendRequest: function (qqMapApi) {
    let that = this;
    // 调用请求
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200 && res.data.status == 0) {
          // 从返回值中提取需要的业务地理信息数据
          that.setData({ nation: res.data.result.address_component.nation });
          that.setData({ province: res.data.result.address_component.province });
          that.setData({ city: res.data.result.address_component.city });
          that.setData({ district: res.data.result.address_component.district });
          that.setData({ street: res.data.result.address_component.street });
        }
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})