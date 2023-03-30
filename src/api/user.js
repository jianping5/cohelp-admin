import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

  // 获取当前用户
export function getInfo() {
  return request({
    // 接口路径
    url: `/user/current`,
    // 提交方式
    method: 'get',       
  })
} 

// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
