const USER_ID_KEY = 'cohelp-admin-user-id'
const TEAM_ID_KEY = 'cohelp-admin-team-id'
const AVATAR_ID_KEY = 'cohelp-admin-avatar'

export function getUserId() {
  return sessionStorage.getItem(USER_ID_KEY)
}

export function setUserId(userId) {
  return sessionStorage.setItem(USER_ID_KEY, userId)
}

export function removeUserId() {
  return sessionStorage.removeItem(USER_ID_KEY)
}

export function getTeamId() {
  return sessionStorage.getItem(TEAM_ID_KEY)
}

export function setTeamId(teamId) {
  return sessionStorage.setItem(TEAM_ID_KEY, teamId)
}

export function removeTeamId() {
  return sessionStorage.removeItem(TEAM_ID_KEY)
}

export function getAvatar() {
  return sessionStorage.getItem(AVATAR_ID_KEY)
}

export function setAvatar(avatar) {
  return sessionStorage.setItem(AVATAR_ID_KEY, avatar)
}

export function removeAvatar() {
  return sessionStorage.removeItem(AVATAR_ID_KEY)
}
