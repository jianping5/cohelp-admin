import request from '@/utils/request'

// 常量
const api_name = '/general'

export default {

  // 获取列表
  getList(params) {
    return request({
      url: `${api_name}/listtopics`,
      method: 'get',
      params
    })
  },

  // 根据关键词搜索
  searchByName(params) {
    return request({
      url: `${api_name}/searchtopics`,
      method: 'get',
      params
    })
  },

  // 更改主题状态
  updateState(data) {
    return request({
      url: `${api_name}/changetopic`,
      method: 'post',
      data
    })
  },

  //获取评论列表
  getRemarkList(params) {
    return request({
      url: `${api_name}/listremarks`,
      method: 'get',
      params
    })
  },

  // 根据关键词搜索评论
  searchRemarkByName(params) {
    return request({
      url: `${api_name}/searchremarks`,
      method: 'get',
      params
    })
  },

  // 删除评论
  removeRemark(params) {
    return request({
      url: `${api_name}/removeremark`,
      method: 'get',
      params
    })
  },

} 
