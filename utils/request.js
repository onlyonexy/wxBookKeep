// const baseUrl = 'http://192.168.137.1/';
const baseUrl = 'http://localhost/';
const token = '';
const reftoken = '';
import{
    alertFail
} from './common'

const http = ( url = '', param = {},method = 'post', ...other ) => {
    const app = getApp();
    wx.showLoading({
        title: '请求中，请耐心等待..'
    });
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {
        url = url.replace(/^\/+/g,'')
        wx.request({
            url: baseUrl +  url.replace(/\/+/g,'/'), 
            data: param,
            header: {
                'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
                "Authorization":wx.getStorageSync('token'),
                "reftoken":wx.getStorageSync('reftoken'),
                "id":app.globalData.userId ? app.globalData.userId :'',
                userid:app.globalData.userInfo ?  app.globalData.userInfo :''

            },
            method: method,
            ...other,
            complete: (res) => {
                wx.hideLoading();
                // console.log(res.header,'请求返回')
                // console.log(`耗时${Date.now() - timeStart}`);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                    wx.setStorageSync('token',res.header.token)
                    wx.setStorageSync('reftoken',res.header.reftoken)
                } else {
                    alertFail('系统错误请联系管理员！')
                    reject(res)
                }
            }
        })
    })
}

const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = baseUrl + url;
    }
    return url
}

export const api = (url= '',data = {},type = 'POST',message = '',responseType = '') =>{
    type = type.toUpperCase()  
    if( type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key =>{
       dataStr += key + '=' + data[ key ] + '&'
      })
      if(dataStr !== ''){
         dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'))
         url = url + '?' + encodeURI(dataStr)
      }
    }
    if(url.indexOf('?') < 0){
      url =  encodeURI(url)
    }
    return http(url,data,type)
  }




// module.exports = {
//     baseUrl,
//     _get,
//     _post,
//     _put,
//     _delete
// }