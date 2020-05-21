const TOKEN = 'token'

function getToken() {
  return window.localStorage.getItem(TOKEN)
}