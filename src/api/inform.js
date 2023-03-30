import request from '@/utils/request'

// 常量
const api_name = '/inform'

export default {

  // 获取列表
  getList(params) {
    return request({
      url: `${api_name}/listinforms`,
      method: 'get',
      params
    })
  },

  // 获取举报对象
  getInformTarget(params) {
    return request({
      url: `${api_name}/getinformtarget`,
      method: 'get',
      params
    })
  },

  // 删除举报
  deleteInform(params) {
    return request({
      url: `${api_name}/deleteinform`,
      method: 'get',
      params
    })
  },

} 
