import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token-Healthcare-Smart-Brain'

export const StringKey = 'HealthcareSmartBrain'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
