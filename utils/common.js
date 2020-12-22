import {
  costTypeList
} from "./api"
export const req_ok = '0000'
export const costType = async () => {
  return new Promise((resolve, reject) => {
    const type = getStorage('costType');
    if (type === null || type === '' || type === []) {
      costTypeList({
        codeType:'costType'
      }).then(res => {
        if (res.code === '0000') {
          setStorage('costType', res.data)
          resolve(res.data);
        } else {
          reject(res.message);
        }
      });
    } else {
      resolve(type);
    }

  })
  return type
}

function getStorage(key) {
  return wx.getStorageSync(key);
}

function setStorage(key, value) {
  wx.setStorageSync(key, value)
}

export const alertConfirmation = (message = '系统错误!', title = '系统提示') => {
  wx.showModal({
    title: title,
    content: message,
    showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
    cancelText: "o,no", //默认是“取消”
    cancelColor: 'black', //取消文字的颜色
    confirmText: "确认", //默认是“确定”
    confirmColor: 'black', //确定文字的颜色
    success: function (res) {
      if (res.cancel) { //点击取消  
        console.log("点击了取消")
      } else if (res.confirm) { //点击确定
        console.log("点击确定")
      }
    }
  })
}
export const alertSu = (message = '成功') => {
  wx.showToast({
    title: message,
    icon: 'succes',
    duration: 3000,
    mask: true
  })

}

export const alertFail = (message = '操作失败') => {
  wx.showToast({
    title: message,
    icon: 'error',
    duration: 3000,
    mask: true
  })

}