import request from '@/utils/request'

// 常量
const api_name = '/general'

export default {
  // 年度列表
  getYearList() {
    return request({
      // 接口路径
      url: `${api_name}/getcurrentyearpublish`,
      // 提交方式
      method: 'get',
    })
  },
  // 当日列表
  getDayList() {
    return request({
      // 接口路径
      url: `${api_name}/getcurrentdaypublish`,
      // 提交方式
      method: 'get',
    })
  },
}