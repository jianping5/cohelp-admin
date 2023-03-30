import request from '@/utils/request'

// 常量
const api_name = '/image'

export default {
  // 根据id获取图片url
  getImageById(params) {
    return request({
      // 接口路径
      url: `${api_name}/getimagebyid`,
      // 提交方式
      method: 'get',
      // 参数
      params
    })
  },
}