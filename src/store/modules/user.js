import { login, logout, getInfo } from '@/api/user'
import { getUserId, setUserId, removeUserId,
   setTeamId, getTeamId, removeTeamId, removeAvatar, } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    name: '',
    avatar: '',
    team: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TEAM: (state, team) => {
    state.team = team
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {

      login({ userAccount: username.trim(), userPassword: password }).then(response => {
        // console.log(123)
        const { data } = response
        console.log(data)
        if (data.code == '401') {
          reject(data.message)
        }
        // console.log(123)
        // 设置用户 id 到 sessionStorage 中
        console.log(response)
        const id = response.data.data?.id
        const name = response.data.data?.userName
        const team = response.data.data?.teamName 
        const teamId = response.data.data?.teamId
        // const avatarUrl = ...
        setUserId(id)
        setTeamId(teamId)
        commit('SET_NAME', name)
        commit('SET_TEAM', team)
        // commit('SET_AVATAR', avatar)
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        // removeToken() // must remove  token  first
        // resetRouter()
        // commit('RESET_STATE')
        removeUserId()
        removeTeamId()
        removeAvatar()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

