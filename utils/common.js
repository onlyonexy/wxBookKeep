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