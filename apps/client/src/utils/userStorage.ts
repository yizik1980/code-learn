const STORAGE_KEY = 'cl_user'

interface UserData {
  token: string
  name: string
}

function load(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as UserData
  } catch {}
  const oldToken = localStorage.getItem('cl_user_token') ?? crypto.randomUUID()
  const oldName = localStorage.getItem('cl_user_name') ?? ''
  const data: UserData = { token: oldToken, name: oldName }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  localStorage.removeItem('cl_user_token')
  localStorage.removeItem('cl_user_name')
  return data
}

export function getUserData(): UserData {
  return load()
}

export function saveUserData(patch: Partial<UserData>): UserData {
  const current = load()
  const updated = { ...current, ...patch }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
