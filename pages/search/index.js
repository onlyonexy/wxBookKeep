const common = require('../../utils/common');
const api = require('../../utils/api');
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
    msg: '暂无数据'//没有表格数据提示文字
  },
  formSubmit: function (e) {
    const that = this
    console.log('sss',that.data.project,e.detail.value)
    that.setData({
      row:[]
    })
  },
  onRowClick: function (e) {
    console.log('行点击事件：', e)
  },
  onCellClick: function (e) {
    console.log('单个表格点击事件：', e)
  },
  onLoad: function () {
    // api.aa();
    api.costList({pageNum:1,pageSize:10}).then(res => {
      console.log(res.data.records)
      this.setData({"row":res.data.records})
    });
    console.log(this.data.row);
    console.log('onLoad')
  }

})