import request from '@/utils/request'

// 常量
const api_name = '/user'

export default {
  // 列表
  getPageList(searchObj) {
    return request({
      // 接口路径
      url: `${api_name}/listteamuser`,
      // 提交方式
      method: 'get',
      // 参数
      params: searchObj
    })
  },
  // 根据id查询
  getUserListByName(searchObj) {
    return request({
      // 接口路径
      url: `${api_name}/listuserbyname`,
      // 提交方式
      method: 'get',
      // 参数
      params: searchObj
    })
  },
  // 封号
  banUser(user) {
    return request({
      // 接口路径
      url: `${api_name}/adminuserinfo`,
      // 提交方式
      method: 'post',
      // 参数
      data: user
    })
  }
}