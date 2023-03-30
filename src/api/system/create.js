import request from '@/utils/request'

// 常量
const api_name = '/team'

export default {
  // 创建组织
  createTeam(params) {
    return request({
      // 接口路径
      url: `${api_name}/insertteam`,
      // 提交方式
      method: 'get',
      // 参数
      params
    })
  },  
  // 列表
  getPageList(params) {
    return request({
      // 接口路径
      url: `${api_name}/listnotapproved`,
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
      url: `${api_name}/adminteam`,
      // 提交方式
      method: 'post',
      // 参数
      data
    })
  },
}