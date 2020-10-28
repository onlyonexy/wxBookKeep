const { type } = require('./constant')
const req = require('./request')

//消费类型
export const costType  =  params => req.api('/costType/all',params,'get')

//消费列表
export const costList  =  params => req.api('/finance/list',params)

// 保存数据
export const saveFinance  =  params => req.api('/finance/save',params)

//获取用户微信信息
export const getopenId  =  params => req.api('/wx/api//user/openid',params)

