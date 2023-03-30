import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getTeamId, getUserId } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // if (to.path === '/login') {
  //   next()
  //   NProgress.done()
  // }

  // if (getUserId()) {
  //   console.log(123)
  //   next({ path: '/dashboard'})
  //   NProgress.done()
  // } else {
  //   console.log(567)
  //   next({ path: '/login'})
  //   NProgress.done()
  // }

  

  // determine whether the user has logged in
  const userId = getUserId()
  const teamId = getTeamId()
  const superAdminId = 19 // 这里的 19 需要改为1

  if (userId) {
    // 已登录再去登录页面时，直接跳转到主页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    }
    console.log(to.path)
    if (to.path !== '/dashboard' && to.path !== '/') {
      // console.log(typeof teamId)  类型为 string，这里被坑了
      if (teamId == 1 && userId != superAdminId) {  
        next({ path: '/' } )
        NProgress.done()
        // this.$message({
        //   message: '请先创建组织',
        //   type: 'warning'
        // });
        alert('请先创建组织') // 这里的 UI 需要美化
      
      } else {
        next()
        NProgress.done()
      }
    } else {
      next()
      console.log(123)
      NProgress.done()
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
    NProgress.done()
    /* has no token*/


    // if (whiteList.indexOf(to.path) !== -1) {
    //   // in the free login whitelist, go directly
    //   next()
    // } else {
    //   // other pages that do not have permission to access are redirected to the login page.
    //   next(`/login?redirect=${to.path}`)
    //   NProgress.done()
    // }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
