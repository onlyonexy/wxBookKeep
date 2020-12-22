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
const app = getApp();
Page({
  data: {
    form: { //增加form子元素
    },
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    maxDate: new Date().getTime(),
    minDate:new Date(1990, 0, 1).getTime(),
    date: '',
    show: false,
    isshowtime:false,
    remarksValue: '',
    money: null,
    financeType: null,
    costType: null,
    moneyTime: util.formatTime(new Date()),
    userID: 0,
    type: type
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  onLaunch: function () {

  },
   p:function () {
    return new Promise((resolve, reject) => {
    })

  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onLoad: async function () {
    let self = this;
    const r = await common.costType();
    const tem = []
    if(r){
       for(var k = 0, length = r.length; k < length; k++) {
         const te = {}
         te.text = r[k].codeName
         te.value = r[k].codeCode
         tem.push(te)
       }
    }
    self.setData({
      userID: app.globalData.userID,
      costType: tem,
      type:tem
    });
    this.initValidate();
  },
  initValidate: function () {
    let rules = {
      money: {
        required: true,
        maxlength: 10
      },
      type: {
        required: true
      },
      moneyTime: {
        required: true
      },
      costType: {
        required: true,
        number: true
      }
    }

    let message = {
      money: {
        required: '请输入金额',
        number: true
      },
      moneyTime: {
        required: "请选择日期",
        dateISO: "请选择日期",
      },
      costType: {
        required: "请选择消费类型"
      },
      financeType: {
        required: "请选择类型"
      }
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  money: function (e) {
    var self = this;
    this.setData({
      money: e.detail.value
    });
  },
  moneyTime: function (e) {
    this.setData({
      moneyTime: e.detail.value
    });
  },
  getRemarksValue: function (e) {
    this.setData({
      remarksValue: e.detail.value
    });
  },
  financeChange: function (e) {
    if (e.detail.id) {
      this.setData({
        financeType: e.detail.id
      });
    } else {
      this.setData({
        financeType: null
      });
    }
  },
  costChange: function (e) {
    if (e.detail.id) {
      this.setData({
        costType: e.detail.id
      });
    } else {
      this.setData({
        costType: null
      });
    }
  },
  /**
   * 日历控件绑定函数 
   * 点击日期返回
   */
  onPickerChange: function (e) {
    this.setData({
      moneyTime: e.detail.dateString
    })
  },

  submitData: function (e) {
    let params = this.data;
    if (!this.WxValidate.checkForm(params)) {
      //表单元素验证不通过，此处给出相应提示
      let error = this.WxValidate.errorList;
      console.log(error, typeof (error))
      error.forEach((val, index, error) => {
        //提示错误信息
        alertConfirmation(val.msg)
      })
      return false;
    }
    api.saveFinance({
      money: this.data.money,
      remark: this.data.remarksValue,
      moneyTime: this.data.moneyTime,
      financeType: this.data.financeType,
      costType: this.data.costType
    }).then(res => {
      if (res.code === '0000') {
        alertSu();
        wx.navigateTo({
          url: '../search/index'
        })
      } else {
        alertConfirmation(res.mesage)
      }
    })
  }
});