const TOKEN = 'token'

export function getToken() {
  return window.localStorage.getItem(TOKEN)
}
