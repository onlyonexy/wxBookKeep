const api = require('./api');
export const costType = ()=>{
  const type = getStorage('costType');
  if(type === null || type === '' || type === []){
    api.costType({}).then(res=>{
      if(res.code === '0000'){
        console.log('类型加载完成')
        // type = res.data
        setStorage('costType',res.data)
      }
    });
  }else{
    //console.log('***',type)
  }
  return type
}
function getStorage(key){
  return wx.getStorageSync(key);
}
function setStorage(key,value){
  wx.setStorageSync(key,value)
}

export const alertConfirmation = (message='系统错误!',title = '系统提示') =>{
  wx.showModal({
    title: title,
    content: message,
    showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
    cancelText: "o,no", //默认是“取消”
    cancelColor: 'black', //取消文字的颜色
    confirmText: "确认", //默认是“确定”
    confirmColor: 'black', //确定文字的颜色
   success: function (res) {
      if (res.cancel) {//点击取消  
       
      } else if (res.confirm) {//点击确定
        console.log("点击了取消")
      }
   }
 })
}