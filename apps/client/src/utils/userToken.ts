import { getUserData } from './userStorage'

export function getUserToken(): string {
  return getUserData().token
}
