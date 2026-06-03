const STORAGE_KEY = 'cl_user'

interface UserData {
  token: string
  name: string
  avatar: string
}

function load(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored) as UserData
      if (!data.avatar) data.avatar = '🐶'
      return data
    }
  } catch {}
  const oldToken = localStorage.getItem('cl_user_token') ?? crypto.randomUUID()
  const oldName = localStorage.getItem('cl_user_name') ?? ''
  const data: UserData = { token: oldToken, name: oldName, avatar: '🐶' }
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
