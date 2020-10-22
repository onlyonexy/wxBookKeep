
const common = require('../../utils/common');
const api = require('../../utils/api');
const constant = require('../../utils/constant');
//导入验证js
import WxValidate from "../../utils/WxValidate";
const app = getApp();
 
Page({
  data: {
    form: {//增加form子元素
      
    },
    remarksValue: '',
    money:null,
    financeType:null,
    costType:null,
    moneyTime:null,
    userID: 0,
    type:constant.type
  },
  onLaunch:function(){
    // const r = common.costType();
    // this.setData({
    //    userID: app.globalData.userID ,
    //    costType:r
    // });
    // console.log('lan',this.data.costType)
  },
  onLoad: function (){
    let self = this;
    const r = common.costType();
    self.setData({
      userID: app.globalData.userID ,
      costType:r
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
      }
      ,
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
        number :true
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
    this.setData({ money: e.detail.value});
  },
  moneyTime: function (e) {
    this.setData({ moneyTime: e.detail.value });
  },
  getRemarksValue: function (e) {
    this.setData({ remarksValue: e.detail.value });
  },
  financeChange: function(e){
    if (e.detail.id){
      this.setData({ financeType:  e.detail.id});
    }else{
      this.setData({ financeType: null });    
    }
  },
  costChange : function(e){
    console.log("消费类型", e.detail.id,e);
    if (e.detail.id){
      this.setData({ costType:  e.detail.id});
    }else{
      this.setData({ costType: null });    
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
     let error = this.WxValidate.errorList[0];
     switch (error.param) {
         case "remarksValue":
           //TODO
           console.log('999999')
           break;
        case "money":
            //TODO
            console.log('999999',error)
            break;
        
 
       }
       return false;
   }
   console.log('8888888')
   api.saveFinance({
     money:this.data.money,
     remark:this.data.remarksValue,
     moneyTime:this.data.moneyTime,
     financeType:this.data.financeType,
     costType:this.data.costType
   }).then(res =>{
     if(res.code === '0000'){
       console.log('成功')
       wx.navigateTo({
        url: '../search/index'
      })
     }else{
       console.log('失败',res)
     }
   })
  }
});