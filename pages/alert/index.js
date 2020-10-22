//index.js
//获取应用实例
const app = getApp()
const addObject = [{
  id: "name",
  must: true,
  placeholder: "姓名",
  type: "input",
  event: "nameInput"
},
{
  id: "sex",
  must: true,
  placeholder: "男",
  type: "button",
  event: "sexButton"
},
{
  id: "group",
  must: true,
  placeholder: "组织",
  type: "button",
  event: "groupButton"
},
{
  id: "phone",
  must: true,
  placeholder: "电话号码",
  type: "input",
  event: "phoneInput"
},
{
  id: "shortNum",
  must: false,
  placeholder: "集团短号",
  type: "input",
  event: "shortNumInput"
},
{
  id: "mail",
  must: false,
  placeholder: "电子邮箱",
  type: "input",
  event: "mailInput"
},
{
  id: "unit",
  must: false,
  placeholder: "单位名称",
  type: "input",
  event: "unitInput"
},
{
  id: "department",
  must: false,
  placeholder: "部门名称",
  type: "input",
  event: "departmentInput"
},
{
  id: "job",
  must: false,
  placeholder: "职务",
  type: "input",
  event: "jobInput"
},
{
  id: "function",
  must: false,
  placeholder: "涉及工作内容",
  type: "input",
  event: "functionInput"
},
{
  id: "comPhone",
  must: false,
  placeholder: "办公电话",
  type: "input",
  event: "comPhoneInput"
},
{
  id: "fax",
  must: false,
  placeholder: "传真",
  type: "input",
  event: "faxInput"
},
{
  id: "homePhone",
  must: false,
  placeholder: "家庭电话",
  type: "input",
  event: "homePhoneInput"
},
{
  id: "showOrder",
  must: false,
  placeholder: "显示顺序",
  type: "input",
  event: "showOrderInput"
},
{
  id: "departOrder",
  must: false,
  placeholder: "部门顺序",
  type: "input",
  event: "departOrderInput"
},
{
  id: "remark",
  must: false,
  placeholder: "备注",
  type: "input",
  event: "remarkInput"
}
]
Page({
  data: {
    currentStatu: 'open',
    showModalStatus: false,
    animationData:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //响应button弹框
bindAdd: function(e) {
  this.dialog.setDataObj(addObject, {})
  this.dialog.showDialog();
},
  onReady:function(){
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  
})
