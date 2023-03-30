import request from '@/utils/request'

// 常量
const api_name = '/userteam'

export default {
  // 列表
  getPageList(params) {
    return request({
      // 接口路径
      url: `${api_name}/listuserteam`,
      // 提交方式
      method: 'get',
      // 参数
      params
    })
  },
  // 审核
  audit(data) {
    return request({
      // 接口路径
      url: `${api_name}/changeuserteam`,
      // 提交方式
      method: 'post',
      // 参数
      data
    })
  },
}