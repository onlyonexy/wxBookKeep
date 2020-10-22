const common = require('../../utils/common');
const api = require('../../utils/api');
const constant = require('../../utils/constant');
const app = getApp();
Page({
  data: {
    project: '',
    tableHeader: [{
        prop: 'moneyDate',
        width: 150,
        label: '日期',
        color: '#55C355'
      },
      {
        prop: 'moneyWeek',
        width: 152,
        label: '周'
      },
      {
        prop: 'money',
        width: 152,
        label: '金额'
      },
      {
        prop: 'remark',
        width: 110,
        label: '备注'
      },
      {
        prop: 'costType',
        width: 110,
        label: '类型'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,
    row: [],
    monthArr:constant.monthArr,
    financeType:'',//账单类型
    moneyMonth:'',//月份
    costType:'',//消费类型
    moneyDate: '',//日期
    remark:'',
    msg: '暂无数据'//没有表格数据提示文字
  },
  formSubmit: function (e) {
    this.getData();
  },
  onRowClick: function (e) {
    console.log('行点击事件：', e)
  },
  onCellClick: function (e) {
    console.log('单个表格点击事件：', e)
  },
  monthChange:function(e){
    this.setData({
      moneyMonth:  e.detail.id 
    });
  },
  remarkChange:function(e){
    this.setData({
      remark:  e.detail.value 
    });
  },
  getData:function(){
    const params = {
      pageNum:1,
      pageSize:10,
      costType:this.data.costType,
      moneyMonth:this.data.moneyMonth,
      moneyDate:this.data.moneyDate,
      remark:this.data.remark,
      financeType:this.data.financeType
    }
    api.costList(params).then(res => {
      if(res.code === '0000'){
        this.setData({
          row : res.data.records
        })
      }else{
       common.alertConfirmation()

      
      }
     
    });

  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '查询',
    })
  this.getData();
  }

})