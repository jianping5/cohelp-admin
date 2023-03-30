import request from '@/utils/request'

// 常量
const api_name = '/course'

export default {

  // 导入教师
  importTeacher(formdata) {
    return request({
      url: `${api_name}/excel/teacher`,
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formdata
    })
  },

  // 导入课程
  importCourse(formdata) {
    return request({
      url: `${api_name}/excel/course`,
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formdata
    })
  },

  // 导入授课
  importTeach(formdata) {
    return request({
      url: `${api_name}/excel/teach`,
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formdata
    })
  },

  // 导入选课
  importSelection(formdata) {
    return request({
      url: `${api_name}/excel/selection`,
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formdata
    })
  },

  // 显示教师
  listTeacher({page, limit, teamId}) {
    return request({
      url: `${api_name}/list/teacher/${page}/${limit}/${teamId}`,
      method: 'get',
    })
  },  

  // 显示课程
  listCourse({page, limit, teamId}) {
    return request({
      url: `${api_name}/list/course/${page}/${limit}/${teamId}`,
      method: 'get',
    })
  },  
  
  // 显示选课
  listSelection({page, limit, teamId}) {
    return request({
      url: `${api_name}/list/selection/${page}/${limit}/${teamId}`,
      method: 'get',
    })
  },  

  // 显示授课
  listTeach({page, limit, teamId}) {
    return request({
      url: `${api_name}/list/teach/${page}/${limit}/${teamId}`,
      method: 'get',
    })
  },  

  // 添加教师
  addTeacher(data) {
    return request({
      url: `${api_name}/add/teacher`,
      method: 'post',
      data
    })
  },

  // 删除课程
  deleteCourse(courseId) {
    return request({
      url: `${api_name}/deleteCourse/${courseId}`,
      method: 'post',
    })
  },

  // 删除选课
  deleteSelection(selectionId) {
    return request({
      url: `${api_name}/deleteSelection/${selectionId}`,
      method: 'post',
    })
  },

  // 删除授课
  deleteTeach(teachId) {
    return request({
      url: `${api_name}/deleteTeach/${teachId}`,
      method: 'post',
    })
  }  


} 
