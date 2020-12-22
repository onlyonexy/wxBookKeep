import {
  api
} from './request'
//消费类型
export const costTypeList = params => api('/code/getCode', params)

//消费列表
export const costList = params => api('/finance/list', params)

// 保存数据
export const saveFinance = params => api('/finance/save', params)

//获取用户微信信息
export const getopenId = params => api('/wx/api/user/openid', params)


//获取用户微信信息
export const userBind = params => api('/wx/api/user/bind', params)