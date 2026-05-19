export function getUserToken(): string {
  let token = localStorage.getItem('cl_user_token')
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem('cl_user_token', token)
  }
  return token
}
