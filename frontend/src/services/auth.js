// Small helper to read/write the logged-in user kept in localStorage
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearUser() {
  localStorage.removeItem('user')
}
